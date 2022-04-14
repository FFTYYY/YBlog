from pathlib import Path
import os , sys
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

def make_sectioner(title):
    return {
      "idx": random.randint(0,23333333),
      "type": "support",
      "name": "\u5c0f\u8282\u7ebf",
      "parameters": {
        "label": {
          "type": "string",
          "val": "\u5c0f\u8282"
        },
        "title": {
          "type": "string",
          "val": title
        },
        "alone": {
          "type": "boolean",
          "val": False
        }
      },
      "children": [
        {
          "text": ""
        }
      ],
      "hiddens": [
        
      ],
      "flags": {
        
      },
      "proxy_info": {
        "proxy_name": ""
      }
    }

def make_node(children , title , time):
    return {
            "idx": random.randint(0,23333333),
            "type": "group",
            "name": "\u5c5e\u8a00",
            "parameters": {
                "prefix": {
                "val": "\uff08\uff09",
                "type": "string"
                },
                "suffix": {
                "val": "",
                "type": "string"
                },
                "title": {
                "val": "",
                "type": "string"
                },
                "close": {
                "val": "",
                "type": "string"
                },
                "ordering": {
                "val": "arab-bracket",
                "type": "string"
                },
                "label": {
                "val": "\u4e00\u9879",
                "type": "string"
                },
                "clustering": {
                "val": False,
                "type": "boolean"
                }
            },
            "relation": "separating",
            "children": children,
            "hiddens": [
                
            ],
            "flags": {
                
            },
            "proxy_info": {
                "proxy_name": "\u8bfb\u8bfb\u8bba\u6587-\u4e00\u9879",
                "proxy_params": {
                "paper-title": {
                    "val": title,
                    "type": "string"
                },
                "time": {
                    "val": time,
                    "type": "string"
                }
                }
            }
        }


def stringify(node):
    if node.get("text") is not None:
        return node["text"]
    return "".join([stringify(x) for x in node["children"]])

state = {
    "reading_item": False # 是否正在读项目
}

title_buffer = ""
time_buffer = ""
buffer = []
def search(root):

    now_chilren = []
    global buffer
    global state

    for node in root["children"]:
        reading_ending_flag = False # 是否读完了一个项目
        direct_copy = False

        par_text = stringify(node) # 段落节点
        par_text = par_text.replace(" " , " ")
        # pdb.set_trace()

        if (node.get("type") is not None) or (par_text.strip() == ""): # 直接copy节点
            direct_copy = True

            if state["reading_item"]: # 如果正在读
                reading_ending_flag = True 
                state["reading_item"] = False

        if re.match("\\[\\d+\\]" , par_text) is not None: # 若匹配到项目开头
            assert not state["reading_item"] # 一定没有在读项目
            state["reading_item"] = True

            reg = "\[\d+\] *([\S  ]+)：[（\(](\d\d\d\d)[）\)]"
            mat = re.match(reg , par_text)
            if mat is not None:
                title , time = mat.groups()
                title_buffer = title.strip()
                time_buffer = time.strip()

                pos = mat.span()[1]
                par_text = par_text[pos: ]
                node["children"][0]["text"] = par_text

        sec_mat = re.match("【[\s\S]+】([\s\S]+)" , par_text)
        if sec_mat is not None:
            title = sec_mat.groups()[0]
            node = make_sectioner(title)
            direct_copy = True

            if state["reading_item"]: # 如果正在读
                reading_ending_flag = True 
                state["reading_item"] = False


        if state["reading_item"]:
            buffer.append(copy.deepcopy(node))

            assert not reading_ending_flag
            assert not direct_copy
        
        if reading_ending_flag:
            now_chilren.append(make_node(copy.deepcopy(buffer),title_buffer , time_buffer))
            buffer = []
            title_buffer = ""
            time_buffer = ""

        if direct_copy:
            now_chilren.append(node)

    return now_chilren
    

def run():
    tar_id = 2379

    tar_node = Node.objects.get(id = tar_id)
    root = json.loads(tar_node.content)

    newroot = copy.deepcopy(root)

    newroot["children"] = search(root)

    # print (newroot["children"])

    tar_node.content = json.dumps(newroot)
    tar_node.save()

run()