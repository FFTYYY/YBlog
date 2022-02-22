from django.contrib import admin
from .models import Node , Component
from django import forms
class NodeForm(forms.ModelForm):
    def __init(self , user , *args, **kwargs):
        super ().__init__(*args, **kwargs)

# TODO 子节点不能选父节点已经选过的组件。
class NodeAdmin(admin.ModelAdmin):
    filter_horizontal = ["components"]

    def get_fieldsets(self, request, object):
        return [
            ["内容" , {
                "fields": ["content" , "components"] , 
                "description": "<a href='/edit/content/{obj_id}'>编辑内容</a>".format(obj_id = object.id)
            }] , 
            ["结构" , {
                "fields": ["father" , "index_in_father"] , 
                "description": 
                        "<a href='/edit/structure/{obj_id}'>编辑子节点结构</a>".format(obj_id = object.id)
                    +   "<a href='/edit/structure/' style='margin-left:2%;'>编辑全局结构</a>"
            }] , 
            ["元信息" , {
                "fields": ["create_time" , "update_time"] , 
            }]
        ]

class ComponentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Node      , NodeAdmin      )
admin.site.register(Component , ComponentAdmin)
