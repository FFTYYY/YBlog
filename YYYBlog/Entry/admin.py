from django.contrib import admin
from .models import 空间 , 访问者
import time

class 访问者Admin(admin.ModelAdmin):
	list_display = ["名" , "访问等级" , "IP地址" , "剩余时间"]

	def 剩余时间(request , 对象):
		if 对象.停留时间 < 0:
			return "∞"
		return "%ds" % (对象.停留时间 - (time.time() - 对象.进入时间))

admin.site.register(空间)
admin.site.register(访问者 , 访问者Admin)
