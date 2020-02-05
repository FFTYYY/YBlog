from django.contrib import admin
from .models import *

class 页文件Inline(admin.TabularInline):
	model = 页文件
	extra = 0


class 页Admin(admin.ModelAdmin):
	inlines = [ 页文件Inline, ]

admin.site.register(页 , 页Admin)
admin.site.register(页文件)
