from django.db import models
import django.utils.timezone as timezone

短文本长度 = 200

class 节点(models.Model):
	名 = models.CharField(max_length = 短文本长度)
	父 = models.ForeignKey("self", on_delete = models.SET_NULL , null = True , 
			blank = True , related_name = "子")
	地址 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	封面模板位置 = models.CharField(max_length = 短文本长度 , default = "default.html" , blank = True)
	封底模板位置 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	内容类型 = models.IntegerField(default = 0 , 
		choices = (
			(0 , "html"),
			(1 , "txt"),
			(2 , "md"),
		)
	)
	节点类型 = models.IntegerField(default = 0 , 
		choices = (
			(0 , "文章"),
			(1 , "集"),
		)
	)
	创建时间 = models.DateTimeField(default = timezone.now)
	最后修改时间 = models.DateTimeField(default = timezone.now)
	内容 = models.TextField(default = "" , blank = True)

	def __str__(self):
		return self.名

	def save(self):
		self.最后修改时间 = timezone.now()
		super(节点 , self).save()
		if not self.地址:
			self.地址 = "page_" + str(self.id)
			super(节点 , self).save()

class 留言(models.Model):
	对象 = models.ForeignKey(节点 , on_delete = models.CASCADE  , related_name = "留言")
	内容 = models.TextField(default = "")

	留言者称呼 = models.CharField(max_length = 短文本长度 , default = "匿名")
	留言者邮箱 = models.CharField(max_length = 短文本长度 , blank = True)

	创建时间 = models.DateTimeField(default = timezone.now)

