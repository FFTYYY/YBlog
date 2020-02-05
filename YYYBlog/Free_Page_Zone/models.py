from django.db import models

短文本长度 = 200

class 页(models.Model):
	名 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	地址 = models.CharField(max_length = 短文本长度 , default = "" , blank = True)
	最低访问等级需求 = models.IntegerField(default = 0)

	内容 = models.TextField(default = "" , blank = True)

	def save(self , *pargs , **kwargs):
		if not self.地址:
			super().save(*pargs , **kwargs)
			self.地址 = "Page_%d" % self.id
		return super().save(*pargs , **kwargs)


	def __str__(self):
		return self.名

