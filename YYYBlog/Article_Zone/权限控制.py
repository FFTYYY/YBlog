from .static.显示列表 import *
from Entry.models import 访问者
import time

def 更新权限(访问人):
	'''
		查看访问人的权限是否到期，如果到期删除其权限

		返回值：bool，权限到期则为True
	'''
	当前时间 = time.time()
	if 访问人.停留时间 > 0 and 访问人.进入时间 + 访问人.停留时间 < 当前时间:
		访问人.delete()
		return True
	return False

def 权限查询(request):
	'''
		查询来访ip的权限等级
	'''
	ip地址 = request.META['REMOTE_ADDR']
	访问人 = 访问者.objects.filter(IP地址 = ip地址)
	if len(访问人) > 1:
		raise RuntimeError("ArticleZone.权限控制.权限查询：IP:%s：多于一个权限等级" % (ip地址))
	elif len(访问人) == 0:
		return "访客"
	if 更新权限(访问人[0]):
		return "访客"
	return 访问人[0].权限等级

def 页面许可查询(request , 页面名):
	权限 = 权限查询(request)
	for 权限列表 , 页面列表 in 不可视的页面列表.items():
		if 权限 in 权限列表 and 页面名 in 页面列表:
			return False
	return True

def 文章许可查询(request , 页面名 , 文章名):
	权限 = 权限查询(request)
	for 权限列表 , 文章列表 in 不可视的文章列表.items():
		if 权限 in 权限列表 and (页面名,文章名) in 文章列表:
			return False
	return True

