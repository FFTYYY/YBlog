from django.contrib import admin
from .models import Node , Concept , Comment , Resource
from django import forms

"""
class NodeAdminFrom(forms.ModelForm):
  class Meta:
    model = Node
    fields = "__all__"

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    node = self.instance

    似乎不用这样...
    if node.father is not None:
        used_concepts = node.father.get_all_concepts()
        unused_concepts = set( [x.id for x in Concept.objects.all()] ) - set( [x.id for x in used_concepts] )
        self.fields["concepts"].queryset = Concept.objects.filter(id__in = unused_concepts)
"""

class NodeAdmin(admin.ModelAdmin):
    filter_horizontal = ["concepts"]
    list_display = ["get_title" , "id" , "can_public_view" ]
    raw_id_fields = ["father"]

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
