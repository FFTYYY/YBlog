'''
	一些处理额外定义的方法
'''

import markdown
from Article_Zone.models import *
from django.template import Context, Template

def deal_txt(内容):
	'''
		处理txt文件
	'''
	内容 = 内容.replace("<" , "&lt;")
	内容 = 内容.replace(">" , "&gt;")

	header = '''
	<style type="text/css">
		pre._txt_content_pre 
		{ 
			color : #F5F4F4FF;
			font-size : 15px;
			line-height : 17px;
			letter-spacing : 1px;
			font-family : "YouYuan";
			white-space: pre-wrap;
		} 
	</style>
	'''

	内容 = header + "<pre class = \"_txt_content_pre\">\n" + 内容 + "</pre>\n"

	return 内容

def deal_md(内容):
	'''
		处理.md文件
	'''
	内容 = markdown.markdown(内容)
	return 内容

def deal_template(内容 , 上下文):
	内容 = "{% load universe_extras %}\n{% load article_zone_extras %}\n" + 内容
	内容 = Template(内容).render(Context(上下文))
	return 内容

def deal_content(内容 , 上下文 = {} , 类型 = 0):
	'''
		根据后缀名，把不同类型的文本处理成html

		参数 内容：文件内容
		参数 名：文件名
	'''
	
	上下文["启用MathJax"] = (类型 == 0 or 类型 == 2)

	if 类型 == 1:
		内容 = deal_txt(内容)
	if 类型 == 2:
		内容 = deal_md(内容)
	if 类型 == 0:
		内容 = deal_template(内容 , 上下文)
	return 内容
