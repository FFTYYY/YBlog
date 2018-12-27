from django.db import models
import time

class 空间(models.Model):
	名 = models.CharField(max_length = 200)
	位置 = models.CharField(max_length = 200)
	地址 = models.CharField(max_length = 200)

	def __str__(self):
		return self.名

class 访问者(models.Model):
	权限等级 = models.CharField(max_length = 20)
	密码 = models.CharField(max_length = 200 , blank = True)
	IP地址 = models.CharField(max_length = 50)
	进入时间 = models.BigIntegerField(default = 0)
	停留时间 = models.IntegerField(default = 30 * 60)

	def __str__(self):
		return self.权限等级

	def save(self, *args, **kwargs):
		self.进入时间 = time.time()
		super(访问者 , self).save(*args, **kwargs)

