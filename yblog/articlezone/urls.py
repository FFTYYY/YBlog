from django.urls import path
from .views.views import edit_node_view , edit_nodetree_view , read_node_view , edit_nodetree_shallow_view , read_node_pure_view
from .views.posts import post_nodetree , post_node_content , post_node_comments , post_node_comments
from .views.posts import post_upload_file , post_manage_resource , post_delete_resource , post_node_cache
from .views.gets import get_nodetree , get_node_concepts , get_node_comments , get_node_create_time , get_node_content
from .views.gets import  get_node_resources , get_node_resource_info , get_node_son_ids , get_node_father_id
from .views.gets import get_nodetree_shallow , get_node_cache
from functools import partial

urlpatterns = [
    path("" , partial(read_node_view,node_id = 1)) , 
    path("edit/content/<int:node_id>"           , edit_node_view) , 
    path("edit/structure/<int:node_id>"         , edit_nodetree_view) , 
    path("edit/structure/"                      , partial(edit_nodetree_view , node_id = 0)) , 
    path("edit/shallow_structure/<int:node_id>" , edit_nodetree_shallow_view) , 
    path("edit/shallow_structure/"              , partial(edit_nodetree_shallow_view , node_id = 0)) , 
    path("view/content/<int:node_id>"           , read_node_view) , 
    path("view/content/pure/<int:node_id>"      , read_node_pure_view) , 

    path("get/node/content/<int:node_id>"       , get_node_content) , 
    path("get/node/cache/<int:node_id>"         , get_node_cache) , 
    path("get/node/concepts/<int:node_id>"      , get_node_concepts) , 
    path("get/node/create_time/<int:node_id>"   , get_node_create_time) , 
    path("get/node/comments/<int:node_id>"      , get_node_comments) , 
    path("get/nodetree/<int:node_id>"           , get_nodetree) , 
    path("get/nodetree_shallow/<int:node_id>"   , get_nodetree_shallow) , 
    path("get/node/resources/<int:node_id>"     , get_node_resources) , 
    path("get/node/resource_info/<int:node_id>" , get_node_resource_info) ,
    path("get/node/son_ids/<int:node_id>"       , get_node_son_ids) , 
    path("get/node/father_id/<int:node_id>"     , get_node_father_id) , 

    path("post/node/content/<int:node_id>"      , post_node_content) , 
    path("post/node/cache/<int:node_id>"        , post_node_cache) , 
    path("post/node/comments/<int:node_id>"     , post_node_comments) , 
    path("post/nodetree/<int:node_id>"          , post_nodetree) , 

    path("post/file/<int:node_id>"              , post_upload_file) , 
    path("post/manage_recourse/<int:resource_id>" , post_manage_resource) , 
    path("post/delete_recourse"                 , post_delete_resource) , 
]