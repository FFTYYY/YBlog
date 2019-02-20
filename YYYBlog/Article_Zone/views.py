from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import Http404
import django.http as http
from .models import 节点 , 留言
from .methods import *
from .permission_manage import *
import os

#print (os.path.dirname(__file__))

应用名 = "Article_Zone"
应用地址 = "/文章"
静态文件前缀 = "{0}/static/{0}".format(os.path.dirname(__file__))

def 默认(request):
	return http.HttpResponseRedirect("./root")

def 获取节点(request , 节点地址):

	此节点 = 节点.objects.get(地址 = 节点地址)

	if not 节点许可查询(request , 此节点):
		raise Http404

	内容 = deal_content(此节点.内容 , 此节点.内容类型)
	子节点列表 = filter(lambda 点 : 节点许可查询(request , 点) , 此节点.子.all())
	祖先节点列表 = filter(lambda 点 : 节点许可查询(request , 点) , 获取祖先节点列表(此节点))
	兄弟节点列表 = filter(lambda 点 : 节点许可查询(request , 点) , 获取兄弟节点列表(此节点))

	留言列表 = [言论 for 言论 in 此节点.留言.all()]
	留言列表.reverse()

	上下文 = {
		"此节点" : 此节点,
		"内容" : 内容,
		"子节点列表" : 子节点列表,
		"祖先节点列表" : 祖先节点列表,
		"兄弟节点列表" : 兄弟节点列表,
		"留言列表" : 留言列表,
	}
	模板位置 = 此节点.封面模板位置
	模板位置 = 应用名 + "/" + 模板位置

	return render(request , 模板位置 , 上下文)

def 提交留言(request , 节点地址):
	此节点 = 节点.objects.get(地址 = 节点地址)

	if request.POST:
		称呼 = request.POST.get('name')
		邮箱 = request.POST.get('email')
		内容 = request.POST.get('content')
		if not 称呼:
			称呼 = "匿名"
		if 内容:
			新留言 = 留言(内容 = 内容 , 对象 = 此节点 , 留言者称呼 = 称呼 , 留言者邮箱 = 邮箱)
			新留言.save()

	return http.HttpResponseRedirect("../" + 节点地址)