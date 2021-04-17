from django.db import models
import django.utils.timezone as timezone
import os
from ckeditor_uploader.fields import RichTextUploadingField

短文本长度 = 200

class 界面模板(models.Model):
	名 = models.CharField(max_length = 短文本长度)
	封面位置 = models.CharField(max_length = 短文本长度 , blank = True)
	封底位置 = models.CharField(max_length = 短文本长度 , blank = True)

	def __str__(self):
		return self.名

class 节点(models.Model):
	名 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	父 = models.ForeignKey("self", on_delete = models.SET_NULL , null = True , 
			blank = True , related_name = "子")
	地址 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	模板 = models.ForeignKey("界面模板" , on_delete = models.SET_NULL , 
			default = 0 , null = True)
	创建时间 = models.DateTimeField(default = timezone.now)
	最后修改时间 = models.DateTimeField(default = timezone.now)
	内容类型 = models.IntegerField(default = 0 , 
		choices = (
			(0 , "html（Django模板）"),
			(1 , "pdf"),
		)
	)
	节点类型 = models.IntegerField(default = 0 , 
		choices = (
			(0 , "文章"),
			(1 , "集"),
		)
	)
	排序依据 = models.IntegerField(default = 0)
	最低访问等级需求 = models.IntegerField(default = 0)
	内容 = RichTextUploadingField(default = "" , blank = True)
	附加内容 = models.ManyToManyField(to = "附加" , related_name = "所在")

	def __str__(self):
		return self.名

	def save(self , *args , **kwargs):
		self.最后修改时间 = timezone.now()

		if self.父 and self.排序依据 == 0:
			排序依据列表 = [x.排序依据 for x in self.父.子.all()]
			if len(排序依据列表) == 0:
				self.排序依据 = 1 
			else : self.排序依据 = max( 排序依据列表 ) + 1

		super(节点 , self).save(*args , **kwargs)

		if not self.地址:
			self.地址 = "page_" + str(self.id)
		if not self.名:
			self.名 = "%04d-%02d-%02d" % (int(self.创建时间.year) , int(self.创建时间.month) , int(self.创建时间.day))
			
		return super(节点 , self).save(*args , **kwargs)

	@property
	def 封面模板位置(self):
		return self.模板.封面位置
	@property
	def 封底模板位置(self):
		return self.模板.封底位置


class 附加(models.Model):
	名 = models.CharField(max_length = 短文本长度)
	内容 = models.TextField(default = "")
	类型 = models.IntegerField(default = 0 , 
		choices = (
			(0 , "HTML"),
			(1 , "Python"),
		)
	)

	def __str__(self):
		return self.名


class 留言(models.Model):
	对象 = models.ForeignKey(节点 , on_delete = models.CASCADE  , related_name = "留言")
	内容 = models.TextField(default = "")

	留言者称呼 = models.CharField(max_length = 短文本长度 , default = "匿名")
	留言者邮箱 = models.CharField(max_length = 短文本长度 , blank = True)

	创建时间 = models.DateTimeField(default = timezone.now)
