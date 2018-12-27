'''
	一些处理额外定义的方法
'''

import markdown

def deal_txt(内容):
	'''
		处理txt文件
	'''
	内容 = 内容.replace("<" , "&lt;")
	内容 = 内容.replace(">" , "&gt;")

	header = '''
	<style type="text/css">
		pre { 
			white-space: pre-wrap;
		} 
	</style>
	'''

	内容 = header + "<pre>\n" + 内容 + "</pre>\n"

	return 内容

def deal_md(内容):
	'''
		处理.md文件
	'''
	内容 = markdown.markdown(内容)
	return 内容

def deal_content(内容 , 类型 = "html"):
	'''
		根据后缀名，把不同类型的文本处理成html

		参数 内容：文件内容
		参数 名：文件名
	'''
	if 类型 == "txt":
		内容 = deal_txt(内容)
	elif 类型 == "md":
		内容 = deal_md(内容)

	return 内容
