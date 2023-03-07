import os
import openai
from pathlib import Path
import time

file_path =  Path(__file__).parent / "openai_keys.txt" 

flag_initialized = True
if not os.path.exists(file_path):
    flag_initialized = False
    print( "open ai keys doesn't exists!" )

if flag_initialized:

    with open(file_path, "r") as fil:
        org , keys = fil.read().split(" ")

    openai.organization = org
    openai.api_key = keys


def post_chatgpt(messages):
    '''这个函数的目的是反复发送同一条信息直到成功发送。因为chatgpt小概率会随机报错。'''
    if not flag_initialized:
        return None
    fail_time = 0
    ret_msg = None
    while True:
        try:
            ret_msg = openai.ChatCompletion.create(
                model = "gpt-3.5-turbo",
                messages = messages , 
            )
        except Exception:
            fail_time = fail_time + 1
            if fail_time < 10:
                time.sleep(200) # 休息一下
                continue 
            else:
                break
        break
    return ret_msg


def ask_chatgpt(prompt):
    ret_msg = post_chatgpt([{"role": "user", "content": prompt}])
    if ret_msg is None:
        return None
    ret = ret_msg["choices"][0]["message"]["content"]
    return ret



