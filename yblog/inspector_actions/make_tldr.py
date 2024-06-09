'''这个模块定义一个inspector操作，使得inspector更新当前节点的tldr。'''

from articlezone.models import Node
from YTools.magic.chatgpt import ask_chatgpt
import json
from .base import get_logger
import time 

logger = get_logger("make_tldr")

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


def action(node: Node):
    
    now_time = int( time.time() )
    # if node.tldr_updatetime > now_time - 60 * 60 * 24 * 7:
    #     logger.log(f"Genrate tldr for node {node.id} fail. Because tldr updated in 7 days.")
    #     return False

    prompt_suff = ""
    prompt_post = "\n以上是我写作的一篇文章。假设你是一个专业的文章评论员，请你给这个文章写一小段总结。" \
    "字数在一百到两百字之间。注意不要用一人称，要用第三人称。并且尽量关注文章本身，而非作者如何如何。如果你觉得这篇文章太短或者没有意义，可以写『无』。"
    
    try:
        node_tree = json.loads(node.content)
        node_content = analyze_tree(node_tree)
    except Exception:
        node_content =  node.content
        
    if len(node_content) <= 100:
        logger.log(f"Genrate tldr for node {node.id} fail. Because too short content.")
        return False
    
    node_content = node_content[:32000] # 防止token太多

    ret = ask_chatgpt(prompt_suff + node_content + prompt_post, model = "gpt-4o")
    if ret is None:
        logger.log(f"Genrate tldr for node {node.id} fail. Because ChatGPT no responce.")
        return False
    
    node.tldr = ret.strip()
    node.tldr_updatetime = now_time
    node.save()
    logger.log(f"Updated tldr for node {node.id}. Success.")

    return True
