from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import Http404
import django.http as http
from .models import *
from .utils.permission_manage import *
import os
import django.utils.timezone as timezone
import copy

应用名 = "Open_Discuss_Zone"
应用地址 = "/Discuss"

def 默认(request):
	return http.HttpResponseRedirect("./root")

def 获取讨论区(request , 讨论区地址):

	此讨论区 = 讨论区.objects.get(地址 = 讨论区地址)

	if not 讨论区许可查询(request , 此讨论区):
		raise Http404

	上下文 = {}

	上下文.update({
		"此讨论区" : 此讨论区,
		"朋友列表" : 此讨论区.朋友.all(),
		"话题列表" : 此讨论区.话题.all(),
		"启用MathJax" : False,
	})

	模板位置 = 应用名 + "/" + 此讨论区.模板.讨论区模板位置

	return render(request , 模板位置 , 上下文)

def 获取话题(request , 讨论区地址 , 话题地址):

	此话题 = 话题.objects.get(地址 = 话题地址)

	if not 讨论区许可查询(request , 此话题.讨论区):
		raise Http404

	言论列表 = []
	for 言 in 此话题.言论.all():
		称呼 = 言.称呼[:20]
		名称长度 = 3*((len(称呼.encode("utf-8")) - len(称呼)) // 2) + len(称呼)
		if 名称长度 < 20:
			称呼 = 称呼 + (" " * (20-名称长度))

		附加信息 = "\t\t--By %s | %s | %2d楼" % (称呼 , 言.时间 , len(言论列表) + 1)
		if 言.邮箱:
			附加信息 += " | %20s" % (言.邮箱)
		附加信息 = 附加信息.replace(" " , "&nbsp")
		附加信息 = 附加信息.replace("\t" , 8*"&nbsp")
		言论列表.append((言.内容 , 附加信息))


	上下文 = {}

	上下文.update({
		"此话题" : 此话题,
		"言论列表" : 言论列表,
		"时间" : 此话题.言论.all()[0].时间 if len(此话题.言论.all()) > 0 else "（其实就是第一个言论发表的时间不过现在还没有言论）",
		"启用MathJax" : False,
	})

	模板位置 = 应用名 + "/" + 此话题.模板.话题模板位置

	return render(request , 模板位置 , 上下文)


def 新建话题(request , 讨论区地址):
	此讨论区 = 讨论区.objects.get(地址 = 讨论区地址)

	if request.POST:
		名 = request.POST.get('name')
		新话题 = 话题(讨论区 = 此讨论区, 名 = 名, 模板 = 此讨论区.模板)
		新话题.save()

	return http.HttpResponseRedirect("../" + 此讨论区.地址)

def 新建言论(request , 讨论区地址 , 话题地址):
	此话题 = 话题.objects.get(地址 = 话题地址)

	if request.POST:
		称呼 = request.POST.get('name')
		内容 = request.POST.get('content')
		邮箱 = request.POST.get('email')
		新言论 = 言论(话题 = 此话题, 内容 = 内容 , 称呼 = 称呼, 邮箱 = 邮箱)
		新言论.save()

	return http.HttpResponseRedirect("../" + 此话题.地址)