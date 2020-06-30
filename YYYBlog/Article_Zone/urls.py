from django.urls import path
from . import views

app_name = __package__

urlpatterns = [
	path("", views.默认, name = "默认") ,
	path("<str:节点地址>/submit_comment" , views.提交留言) , 
	path("<str:节点地址>/get_node_list" , views.获取周围节点) ,
	path("<str:节点地址>/" , views.获取节点) ,
]
