from .static.Article_Zone.display_list import *
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

def 节点许可查询(request , 此节点):
	'''
		查询request是否获得了足够的权限以访问节点
	'''
	while True:
		节点名 = 此节点.名

		权限 = 权限查询(request)
		for 权限列表 , 节点列表 in 不可视的节点列表.items():
			if 权限 in 权限列表 and 节点名 in 节点列表:
				return False
		
		if 此节点.父 is None or 此节点.父 is 此节点:
			break
		此节点 = 此节点.父
	return True
