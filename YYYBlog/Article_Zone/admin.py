from django.contrib import admin
from .models import *
from django.utils.html import format_html
from .utils.relationship import *

def 字符串截短(s , cut_len = 20):
	if len(s) > cut_len:
		s = s[:cut_len] + "..."
	return s


class 按深度查找(admin.SimpleListFilter):
	cut_len = 5
	title = '深度'
	parameter_name = 'depth'

	def 深度字符串(self , val):
		if val > self.cut_len:
			return "深于%d" % self.cut_len
		return str(val)

	def 节点深度(self , 点):
		return 节点深度(点 , self.cut_len)

	def lookups(self, request, model_admin):
		return [ (x+1 , self.深度字符串(x+1)) for x in range(self.cut_len + 1)]

	def queryset(self, request, queryset):
		if self.value() is None:
			return queryset
		符合条件的节点 = [点.id for 点 in 节点.objects.all() if str(self.节点深度(点)) == self.value()]
		return queryset.filter(id__in = 符合条件的节点)

class 节点Admin(admin.ModelAdmin):
	list_filter = ["节点类型" , 按深度查找 , ]
	list_display = ["名" , "子节点" , "父节点" , "节点类型" , "深度" , ]
	raw_id_fields = ["父" , ]
	search_fields = ["名" , ]

	def 子节点(self , 对象):
		增加地址 = "?父__exact=%s"% (对象.id)
		地址 = self.request.get_full_path()
		if 地址.find("_popup=1") >= 0:
			增加地址 += "&_popup=1"
		地址 = self.request.path + 增加地址
		return format_html("<a href = %s>子节点列表</a>" % (地址))

	def 父节点(self , 对象):
		if not 对象.父:
			return "无"
		增加地址 = "?id__exact=%s"% (对象.父.id)
		地址 = self.request.get_full_path()
		if 地址.find("_popup=1") >= 0:
			增加地址 += "&_popup=1"
		地址 = self.request.path + 增加地址
		return format_html("<a href = %s>%s</a>" % (增加地址 , 对象.父))

	def 深度(self , 对象):
		return 节点深度(对象)

	def change_view(self, request, object_id, form_url='', extra_context=None):
		self.request = request
		return super(节点Admin, self).change_view(request, object_id, form_url=form_url, extra_context=extra_context)

	def changelist_view(self, request, extra_context=None):
		self.request = request
		return super(节点Admin,self).changelist_view(request, extra_context=extra_context)


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

admin.site.register(节点 , 节点Admin)
admin.site.register(留言 , 留言Admin)