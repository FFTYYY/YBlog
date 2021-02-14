#修改所有文章的<br>为</p><p>
from bs4 import BeautifulSoup
from Article_Zone.models import 节点
import re
def run():
	for x in 节点.objects.all():

		s = x.内容.split("<br />")
		new_s = ""

		ss_count = 0
		for idx , piece in enumerate(s):
			
			if len(piece) > 0 and piece[0] == "\n":
				piece = piece[1:]

			if idx == 0:
				new_s += piece
			elif ss_count % 2 == 0:
				new_s += "</p>\n<p>" + piece
			else:
				new_s += "<br />\n" + piece

			ss_count += len( re.findall("(\\$\\$)|(\\$)" , piece) )
		new_s = re.sub("<p>\\s*</p>" , "<p> &nbsp; </p>" ,  new_s)

		soup = BeautifulSoup(new_s , "html.parser")
		soup.prettify()
		new_s = str(soup)

		new_s = re.sub("<p>\\s*</p>" , "<p> &nbsp; </p>" ,  new_s)

		x.内容 = new_s
		x.save()

