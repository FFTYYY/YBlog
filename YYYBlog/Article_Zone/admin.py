from django.contrib import admin
from .models import *
from django.utils.html import format_html
 
class 节点Admin(admin.ModelAdmin):
	list_filter = ["节点类型" , ]
	list_display = ["名" , "子节点" , "父节点"]

	def 子节点(self, obj):
		return format_html("<a href = ./?父__exact=%s>子节点列表</a>" % (obj.名))
	def 父节点(self, obj):
		return format_html("<a href = ./?名__exact=%s>%s</a>" % (obj.父 , obj.父))

class 留言Admin(admin.ModelAdmin):
	list_display = ["评论对象" , "评论内容"]

	def 评论对象(self, obj):
		return obj.对象.名

	def 评论内容(self , obj , cut_len = 20):
		if len(obj.内容) > cut_len:
			return obj.内容[:cut_len] + "..."
		return obj.内容


admin.site.register(节点 , 节点Admin)
admin.site.register(留言 , 留言Admin)