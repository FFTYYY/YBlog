from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import Http404
import django.http as http
from .models import 节点 , 留言
from .utils.relationship import *
from .utils.permission_manage import *
from .utils.process_content import * 
import os
import django.utils.timezone as timezone
import copy

应用名 = __package__
应用地址 = "/文章"

def 默认(request):
	return http.HttpResponseRedirect("./root")

def 获取周围节点(request , 节点地址):
	'''响应一个ajax方法，返回各个节点的列表'''
	此节点 = 节点.objects.get(地址 = 节点地址)

	if not 节点许可查询(request , 此节点):
		raise Http404

	子节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 重排列(此节点.子)))
	祖先节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 获取祖先节点列表(此节点)))
	兄弟节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 获取兄弟节点列表(此节点)))

	ret = """
		var ret = {{}}
		ret.son_nodes = {son_nodes}
		ret.par_nodes = {par_nodes}
		ret.bro_nodes = {bro_nodes}
		return ret
	""".format(
		son_nodes = "[" + ",".join([
			"{name: '%s', type: '%s', url: '%s'}" % (处理转义(x.名),x.节点类型,处理转义(x.地址)) for x in 子节点列表
		]) + "]" , 
		par_nodes = "[" + ",".join([
			"{name: '%s', type: '%s', url: '%s'}" % (处理转义(x.名),x.节点类型,处理转义(x.地址)) for x in 祖先节点列表
		]) + "]" , 
		bro_nodes = "[" + ",".join([
			"{name: '%s', type: '%s', url: '%s'}" % (处理转义(x.名),x.节点类型,处理转义(x.地址)) for x in 兄弟节点列表
		]) + "]" , 
	)

	return HttpResponse( ret )

def 获取节点(request , 节点地址):

	此节点 = 节点.objects.get(地址 = 节点地址)

	if not 节点许可查询(request , 此节点):
		raise Http404

	附加内容 = "\\n".join([附.内容 for 附 in 此节点.附加内容.all() if 附.类型 == 0]) #html
	[exec(附.内容,{"节点":此节点} , {}) for 附 in 此节点.附加内容.all() if 附.类型 == 1 ] #python

	if not 节点许可查询(request , 此节点): #权限有可能变动
		raise Http404

	上下文 = {}

	上下文["启用MathJax"] = (此节点.内容类型 == 0)

	子节点列表   = list(filter(lambda 点 : 节点许可查询(request , 点) , 重排列(此节点.子)))
	祖先节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 获取祖先节点列表(此节点)))
	兄弟节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 获取兄弟节点列表(此节点)))

	留言列表 = [言论 for 言论 in 此节点.留言.all()]
	留言列表.reverse()


	上下文.update({
		"此节点" 		: 此节点,
		"子节点列表" 	: 子节点列表,
		"祖先节点列表" 	: 祖先节点列表,
		"兄弟节点列表" 	: 兄弟节点列表,
		"留言列表" 		: 留言列表,
		"内容"			: 此节点.内容 , 
		"访问等级"		: 权限查询(request) , 
		"附加内容" 		: 附加内容 , 
	})


	模板位置 = 此节点.封面模板位置
	模板位置 = 应用名 + "/" + 模板位置

	return render(request , 模板位置 , 上下文)

def 提交留言(request , 节点地址):
	此节点 = 节点.objects.get(地址 = 节点地址)

	if request.POST:
		称呼 = request.POST.get("name")
		邮箱 = request.POST.get("email")
		内容 = request.POST.get("content")
		if not 称呼:
			称呼 = "匿名"
		if 内容:
			新留言 = 留言(内容 = 内容 , 对象 = 此节点 , 留言者称呼 = 称呼 , 留言者邮箱 = 邮箱 , 
					创建时间 = timezone.now())
			新留言.save()

	return http.HttpResponseRedirect("../" + 节点地址)