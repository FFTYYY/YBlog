from django import template
from django.template.defaultfilters import stringfilter
from Article_Zone.utils.deal_file import get_file_name_目标节点

register = template.Library()

@register.filter()
def get_file_path(文件名 , 节点):
	return "/media/" + get_file_name_目标节点(节点 , 文件名)

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