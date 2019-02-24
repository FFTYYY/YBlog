from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter()
def make_static(路径 , 命令):
	'''
		命令:
			"Universe" ： 表示使用通用的静态文件
			"This" ： 表示使用通用的静态文件

	'''

	命令解释 = {
		"universe" : "Universe" , 
		"this" : "Article_Zone" , 
	}

	return 命令解释[命令.lower()] + "/" + 路径