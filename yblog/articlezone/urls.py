from django.urls import path
from .views.views import edit_node_view , edit_nodetree_view , view_node_view
from .views.responces import post_nodetree , get_node_create_time , get_node_content , post_node_content
from .views.responces import get_nodetree , get_node_concepts , get_node_comments , post_node_comments
from functools import partial

urlpatterns = [
    path("" , partial(edit_node_view,node_id = 0)) , 
    path("edit/content/<int:node_id>" , edit_node_view) , 
    path("edit/structure/<int:node_id>" , edit_nodetree_view) , 
    path("edit/structure/" , partial(edit_nodetree_view , node_id = 0)) , 
    path("view/content/<int:node_id>" , view_node_view) , 

    path("get/node/content/<int:node_id>" , get_node_content) , 
    path("get/node/concepts/<int:node_id>" , get_node_concepts) , 
    path("get/node/create_time/<int:node_id>" , get_node_create_time) , 
    path("get/node/comments/<int:node_id>" , get_node_comments) , 
    path("get/nodetree/<int:node_id>" , get_nodetree) , 

    path("post/node/content/<int:node_id>" , post_node_content) , 
    path("post/node/comments/<int:node_id>" , post_node_comments) , 
    path("post/nodetree/<int:node_id>" , post_nodetree) , 
]