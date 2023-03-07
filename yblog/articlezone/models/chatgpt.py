
from utils.openai import ask_chatgpt
import json

def analyze_tree(node_tree):
    if node_tree.get("text"):
        return str( node_tree["text"] )

    children = node_tree.get("children")
    if not children:
        return ""
    
    my_s = ""
    for x in children:
        my_s = my_s + analyze_tree(x)
    return my_s

def generate_tldr(node):
    prompt_suff = "现在我是一个物理学家兼文学家兼古文字学大师兼数学家兼计算机科学家，而你是我的研究生。"
    "以下是我写作的一篇文章：【"
    prompt_post = "】文章结束。作为我的研究生，你已经仔细地拜读了我的文章，请你给这个文章写一小段总结。"
    "要求语气尽可能的非书面化、口语化，要多多使用语气词，"
    "同时还要像老学究一样夸耀自己的学识。字数在一百到两百字之间。"
    
    try:
        node_tree = json.loads(node.content)
        node_content = analyze_tree(node_tree)
    except Exception:
        node_content =  node.content
    node_content = node_content[:2700] # 防止token太多

    ret = ask_chatgpt(prompt_suff + node_content + prompt_post)
    if ret is None:
        ret = ""
    ret = ret.strip()

    return ret

