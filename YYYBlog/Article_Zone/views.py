from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import Http404
import django.http as http
from .models import 节点
from .methods import deal_content
from .权限控制 import *
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
	子节点列表 = filter(lambda 子节点 : 节点许可查询(request , 子节点) , 此节点.子.all())

	上下文 = {
		"节点对象" : 此节点,
		"内容" : 内容,
		"子节点列表" : 子节点列表,
	}
	模板位置 = 此节点.封面模板位置
	模板位置 = 应用名 + "/" + 模板位置

	return render(request , 模板位置 , 上下文)

