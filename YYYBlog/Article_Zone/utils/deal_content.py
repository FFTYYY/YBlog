'''
	一些处理额外定义的方法
'''

import markdown
from Article_Zone.models import *
from django.template import Context, Template
import re

def deal_txt(内容 , 上下文):
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

def deal_md(内容 , 上下文):
	'''
		处理.md文件
	'''


	'''
		转成html
	'''
	内容 = markdown.markdown(内容)
	内容 = deal_html(内容)
	上下文["强化标签"].append("md文件")
	return 内容

def deal_html(内容 , 上下文):
	上下文["强化标签"].append("html文件")
	return 内容

def deal_template(内容 , 上下文):
	内容 = deal_html(内容 , 上下文)
	内容 = "{% load universe_extras %}\n{% load article_zone_extras %}\n" + 内容 
	内容 = Template(内容).render(Context(上下文))
	return 内容

def deal_pdf(内容 , 上下文):
	#找到pdf文件的url
	内容 = re.search("\"[\\s\\S]{0,}\\.pdf\"",内容).group(0)
	内容 = 内容.replace("\"","")


	'''
		创建元素_canvas_list，其中添加一系列canvas，并且用于显示pdf图片
	'''
	内容 = '''
		<!--保存canvas的容器-->
		<div id="_canvas_list" style="width:100%%;height:100%%"></div>

		<script src="/static/universe/pdfjs/build/pdf.js"></script>

		<script type = "text/javascript">

			//会在执行完后调用，等待之后来赋值
			function can_lis_init_done(){ }

			var can_lis = document.getElementById("_canvas_list");
			var pre_h = can_lis.offsetHeight;
			var pre_w = can_lis.offsetWidth;

			var url = "%s";

			pdfjsLib.GlobalWorkerOptions.workerSrc = "/static/universe/pdfjs/build/pdf.worker.js";
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

								if(page.pageIndex + 1 == pdf._pdfInfo.numPages)
								{
									//TODO : 这个间隔太显眼了
									setTimeout( can_lis_init_done , 600 );
								}
							}
						);
					}
				}
			);
		</script>
		''' % (内容)


	上下文["强化标签"].append("pdf文件")
	return 内容


def deal_content(内容 , 上下文 = {} , 类型 = 0):
	'''
		根据后缀名，把不同类型的文本处理成html

		参数 内容：文件内容
		参数 名：文件名
	'''
	
	上下文["启用MathJax"] = (类型 == 0 or 类型 == 2)

	if 类型 == 1:
		内容 = deal_txt		(内容 , 上下文)
	if 类型 == 2:
		内容 = deal_md		(内容 , 上下文)
	if 类型 == 0:
		内容 = deal_template(内容 , 上下文)
	if 类型 == 3:
		内容 = deal_html		(内容 , 上下文)
	if 类型 == 4:
		内容 = deal_pdf		(内容 , 上下文)
	return 内容
