from pathlib import Path
import os
import re
import json

my_path = Path(os.path.dirname(os.path.abspath(__file__)))
style_js_file_path = my_path / "../templates/articlezone/base/styles/styles.tsx" # 要处理的ts文件

assert style_js_file_path.exists()

with open(style_js_file_path , "r" , encoding = "utf-8") as fil:
    js = fil.read()
js = js.split("--- SPLIT ----")[1]

reg = re.compile("(\\S+_style)")

js = """
class GroupStyle{
    constructor(name , params , labels , flags){
        this.name = name
        this.parameter_prototype = params
        this.parameter_labels = labels
        this.flags = flags
    }
}
let StructStyle = AbstractStyle = InlineStyle = SupportStyle = GroupStyle

let type_string = "string"
let type_choice = "choice"

""" + js + """
    let to_export = [%s]
    let to_output = ()=>{
        let ret = {}
        for(let x of to_export){
            ret[x.name] = {
                parameters: x.parameter_prototype , 
                labels: x.parameter_labels
            }
        }
        console.log(JSON.stringify(ret))
    }
    to_output()
""" % ( ",".join(reg.findall(js)) )

js_file = my_path / "_js.js"
with open(js_file , "w" , encoding = "utf-8") as fil:
    fil.write(js)

json_file = my_path / "output.json"
with open(json_file , "w" , encoding = "utf-8") as fil:
    pass

# 生成json文件
os.system("node {0} >> {1}".format(js_file , json_file))

# 读取获得的信息。
with open(json_file , "r" , encoding = "utf-8") as fil:
    styles = json.load(fil)


target_file = my_path / "../../yblog/articlezone/constants/concepts.py"
assert target_file.exists()

py_content = """
import json

_json = '''%s'''

CONCEPT_METAS = json.loads(_json)
__all__ = [CONCEPT_METAS]

""" % (json.dumps(styles))

with open(target_file , "w" , encoding = "utf-8") as fil:
    fil.write(py_content)
    