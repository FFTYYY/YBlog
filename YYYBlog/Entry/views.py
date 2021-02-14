from django.http import HttpResponse , Http404
from django.template import loader
from django.shortcuts import render , get_object_or_404
from .models import *
import django.http as http
from .utils.cookie_control import *

def index(request , 输入 = ""):
	return http.HttpResponseRedirect("/文章")

#给本机一个cookie。 可以通过临时修改这个函数来给本机发cookie
#具体的登录机制什么的暂时懒得做了，先这样吧
def get_cookie(request):

	ip地址 = request.META['REMOTE_ADDR']
	if ip地址 != "127.0.0.1":
		raise Http404

	if request.COOKIES.get("YYYBLOG_VISITOR") is not None:
		res = HttpResponse("already have cookie! (deleted")
		res.delete_cookie("YYYBLOG_VISITOR")
		return res

	名 = "我本人"
	访问等级 = 100
	密码 = ""
	停留时间 = -1
	cookie_value = make_cookie_value()
	访问人 = 访问者(名 = 名 , 访问等级 = 访问等级 , 密码 = 密码 , 停留时间 = 停留时间 , 
						cookie_value = cookie_value , IP地址 = ip地址)
	访问人.save()

	res = HttpResponse("获取Cookie成功！")

	set_cookie_访问者(访问人 , res)

	return res

