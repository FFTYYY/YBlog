from django.db import models

def _deal_default(val , defa):
	if not val:
		return defa
	return val

class 页(models.Model):
	名 = models.CharField(max_length = 200)
	地址 = models.CharField(max_length = 200 , default = "" , blank = True)
	模板文件夹 = models.CharField(max_length = 200 , default = "" , blank = True)
	列表视图模板名 = models.CharField(max_length = 200 , default = "" , blank = True)
	文章视图模板名 = models.CharField(max_length = 200 , default = "" , blank = True)

	def __str__(self):
		return self.名

	def save(self , *args , **kwargs):


		self.地址 = _deal_default(self.地址 , self.名)
		self.模板文件夹 = _deal_default(self.模板文件夹 , self.名)
		self.列表视图模板名 = _deal_default(self.列表视图模板名 , self.名 + ".html")
		self.文章视图模板名 = _deal_default(self.文章视图模板名 , self.名 + "-阅读.html")

		super(页,self).save(args , kwargs)

class 文章(models.Model):
	名 = models.CharField(max_length = 200)
	地址 = models.CharField(max_length = 200 , default = "" , blank = True)
	父页面 = models.ForeignKey(页, on_delete = models.CASCADE)
	类型 = models.CharField(max_length = 50 , default = "html")
	内容 = models.TextField(default = "")

	def __str__(self):
		return self.名

	def save(self , *args , **kwargs):

		def deal_default(val , defa):
			if not val:
				return defa
			return val

		self.地址 = _deal_default(self.地址 , self.名)

		super(文章,self).save(args , kwargs)

#Page = 页
#Article = 文章