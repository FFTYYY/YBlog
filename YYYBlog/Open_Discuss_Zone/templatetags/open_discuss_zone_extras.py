from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter()
def make_static(路径 , 命令):
	'''
		命令:
			"universe" ： 表示使用通用的静态文件
			"this" ： 表示使用通用的静态文件

	'''

	命令解释 = {
		"universe" : "Universe" , 
		"this" : "Open_Discuss_Zone" , 
	}

	return 命令解释[命令.lower()] + "/" + 路径