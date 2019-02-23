from django.db import models
import time

短文本长度 = 200

class 空间(models.Model):
	名 = models.CharField(max_length = 短文本长度)
	位置 = models.CharField(max_length = 短文本长度)
	地址 = models.CharField(max_length = 短文本长度)

	def __str__(self):
		return self.名

class 访问者(models.Model):
	名 = models.CharField(max_length = 短文本长度)
	访问等级 = models.IntegerField(default = 0)
	密码 = models.CharField(max_length = 短文本长度 , blank = True)
	IP地址 = models.CharField(max_length = 短文本长度)
	进入时间 = models.BigIntegerField(default = 0)
	停留时间 = models.IntegerField(default = 30 * 60)

	def __str__(self):
		return self.名

	def save(self, *args, **kwargs):
		self.进入时间 = time.time()
		super(访问者 , self).save(*args, **kwargs)

