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

def deal_html(内容):
	内容 = """
		<style type="text/css">
			q
			{
				/*background-color : #333333FF;*/
				padding-top : 5px;
				padding-left : 5px;
				padding-bottom : 5px;
				padding-right : 5px;
				margin : 8px;
				display : inline-block;
				width:auto;
				font-family : "STKaiti";
				font-size : 120%;
				line-height : 120%;
				quotes : none;
			}
			.marker
			{
				font-family : "Kaiti";
				color : #C1C1C1FF;
				margin-left: 3px;
			}
			.marker>strong
			{
				font-family : "Kaiti";
				color : #C9C9C9FF;
				font-weight : 120%;
			}
		</style>

		<div class = "the_inside_content">
	""" + 内容 + """
		</div>
	"""
	return 内容

def deal_template(内容 , 上下文):
	内容 = deal_html(内容)
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
	if 类型 == 3:
		内容 = deal_html(内容)
	return 内容
