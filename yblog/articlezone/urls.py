from django.urls import path
from .views.views import edit_node_view , edit_nodetree_view
from .views.responces import get_node_content , post_node_content , get_nodetree_info , get_node_components , post_nodetree_info
from functools import partial

urlpatterns = [
    path("" , partial(edit_node_view,node_id = 0)) , 
    path("edit/content/<int:node_id>" , edit_node_view) , 
    path("edit/structure/<int:node_id>" , edit_nodetree_view) , 

    path("get_node/<int:node_id>" , get_node_content) , 
    path("get_node_components/<int:node_id>" , get_node_components) , 
    path("post_node/<int:node_id>" , post_node_content) , 

    path("get_nodetree_info/<int:node_id>" , get_nodetree_info) , 
    path("post_nodetree_info/<int:node_id>" , post_nodetree_info) , 
]