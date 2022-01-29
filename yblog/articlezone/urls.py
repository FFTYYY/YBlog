from django.urls import path
from .views.views import node_view 
from functools import partial

urlpatterns = [
    path("" , partial(node_view,node_id = 0)) , 
    path("<int:node_id>" , node_view) , 
]