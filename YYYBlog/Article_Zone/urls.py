from django.urls import path
from . import views

app_name = __package__

urlpatterns = [
    path("", views.默认, name = "默认"),
    path("<str:节点地址>/" , views.获取节点 , name = "获取节点"),
]
