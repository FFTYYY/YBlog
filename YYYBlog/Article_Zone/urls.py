from django.urls import path
from . import views

app_name = __package__

urlpatterns = [
    path("", views.index, name = "index"),
    path("<str:页面地址>/" , views.获取页面 , name = "获取页面"),
    path("<str:页面地址>/<str:文章地址>/" , views.获取文章 , name = "获取文章"),
]
