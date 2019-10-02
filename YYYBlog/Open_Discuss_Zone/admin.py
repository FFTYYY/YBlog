from django.contrib import admin
from .models import *
from django.utils.html import format_html

class 讨论区Admin(admin.ModelAdmin):
	filter_horizontal = ["朋友"]

admin.site.register(讨论_界面模板)
admin.site.register(讨论区 , 讨论区Admin)
admin.site.register(话题)
admin.site.register(言论)