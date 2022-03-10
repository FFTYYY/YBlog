import os
import sys
import random 
from pathlib import Path

def make_ignored_file(path , default_content):
	if os.path.exists(path):
		return
	with open(path , "w" , encoding = "utf-8") as fil:
		fil.write(default_content)

def generate_key():
	dic = "qwertyuioplkjhgfdsazxcvbnm,.?1234567890-="
	length = random.randint(20,50)
	return "".join( random.sample(dic * length , length) )

file_path =  Path(__file__) / "../../yblog/yblog/extra_infos.py" 
file_content = '''
SECRET_KEY = '{0}'
DEBUG = False
'''.format(generate_key())

make_ignored_file(os.path.abspath(file_path) , file_content)
