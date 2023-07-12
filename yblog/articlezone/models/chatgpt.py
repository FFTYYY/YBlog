
from YTools.magic.chatgpt import ask_chatgpt
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
    prompt_suff = "你是我的研究生。" + \
    "以下是我写作的一篇文章：【"
    prompt_post = "】文章结束。作为我的研究生，你已经仔细地拜读了我的文章，请你给这个文章写一小段总结。" + \
    "要求语气尽可能的口语化，同时还要幽默。" + \
    "字数在一百到两百字之间。注意不要用一人称，要用第三人称。如果你觉得这篇文章太短，可以写『无』。"
    
    try:
        node_tree = json.loads(node.content)
        node_content = analyze_tree(node_tree)
    except Exception:
        node_content =  node.content
        
    if len(node_content) <= 100:
        return ""
    
    node_content = node_content[:6000] # 防止token太多

    ret = ask_chatgpt(prompt_suff + node_content + prompt_post)
    if ret is None:
        ret = ""
    ret = ret.strip()

    return ret

