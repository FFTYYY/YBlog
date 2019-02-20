from django.db import models

短文本长度 = 200

class 节点(models.Model):
	名 = models.CharField(max_length = 短文本长度 , primary_key = True)
	地址 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	父 = models.ForeignKey("self", on_delete = models.SET_NULL , null = True , 
			blank = True , related_name = "子")
	节点类型 = models.IntegerField(default = 0 , 
		choices = (
			(0 , "文章"),
			(1 , "集"),
		)
	)
	封面模板位置 = models.CharField(max_length = 短文本长度 , default = "default.html" , blank = True)
	封底模板位置 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	内容类型 = models.CharField(max_length = 短文本长度 , default = "html")
	内容 = models.TextField(default = "")

	def __str__(self):
		return self.名

class 留言(models.Model):
	内容 = models.TextField(default = "")
	对象 = models.ForeignKey(节点 , on_delete = models.CASCADE  , related_name = "留言")

	留言者称呼 = models.CharField(max_length = 短文本长度 , default = "匿名")
	留言者邮箱 = models.CharField(max_length = 短文本长度 , blank = True)

