from pathlib import Path
import os , sys
my_path = Path( os.path.dirname(os.path.abspath(__file__)) )

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "yblog.settings")
django.setup()

import pdb
import json
from tqdm import tqdm
from articlezone.models.models import Node
import time

if __name__ == "__main__":

    nodes = Node.objects.all()

    res = {}
    pbar = tqdm( nodes )
    for x in pbar:
        x.update_tldr()
        x.save()
        pbar.set_description_str("now %d" % x.id)
        time.sleep(10)
    print ("done!")
