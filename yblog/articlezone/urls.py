from django.urls import path
from .views.views import node_view 
from .views.responces import get_node , post_node 
from functools import partial

urlpatterns = [
    path("" , partial(node_view,node_id = 0)) , 
    path("<int:node_id>" , node_view) , 
    path("get_node/<int:node_id>" , get_node) , 
    path("post_node/<int:node_id>" , post_node) , 
]