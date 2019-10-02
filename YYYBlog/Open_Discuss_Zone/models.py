from django.db import models
import django.utils.timezone as timezone
import os
#from simditor.fields import RichTextField
import pdb
from ckeditor_uploader.fields import RichTextUploadingField

短文本长度 = 200

def 字符串截短(s , cut_len = 20):
	if len(s) > cut_len:
		s = s[:cut_len] + "..."
	return s

class 讨论_界面模板(models.Model):
	名 = models.CharField(max_length = 短文本长度)
	讨论区模板位置 = models.CharField(max_length = 短文本长度 , blank = True)
	话题模板位置 = models.CharField(max_length = 短文本长度 , blank = True)

	def __str__(self):
		return self.名

class 讨论区(models.Model):
	名 = models.CharField(max_length = 短文本长度)
	地址 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	模板 = models.ForeignKey("讨论_界面模板" , on_delete = models.SET_NULL , 
			default = 0 , null = True)
	最低访问等级需求 = models.IntegerField(default = 0)

	朋友 = models.ManyToManyField("讨论区" , blank = True)

	def __str__(self):
		return self.名

	def save(self , *args , **kwargs):

		super(讨论区 , self).save(*args , **kwargs)
		
		for 朋 in self.朋友.all():
			if len(朋.朋友.filter(id = self.id)) == 0:
				朋.朋友.add(self)
				朋.save()
		super(讨论区 , self).save(*args , **kwargs)

		if not self.地址:
			self.地址 = "discuss_" + str(self.id)
		return super(讨论区 , self).save(*args , **kwargs)

class 话题(models.Model):
	讨论区 = models.ForeignKey(讨论区 , on_delete = models.CASCADE  , related_name = "话题")
	名 = models.TextField(default = "")
	地址 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)

	模板 = models.ForeignKey("讨论_界面模板" , on_delete = models.SET_NULL , 
			default = 0 , null = True)

	def __str__(self):
		return self.名

	def save(self , *args , **kwargs):
		if not self.地址:
			super(话题 , self).save(*args , **kwargs)
			self.地址 = "topic_" + str(self.id)
		return super(话题 , self).save(*args , **kwargs)


class 言论(models.Model):

	话题 = models.ForeignKey(话题 , on_delete = models.CASCADE  , related_name = "言论")

	内容 = models.TextField(default = "")

	称呼 = models.CharField(max_length = 短文本长度 , default = "匿名")
	邮箱 = models.CharField(max_length = 短文本长度 , blank = True)

	创建时间 = models.DateTimeField(default = timezone.now)

	def __str__(self):
		return 字符串截短(self.内容)

	@property
	def 时间(self):
		t = self.创建时间
		return "%04d-%02d-%02d %02d:%02d" % (t.year , t.month , t.day , t.hour , t.minute)


