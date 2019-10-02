from django.urls import path
from . import views

app_name = __package__

urlpatterns = [
	path("", views.默认, name = "默认") ,
	path("<str:讨论区地址>/" , views.获取讨论区) ,
	path("<str:讨论区地址>/newtopic_submit" , views.新建话题) , 
	path("<str:讨论区地址>/<str:话题地址>/" , views.获取话题) ,
	path("<str:讨论区地址>/<str:话题地址>/newcomment_submit" , views.新建言论) ,
]
