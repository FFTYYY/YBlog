from django.contrib import admin
from .models import *
from django.utils.html import format_html
 
#Blog模型的管理器
class 节点Admin(admin.ModelAdmin):
	list_filter = ["节点类型" , ] #过滤器
	list_display = ["名" , "子节点" , "父节点"]

	def 子节点(self, obj):
		return format_html("<a href = ./?父__exact=%s>子节点列表</a>" % (obj.名))
	def 父节点(self, obj):
		return format_html("<a href = ./?名__exact=%s>%s</a>" % (obj.父 , obj.父))


admin.site.register(节点 , 节点Admin)