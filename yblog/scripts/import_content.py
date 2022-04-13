from pathlib import Path
import os , sys
my_path = Path( os.path.dirname(os.path.abspath(__file__)) )

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "yblog.settings")
django.setup()
import json
from articlezone.models.models import Node

def parse(father_id , nodeinfo):

    c = [
        {
            "children": [
                {"text": x}
            ]
        }
        for x in nodeinfo["content"].split("\n")
    ]

    node = Node(content = """
    {"idx": 8239974, "type": "group", "name": "root", "parameters": {"title": {"val": "%s", "type": "string"}}, 
    "relation": "separating", "children": [{"idx": 8946186, "type": "support", "name": "\u5c0f\u8282\u7ebf", 
    "parameters": {"label": {"type": "string", "val": "\u5c0f\u8282"}, 
    "title": {"type": "string", "val": ""}, "alone": {"type": "boolean", "val": false}}, 
    "children": [{"text": ""}], "hiddens": [], "flags": {}, "proxy_info": {"proxy_name": ""}}, 
    {"children": %s}, {"idx": 8008678, "type": "support", 
    "name": "\u7ae0\u8282\u7ebf", "parameters": {"label": {"type": "string", "val": "\u7ae0"}}, 
    "children": [{"text": ""}], "hiddens": [], "flags": {}, "proxy_info": {"proxy_name": ""}}], "hiddens": [], 
    "flags": {}, "proxy_info": {"proxy_name": ""}}
    """ % (nodeinfo["name"] , json.dumps(c)))

    node.save()
    node.father_id = father_id
    node.save()

    for s in nodeinfo["sons"]:
        parse(node.id , s)
    
    print (node.id)

def run():


    with open(my_path / "./export.json" , "r" , encoding = "utf-8") as fil:
        root = json.load(fil)

    # root = content["根"]

    parse(None , root)

    print ("done")
run()