from django.contrib.syndication.views import Feed

from .models import Node


class AllPostsRssFeed(Feed):

    title = "识文解意的爱书人"
    link = "/"
    description = "识文解意的爱书人 全部文章"

    def items(self):
        return Node.objects.all()

    def item_title(self, item):
        return item.get_title()

    def item_description(self, item):
        return item.tldr
    
    def item_link(self, item):
        return "/view/content/%d" % item.id
