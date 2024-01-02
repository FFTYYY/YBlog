from django.contrib import admin
from .models import Node , Comment , Resource , Concept, ConceptInstance
from django import forms
from django_json_widget.widgets import JSONEditorWidget
from functools import partial

class NodeForm(forms.ModelForm):
    template = forms.ChoiceField(choices = (
        ("standard" , "standard") , 
        ("special/casket_of_star", "special/casket_of_star"), 
    ))
    class Meta:
        model = Node
        fields = "__all__"

class NodeAdmin(admin.ModelAdmin):
    form = NodeForm
    add_form_template 	 = "customize_admin/node_add.html"

    list_display = ["get_title" , "id" , "can_public_view" ]
    raw_id_fields = ["father", "concept_def"]

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

            make_edit_tree = lambda id,text: "<a href='/edit/structure/{0}' style='margin-left:3.675%;'>{1}</a>".format(id,text)
            make_edit_shal = lambda id,text: "<a href='/edit/shallow_structure/{0}' style='margin-left:2%;'>{1}</a>".format(id,text)

            desc_edit_struct   =   make_edit_tree(node.id , "编辑子节点结构") + make_edit_tree(0 , "编辑全局结构")
            if node.father is not None:
                desc_edit_struct = desc_edit_struct + make_edit_tree(node.father.id , "编辑父节点结构")
            desc_edit_struct = desc_edit_struct + "<br />"

            desc_edit_struct   = desc_edit_struct + make_edit_shal(node.id , "（浅）编辑子节点结构") + make_edit_shal(0 , "（浅）编辑全局结构")
            if node.father is not None:
                desc_edit_struct = desc_edit_struct + make_edit_shal(node.father.id , "（浅）编辑父节点结构")

                               
        return [
            ["模板" , {
                "fields": ["template"] , 
            }] , 
            ["可见性" , {
                "fields": ["secret" , "indiscriminate_provider" , "indiscriminate_consumer"] , 
                "description": visualbility_desc , 
            }] , 
            ["内容" , {
                "fields": ["concept_def" , "tldr" , "content" , "cache"] , 
                "description": desc_edit_content , 
            }] , 
            ["结构" , {
                "fields": ["father" , "index_in_father"] , 
                "description": desc_edit_struct , 
            }] , 
            ["信息" , {
                "fields": ["tldr_updatetime", "create_time" , "update_time"] , 
            }]
        ]


class CommentAdmin(admin.ModelAdmin):
    pass
class ResourceAdmin(admin.ModelAdmin):
    pass
class ConceptAdmin(admin.ModelAdmin):
    pass
class ConceptInstanceAdmin(admin.ModelAdmin):
    list_display = ["concept_id" , "node" ]
    search_fields = ["concept_id", "node__id"]

admin.site.register(ConceptInstance     , ConceptInstanceAdmin)
admin.site.register(Node                , NodeAdmin     )
admin.site.register(Comment             , CommentAdmin  ) 
admin.site.register(Resource            , ResourceAdmin )
admin.site.register(Concept             , ConceptAdmin  )
