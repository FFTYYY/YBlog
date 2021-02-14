#修改所有文章的<br>为</p><p>

from Article_Zone.models import 节点
import re
def run():
	for x in 节点.objects.all():

		s = x.内容.split("<br />")
		new_s = ""

		ss_count = 0
		for idx , piece in enumerate(s):
			
			if idx == 0:
				new_s += piece
			elif ss_count % 2 == 0:
				new_s += "</p><p>" + piece
			else:
				new_s += "<br />" + piece

			ss_count += len( re.findall("(\\$\\$)|(\\$)" , piece) )
		x.内容 = new_s
		x.save()

