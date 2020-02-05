from django.shortcuts import render , HttpResponse , Http404
from .utils.permission_manage import 页许可查询
from .models import 页

def 获取页(request , 页地址 , 其他参数 = ""):

	此页 = 页.objects.filter(地址 = 页地址)[0]

	if not 页许可查询(request , 此页):
		raise Http404

	return HttpResponse(此页.内容)