from django.shortcuts import render , HttpResponse , Http404
from .utils.permission_manage import 页许可查询
from .models import 页

def 获取页(request , 页地址 , 其他参数 = ""):

	此页 = 页.objects.filter(地址 = 页地址)[0]

	if not 页许可查询(request , 此页):
		raise Http404

	if 此页.类型 == 0:
		return HttpResponse(此页.内容)
	elif 此页.类型 == 1:
		variables = {
			"param" : 其他参数 , 
		}

		variables.update({文件.名 : 文件.内容 for 文件 in 此页.页文件.all()})
		run_func = {}
		exec(此页.内容)

		return HttpResponse(run_func["run"](variables))

	raise Http404 