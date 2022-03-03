import os
import sys
import random 

os.chdir(sys.path[0])

def make_ignored_file(path , default_content):
	if os.path.exists(path):
		return
	with open(path , "w" , encoding = "utf-8") as fil:
		fil.write(default_content)

def generate_key():
	dic = "qwertyuioplkjhgfdsazxcvbnm,.?1234567890-="
	length = random.randint(20,50)
	return "".join( random.sample(dic , length) )

secret_key_path = "../yblog/yblog/secret_key.py"
secret_key_content = '''
	SECRET_KEY = '{0}'
'''.format(generate_key())

make_ignored_file(secret_key_path , secret_key_content)
