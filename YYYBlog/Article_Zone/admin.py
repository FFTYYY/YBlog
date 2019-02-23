from django.contrib import admin
from .models import *
from django.utils.html import format_html

def 字符串截短(s , cut_len = 20):
	if len(s) > cut_len:
		s = s[:cut_len] + "..."
	return s

class 文章文件Inline(admin.TabularInline):
	model = 文章文件

class 节点Admin(admin.ModelAdmin):
	list_filter = ["节点类型"]
	list_display = ["名" , "子节点" , "父节点" , "节点类型"]
	raw_id_fields = ["父",]
	search_fields = ["名"]

	inlines = [文章文件Inline]

	def 子节点(self , 对象):
		return format_html("<a href = ./?父__exact=%s>子节点列表</a>" % (对象.id))
	def 父节点(self , 对象):
		if 对象.父:
			return format_html("<a href = ./?id__exact=%s>%s</a>" % (对象.父.id , 对象.父))
		return "无"


class 留言Admin(admin.ModelAdmin):
	list_display = ["留言内容"  , "留言对象" , "留言者" , "留言者邮箱" , "创建时间"]

	def 留言对象(self , 对象):
		return 字符串截短(对象.对象.名)

	def 留言内容(self , 对象 , cut_len = 20):
		return 字符串截短(对象.内容)

	def 留言者(self , 对象):
		return 字符串截短(对象.留言者称呼)

	def 留言者邮箱(self , 对象):
		return 字符串截短(对象.留言者邮箱)


class 文章文件Admin(admin.ModelAdmin):
	list_display = ["文件名" , "目标节点"]
	raw_id_fields = ["目标节点",]

	def 目标节点(self , 对象):
		return 对象.目标节点.名 


admin.site.register(节点 , 节点Admin)
admin.site.register(留言 , 留言Admin)
admin.site.register(文章文件 , 文章文件Admin)