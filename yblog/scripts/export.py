from pathlib import Path
import os , sys
import hashlib 

my_path = Path( os.path.dirname(os.path.abspath(__file__)) )

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "yblog.settings")
django.setup()

import json
from articlezone.models.models import Node
import copy
import re
import random 
import pdb
import argparse

def process_content(node: dict):
    if "idx" in node:
        node["idx"] = str(node["idx"])

    if "children" in node:
        node["children"] = [s for s in node["children"] if s.get("concept") != "章节线"]
        node["children"] = [s for s in node["children"] if s.get("concept") != "展示杂陈节点"]

    if node.get("concept") == "链接":
        node["parameters"]["target_idx"]["val"]  = str(node["parameters"]["target_idx"]["val"])
        node["parameters"]["target_idx"]["type"] = "string"

    if "children" in node:
        node["children"] = [process_content(s) for s in node["children"]]
    return node

def process(node: Node):
    my_id           = node.id
    father_id       = node.father.id if node.father else -1
    idx_in_father   = node.index_in_father
    is_public       = not node.secret
    content         = json.loads(node.content) if node.content else {}
    content = process_content(content)
    cache           = json.loads(node.cache) if node.cache else {}
    sons = []

    for son in node.son.all():
        sons.append(process(son))

    return {
        "my_id"         : my_id,
        "father_id"     : father_id,
        "idx_in_father" : idx_in_father,
        "is_public"     : is_public,
        "content"       : content,
        "cache"         : cache,
        "sons"          : sons,
    }

def run():
    root_nodes = Node.objects.filter(father = None)

    tree = []
    for root_node in root_nodes:
        tree.append(process(root_node))   

    data = {
        "tree": tree,
    }

    with open("scripts/user_data.json", "w") as f:
        json.dump(data, f)

run()