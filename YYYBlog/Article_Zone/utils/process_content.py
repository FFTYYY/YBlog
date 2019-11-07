﻿'''
	一些处理额外定义的方法
'''

import markdown
from Article_Zone.models import *
from django.template import Context, Template
import re
import urllib

def process_txt(内容 , 上下文):
	'''
		处理txt文件
	'''
	内容 = 内容.replace("<" , "&lt;")
	内容 = 内容.replace(">" , "&gt;")

	'''
		把他处理成pre
	'''
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

def process_md(内容 , 上下文):
	'''
		处理.md文件
	'''


	'''
		转成html
	'''
	内容 = markdown.markdown(内容)
	内容 = process_html(内容)
	上下文["强化标签"].append("md文件")
	return 内容

def process_html(内容 , 上下文):
	上下文["强化标签"].append("html文件")
	return 内容

def process_template(内容 , 上下文):
	内容 = process_html(内容 , 上下文)
	内容 = "{% load universe_extras %}\n{% load article_zone_extras %}\n" + 内容 
	内容 = Template(内容).render(Context(上下文))
	return 内容

def process_pdf(内容 , 上下文):
	#找到pdf文件的url

	if 内容.find("_PDF_PROCESSOR_INTERNET_URL") >= 0: 
		#尝试通过网址自动下载内容，并且储存到_PDF_PROCESSOR_LOCAL_URL中
		网址 = re.search("_PDF_PROCESSOR_INTERNET_URL=\\[" + "([\\S]{0,})" + "\\]" , 内容).group(1)	

	地址 = re.search("_PDF_PROCESSOR_LOCAL_URL=\\[" + "([\\S]{0,})" + "\\]" , 内容).group(1)

	根 = "./" + 地址

	try:
		urllib.request.urlretrieve(网址 , 根)
	except Exception:
		pass

	'''
		创建元素_canvas_list，其中添加一系列canvas，并且用于显示pdf图片
	'''
	内容 = '''
		{%% load static %%}
		{%% load universe_extras %%}
		{%% load article_zone_extras %%}


		<script src = {%% static "components/process_pdf.js"|make_static:"this" %%} ></script>

		<!--保存canvas的容器-->
		<div id="_canvas_list" style="width:100%%;height:100%%"></div>

		<script src = {%% static "pdfjs/build/pdf.js"|make_static:"universe" %%} ></script>

		<script type = "text/javascript">

			//会在执行完后调用，等待之后来赋值
			function can_lis_init_done(){ }

			var can_lis = document.getElementById("_canvas_list");
			var pre_h = can_lis.offsetHeight;
			var pre_w = can_lis.offsetWidth;

			var url = "%s";

			pdfjsLib.GlobalWorkerOptions.workerSrc = 
					" {%% static "pdfjs/build/pdf.worker.js"|make_static:"universe" %%} ";

			var loadingTask = pdfjsLib.getDocument(url);

			loadingTask.promise.then
			(
				function(pdf) 
				{
					for(var page_i = 1;page_i <= pdf._pdfInfo.numPages;page_i++)
					{
						pdf.getPage(page_i).then
						(
							function(page) 
							{
								var canvas = document.createElement("canvas");
								can_lis.appendChild(canvas);

								var ctx = canvas.getContext("2d");

								var page_wid = page._pageInfo.view[2] - page._pageInfo.view[0];
								var page_hei = page._pageInfo.view[3] - page._pageInfo.view[1];

								var scale = pre_w / page_wid;

								canvas.height = page_hei * scale;
								canvas.width = page_wid * scale;

								var viewport = page.getViewport( 1 * scale );

								//防止canvas绘图模糊
								deal_with_unclear_canvas(canvas , ctx);

								var renderContext = 
								{
									canvasContext: ctx,
									viewport: viewport,
								};
								page.render(renderContext);

								//if(page.pageIndex + 1 == pdf._pdfInfo.numPages)
								//{
								//	setTimeout( can_lis_init_done , Math.max(60 * pdf._pdfInfo.numPages,400) );
								//}
							}
						);
					}
				}
			);
		</script>
		''' % (地址)

	内容 = Template(内容).render(Context(上下文))

	上下文["强化标签"].append("pdf文件")
	return 内容


def process_content(内容 , 上下文 = {} , 类型 = 0):
	'''
		根据后缀名，把不同类型的文本处理成html

		参数 内容：文件内容
		参数 名：文件名
	'''
	
	上下文["启用MathJax"] = (类型 == 0 or 类型 == 2)

	if 类型 == 1:
		内容 = process_txt		(内容 , 上下文)
	if 类型 == 2:
		内容 = process_md		(内容 , 上下文)
	if 类型 == 0:
		内容 = process_template	(内容 , 上下文)
	if 类型 == 3:
		内容 = process_html		(内容 , 上下文)
	if 类型 == 4:
		内容 = process_pdf		(内容 , 上下文)
	return 内容
