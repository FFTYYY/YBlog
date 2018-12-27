from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import Http404
from .models import 页
from .methods import deal_content
from .权限控制 import *
import os

#print (os.path.dirname(__file__))

应用名 = "Article_Zone"
静态文件前缀 = "{0}/static".format(os.path.dirname(__file__))

def index(request):
	页面列表 = filter(lambda 页面:页面许可查询(request , 页面.名) , 页.objects.all())
	上下文 = {
		"页面列表" : 页面列表,
	}

	模板名 = "index.html"
	模板名 = 应用名 + "/" + 模板名

	return render(request , 模板名 , 上下文)

def 页面文件夹(页面):
	return 应用名 + "/" + 页面.模板文件夹

def 获取页面(request , 页面地址):
	页面对象 = 页.objects.get(地址 = 页面地址)

	if not 页面许可查询(request , 页面对象.名):
		raise Http404

	文章列表 = filter(lambda 文章:文章许可查询(request,页面对象.名,文章.名) , 页面对象.文章_set.all())

	上下文 = {
		"页面" : 页面对象,
		"文章列表" : 文章列表,
	}

	模板名 = 页面对象.列表视图模板名
	模板名 = 页面文件夹(页面对象) + "/" + 模板名

	return render(request , 模板名 , 上下文)

def 获取文章(request , 页面地址 , 文章地址):
	页面对象 = 页.objects.get(地址 = 页面地址)
	文章对象 = 页面对象.文章_set.get(地址 = 文章地址)

	if not 文章许可查询(request , 页面对象.名 , 文章对象.名):
		raise Http404

	文章内容 = deal_content(文章对象.内容 , 文章对象.类型)

	上下文 = {
		"页面" : 页面对象,
		"文章" : 文章对象,
		"文章内容" : 文章内容,
	}
	模板名 = 模板名 = 页面对象.文章视图模板名
	模板名 = 页面文件夹(页面对象) + "/" + 模板名

	return render(request , 模板名 , 上下文)
