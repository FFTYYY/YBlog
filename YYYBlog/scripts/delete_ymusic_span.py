#删掉所有过时的ymusic标记<span class = "ymusic">

from bs4 import BeautifulSoup
from Article_Zone.models import 节点
import re
def run():
	to_rem = '<span class="YMusic" fillcolor="#CCCCCC" height="100">'
	count = 0
	for x in 节点.objects.all():

		if to_rem in x.内容:
			count += 1
		x.内容 = x.内容.replace(to_rem , "")
		x.save()

	print(count)
