from django.contrib import admin
from matplotlib import widgets
from .models import Node , Concept , Comment , Resource
from django import forms
from django_json_widget.widgets import JSONEditorWidget
from functools import partial
from .constants import CONCEPT_METAS
from YTools.universe.beautiful_str import beautiful_str
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

class MyJSONEditorWidget(JSONEditorWidget):
    def __init__(self , *args , **kwargs):
        kwargs.update({
            "height": "auto" , 
        })
        super().__init__(*args , **kwargs)

class ConceptAdminForm(forms.ModelForm):
  class Meta:
    model = Concept
    fields = "__all__"
    widgets = {
        "fixed_params": MyJSONEditorWidget , 
        "default_params": MyJSONEditorWidget , 
    }

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

class ConceptAdmin(admin.ModelAdmin):
    form = ConceptAdminForm
    def get_fieldsets(self, request, object):

        meta_name = ""
        default_info = ""
        while True:
            if object is None or object.id is None:
                break
            meta_name = object.meta

            meta_info = CONCEPT_METAS.get(meta_name)
            if meta_info is None:
                break
            params , labels = meta_info

            default_info = beautiful_str(["参数名" , "默认值" , "介绍"] , [
                [pname , params.get(pname) , labels.get(pname)]
                for pname in params
            ])

            break


        return [
            ["Base" , {
                "fields": ["name" , "meta"] , 
            }] , 
            ["Parameters" , {
                "fields": ["fixed_params" , "default_params"] , 
                "description": "<pre style=\"font-family:monospace\">" + """
                    概念 {meta_name} 的参数列表：
                    {default_info}
                """.format(meta_name = meta_name , default_info = default_info).strip() + "</pre>"
            }]
        ]


class CommentAdmin(admin.ModelAdmin):
    pass
class ResourceAdmin(admin.ModelAdmin):
    pass

admin.site.register(Node        , NodeAdmin      )
admin.site.register(Concept     , ConceptAdmin)
admin.site.register(Comment     , CommentAdmin)
admin.site.register(Resource    , ResourceAdmin)
