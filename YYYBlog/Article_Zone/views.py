from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import Http404
import django.http as http
from .models import 节点 , 留言
from .utils.relationship import *
from .utils.deal_content import *
from .utils.permission_manage import *
import os
import django.utils.timezone as timezone

应用名 = "Article_Zone"
应用地址 = "/文章"

def 默认(request):
	return http.HttpResponseRedirect("./root")

def 获取节点(request , 节点地址):

	此节点 = 节点.objects.get(地址 = 节点地址)

	if not 节点许可查询(request , 此节点):
		raise Http404

	上下文 = {}

	子节点列表 = filter(lambda 点 : 节点许可查询(request , 点) , 重排列(此节点.子))
	祖先节点列表 = filter(lambda 点 : 节点许可查询(request , 点) , 获取祖先节点列表(此节点))
	兄弟节点列表 = filter(lambda 点 : 节点许可查询(request , 点) , 获取兄弟节点列表(此节点))

	留言列表 = [言论 for 言论 in 此节点.留言.all()]
	留言列表.reverse()

	def 非空(x):return x

	强化标签 = [x for x in filter(非空 , 此节点.界面强化标签.split(","))]

	上下文.update({
		"此节点" : 此节点,
		"子节点列表" : 子节点列表,
		"祖先节点列表" : 祖先节点列表,
		"兄弟节点列表" : 兄弟节点列表,
		"留言列表" : 留言列表,
		"强化标签" : 强化标签,
		"额外样式" : 此节点.额外样式,
	})

	内容 = deal_content(此节点.内容 , 上下文 , 此节点.内容类型)

	上下文.update({
		"内容" : 内容,
	})


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
			新留言 = 留言(内容 = 内容 , 对象 = 此节点 , 留言者称呼 = 称呼 , 留言者邮箱 = 邮箱 , 
					创建时间 = timezone.now())
			新留言.save()

	return http.HttpResponseRedirect("../" + 节点地址)