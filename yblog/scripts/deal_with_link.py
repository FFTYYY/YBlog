from pathlib import Path
import os , sys
my_path = Path( os.path.dirname(os.path.abspath(__file__)) )

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "yblog.settings")
django.setup()

import pdb
import json
from tqdm import tqdm
from articlezone.models.models import Node, ConceptInstance
import random

def _generate_english_name():
    a = list("aeiou")
    b = list("qwrtypsdfghjklzxcvbnm")
    
    num_block = random.randint(3,5)
    if random.random() < 0.01:
        num_block = 5

    ret = ""
    for bl in range(num_block):
        res = ""
        last = random.randint(0,1)
        cont = 1
        len = random.randint(5,9)
        for i in range(len):
            if last == 0:
                res = res + random.sample(a,1)[0]
                if random.random() > 0.3 ** cont:
                    last = 1 - last
                    cont = 1
                else:
                    cont = cont + 1
            else:
                res = res + random.sample(b,1)[0]
                if random.random() < 0.9 ** cont:
                    last = 1 - last
                    cont = 1
                else:
                    cont = cont + 1
        if ret == "":
            ret = res
        else:
            ret = ret + "-" + res
    return ret

def generate_random_int():
    return random.randint(233333, 233333333333)

repeatcheck = set()
id_to_name = {}
linkto = {}

def manage_tree(tree, nodeid):
    if nodeid == 1161:
        pdb.set_trace()

    if id_to_name.get(nodeid) is None:
        id_to_name[int(nodeid)] = {}

    if tree.get("type") is not None:
        assert tree.get("idx") is not None
        new_idx = generate_random_int()
        id_to_name[int(nodeid)][int(tree["idx"])] = new_idx
        tree["idx"] = new_idx

        assert new_idx not in repeatcheck
        repeatcheck.add(new_idx)

        if tree.get("concept") == "root" and id_to_name[nodeid].get("root") is None:
            id_to_name[nodeid]["root"] = new_idx


    if tree.get("children") is not None:
        for ch in range(len(tree["children"])):
            manage_tree(tree["children"][ch], nodeid)

    if tree.get("abstract") is not None:
        for ch in range(len(tree["abstract"])):
            manage_tree(tree["abstract"][ch], nodeid)

def manage_links(tree, node_id):

    if tree.get("concept") == "链接":
        assert tree.get("parameters") is not None
        parameters = tree.get("parameters")
        assert parameters.get("type") is not None
        assert parameters.get("target") is not None
        assert parameters.get("autotext") is not None

        new_target = {
            "val": 0, 
            "type": "number" , 
        }
        new_url = {
            "val": "", 
            "type": "string" , 
        }
        type_val = parameters["type"]["val"]
        target_val = parameters["target"]["val"]
        if (type_val == "outer-index" or type_val == "index") and ("http" not in target_val):
            if ":" in target_val: # 外部引用
                root_node, old_idx = target_val.split(":")
            else:
                root_node, old_idx = str(node_id), target_val

            if id_to_name.get(int(root_node)) is None:
                old_idx = None
            else:
                old_idx = id_to_name[int(root_node)].get(int(old_idx))

            if old_idx is not None:
                new_target["val"] = int( old_idx )
                linkto[tree["idx"]] = int( new_target["val"] )
            else:
                new_target["val"] = 0
                linkto[tree["idx"]] = 0
        else:
            if "3.84.141.10" in target_val or "yyy.zone" in target_val:
                new_nodeid = target_val.strip().strip("/").split("/")[-1]

                if id_to_name.get(int(new_nodeid)) is not None:
                    if id_to_name[int(new_nodeid)].get("root"):
                        new_target["val"] = int( id_to_name[int(new_nodeid)].get("root") )
                        linkto[tree["idx"]] = int( new_target["val"] )
            else: 
                new_url["val"] = target_val
        parameters.pop("target")
        parameters.pop("type")
        parameters["target_idx"]  = new_target
        parameters["target_url"] = new_url

    if tree.get("children") is not None:
        for ch in range(len(tree["children"])):
            manage_links(tree["children"][ch], node_id)

    if tree.get("abstract") is not None:
        for ch in range(len(tree["abstract"])):
            manage_links(tree["abstract"][ch], node_id)


def manage_cache(tree, node_id):
    new_tree = {}
    for x in tree:
        new_id = id_to_name[int(node_id)].get(int(x))
        if new_id is None:
            continue
        new_tree[new_id] = tree[x]
        if linkto.get(new_id):
            new_tree[new_id]["linkto"] = linkto.get(new_id)
    return new_tree

def create_concept(tree, nodeid):

    if tree.get("type") is not None:
        assert tree.get("idx") is not None
        inst = ConceptInstance(concept_id = tree["idx"], node_id = nodeid)
        inst.save()

    if tree.get("children") is not None:
        for ch in range(len(tree["children"])):
            create_concept(tree["children"][ch], nodeid)

    if tree.get("abstract") is not None:
        for ch in range(len(tree["abstract"])):
            create_concept(tree["abstract"][ch], nodeid)

def create_concept_linkto(tree, nodeid):

    if tree.get("type") is not None:
        assert tree.get("idx") is not None
        if linkto.get(tree["idx"]) is not None:
            inst = ConceptInstance.objects.get(concept_id = tree["idx"])
            if int(linkto[tree["idx"]]) == 0:
                inst.linkto = None
            else:
                targ = ConceptInstance.objects.get(concept_id = int(linkto[tree["idx"]]))
                inst.linkto = targ
            inst.save()

    if tree.get("children") is not None:
        for ch in range(len(tree["children"])):
            create_concept_linkto(tree["children"][ch], nodeid)

    if tree.get("abstract") is not None:
        for ch in range(len(tree["abstract"])):
            create_concept_linkto(tree["abstract"][ch], nodeid)

if __name__ == "__main__":

    os.system("python manage.py migrate")

    pbar = tqdm( Node.objects.all() , desc = "processing contents")
    for now_node in pbar:
        tree = json.loads( now_node.content )
        manage_tree(tree, now_node.id)
        now_node.content = json.dumps(tree)
        now_node.save()

    pbar = tqdm( Node.objects.all() , desc = "processing links")
    for now_node in pbar:
        tree = json.loads( now_node.content )
        manage_links(tree, now_node.id)
        now_node.content = json.dumps(tree)
        now_node.save()
        
    pbar = tqdm( Node.objects.all() , desc = "processing caches")
    for now_node in pbar:
        cache = now_node.cache
        if len(cache.strip()) == 0:
            now_node.cache = json.dumps({})
            continue
        cache = json.loads(cache)
        new_cache = manage_cache(cache, now_node.id)
        now_node.cache = json.dumps(new_cache)
        now_node.save()

    ConceptInstance.objects.all().delete()
    pbar = tqdm( Node.objects.all() , desc = "creating concepts")    
    for now_node in pbar:
        tree = json.loads( now_node.content )
        create_concept(tree, now_node.id)

    pbar = tqdm( Node.objects.all() , desc = "creating concept-linktos")    
    for now_node in pbar:
        tree = json.loads( now_node.content )
        create_concept_linkto(tree, now_node.id)

    print ("done!")
