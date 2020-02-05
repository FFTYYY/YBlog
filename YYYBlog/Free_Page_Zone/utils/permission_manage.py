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
		查询来访ip的最高访问等级
	'''
	cookie = request.COOKIES.get("YYYBLOG_VISITOR")
	
	if cookie is None:
		return 0

	访问人 = 访问者.objects.filter(cookie_value = cookie)

	if len(访问人) == 0:
		return 0

	最高访问等级 = 0
	for 人 in 访问人:
		if 更新权限(人):
			continue
		最高访问等级 = max(最高访问等级 , 人.访问等级)
	#print (最高访问等级)
	return 最高访问等级

def 页许可查询(request , 此页):
	'''
		查询request是否获得了足够的权限以访问讨论区
	'''
	权限 = 权限查询(request)
	return 权限 >= 此页.最低访问等级需求
