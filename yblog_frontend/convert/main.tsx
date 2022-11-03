/**
 * 这个模块是一个临时模块，用来将旧的格式转换成新的格式。
 */

import old_data from "./output.json"
import {
    convert_old_tree , 
} from "./convert_old_tree"
import {
    convert_children , 
} from "./convert_children"
import {
    convert_concept , 
} from "./convert_concept"
import {
    check_idx , 
} from "./check_idx"

import {
    validate
} from "../templates/articlezone/lib"

export {
    gene_output
}

function convert_one_tree(_node){
    let tree = convert_old_tree(_node)
    convert_concept(tree)
    convert_children(tree)

    let [good, msg] = validate(tree)
    if(!good){
        console.log("convert_one_tree: not good!")
        console.log("node is", tree)
        console.log("msg is", msg)
        throw new Error(msg)
    }
    check_idx(_node , tree)
    return tree
}

function gene_output(){
    let new_database = {}
    for(let article_idx in old_data){
        let article = old_data[article_idx]
        let new_article = convert_one_tree(article)
        new_database[article_idx] = new_article
    }

    // fs.writeFileSync("./test_output.json", JSON.stringify(new_database))
    console.log("??")

    return new_database
}

import React from "react"
import ReactDOM from "react-dom"

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            output: ""
        }
    }
    componentDidMount(): void {
        let output = gene_output()
        output = JSON.stringify(output)
        console.log(output)
    }
    render(): React.ReactNode {
        return <pre>hello!</pre>
    }
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
