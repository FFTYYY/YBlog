from pathlib import Path
import os , sys
my_path = Path( os.path.dirname(os.path.abspath(__file__)) )

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "yblog.settings")
django.setup()

import pdb
import json
import tqdm 
from articlezone.models.models import Node

if __name__ == "__main__":

    with open("../yblog_frontend/convert/output_converted.json", "r" , encoding = "utf-8") as fil:
        res = json.load(fil)

    for x in tqdm.tqdm(res):
        node = Node.objects.get(id = int(x))
        if not node:
            print ("???")
            pdb.set_trace()
        node.content = json.dumps(res[x])
        node.save()