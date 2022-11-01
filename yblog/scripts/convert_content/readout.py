from pathlib import Path
import os , sys
my_path = Path( os.path.dirname(os.path.abspath(__file__)) )

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "yblog.settings")
django.setup()

import pdb
import json

from articlezone.models.models import Node

if __name__ == "__main__":

    nodes = Node.objects.all()

    res = {}
    for x in nodes:
        res[x.id] = json.loads(x.content)
    
    output = json.dumps(res)
    # with open("../../../tempoary/convert/output.json", "w") as fil:
    with open("../yblog_frontend/convert/output.json", "w") as fil:
        fil.write(output) 
