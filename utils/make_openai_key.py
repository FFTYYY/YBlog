
from pathlib import Path

file_path =  Path(__file__) / "../../yblog/utils/openai_keys.txt"

org = input("organization:")
key = input("api_key:")

with open(file_path, "w") as fil:
    fil.write("%s %s" % (org,key))
print ("good!")
