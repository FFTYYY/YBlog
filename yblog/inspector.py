import django
import os 
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "yblog.settings")
django.setup()

from articlezone.models import Node 
from datetime import datetime
from inspector_actions import ACTIONS
from inspector_actions.sharedvalue_manage import get_trigger_time
from django.db.models import Max
from multiprocessing import Value
import time 


def action(node: Node) -> bool:

    flag = False
    for action in ACTIONS:
        flag = flag or ( action(node) )
    

    return flag

def main():

    import atexit 

    objects = Node.objects.all()
    ptr = 0
    while True:
        now_time = time.time()
        trigger_time = get_trigger_time()

        
        # 只有在距离上次触发时间超过2小时时才会触发
        if (trigger_time is None) or ( now_time < trigger_time + 60 * 60 * 2 ):
            time.sleep(5)
            continue
        
        ptr = ptr - 1
        if ptr < 0:
            objects = Node.objects.all()
            ptr = len(objects) - 1
        now_node = objects[ptr]

        action_sucess = action(now_node)

        if action_sucess:
            time.sleep(5)


    
    
