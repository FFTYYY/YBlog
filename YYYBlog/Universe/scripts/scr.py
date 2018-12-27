'''
	unuseful
'''

from Article_Zone.models import 文章

for x in 文章.objects.all():
	y = ""
	if x.内内容.endswith(".html"):
		y = "html"
	elif x.内内容.endswith(".md"):
		y = "md"
	else: y = "txt"

	x.文章类型 = y
	x.save()
