from django.contrib.syndication.views import Feed

from .models import Node
from yblog.extra_infos import blog_name

class AllPostsRssFeed(Feed):

    title = blog_name
    link = "/"
    description = "%s 全部文章" % blog_name

    def items(self):
        return Node.objects.all()

    def item_title(self, item):
        return item.get_title()

    def item_description(self, item):
        return item.tldr
    
    def item_link(self, item):
        return "/view/content/%d" % item.id
