from django.urls import path
from .views.views import node_view 
from .views.responces import get_node_content , post_node_content , get_nodetree_info
from functools import partial

urlpatterns = [
    path("" , partial(node_view,node_id = 0)) , 
    path("<int:node_id>" , node_view) , 
    path("get_node/<int:node_id>" , get_node_content) , 
    path("post_node/<int:node_id>" , post_node_content) , 
    path("get_nodetree_info" , get_nodetree_info) , 
]