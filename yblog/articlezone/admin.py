from django.contrib import admin
from .models import Node , Concept , Comment , Resource
from django import forms

# TODO 子节点不能选父节点已经选过的组件。
class NodeAdmin(admin.ModelAdmin):
    filter_horizontal = ["concepts"]

    def get_fieldsets(self, request, object):
        node = object 

        visualbility_desc = "新建中..."
        desc_edit_content = "<u>内容编辑不可用</u>"
        desc_edit_struct = "<u>结构编辑不可用</u>"
        if node is not None:
            visualbility_desc = "此节点可见"
            if not node.can_public_view():
                if node.secret:
                    visualbility_desc = "因为自身的<code>secret</code>属性，此节点不可见。"
                else:
                    visualbility_desc = "因为其父节点的<code>secret</code>属性，此节点不可见。"
            desc_edit_content  =   "<a href='/edit/content/{obj_id}'>编辑内容</a>".format(obj_id = node.id)
            desc_edit_struct   =   "<a href='/edit/structure/{obj_id}'>编辑子节点结构</a>".format(obj_id = node.id) \
                               +   "<a href='/edit/structure/' style='margin-left:2%;'>编辑全局结构</a>"
                               
        return [
            ["可见性" , {
                "fields": ["secret"] , 
                "description": visualbility_desc , 
            }] , 
            ["内容" , {
                "fields": ["content" , "concepts"] , 
                "description": desc_edit_content , 
            }] , 
            ["结构" , {
                "fields": ["father" , "index_in_father"] , 
                "description": desc_edit_struct , 
            }] , 
            ["元信息" , {
                "fields": ["create_time" , "update_time"] , 
            }]
        ]

class ConceptAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass
class ResourceAdmin(admin.ModelAdmin):
    pass

admin.site.register(Node        , NodeAdmin      )
admin.site.register(Concept     , ConceptAdmin)
admin.site.register(Comment     , CommentAdmin)
admin.site.register(Resource    , ResourceAdmin)
