from django.urls import path
from . import views

app_name = __package__

urlpatterns = [
	path("<str:页地址>" , views.获取页) , 
	path("<str:页地址>/<str:其他参数>" , views.获取页) , 
]
