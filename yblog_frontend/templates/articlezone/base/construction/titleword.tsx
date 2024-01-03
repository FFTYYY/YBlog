import React from "react"
import { Interaction } from "../interaction"

export { TitleWord , update_id2title }

var id2title = {} // 缓存。

function update_id2title(new_id2title: {[id: number]: string}){
    id2title = {...id2title, ...new_id2title}
}

/** 这个组件异步加载一个节点的标题，等加载好了就显示出来。 */
class TitleWord extends React.PureComponent<{
    node_id: number
} , {
    title: string | undefined
}>{
    constructor(props){
        super(props)

        this.state = {
            title: undefined
        }
    }

    async update_id2title(){
        let node_id = this.props.node_id
        if(id2title[node_id] == undefined){
            let root = await Interaction.get.content(node_id)
            let title = root.parameters.title.val
            id2title[node_id] = title
        }
        if(this.state[id2title[node_id]] != id2title[node_id]){
            this.setState({title: id2title[node_id] as string}) 
        }
    }

    async componentDidMount() {
        await this.update_id2title()
    }

    async componentDidUpdate(){
        await this.update_id2title()

    }

    render(){
        return <>{this.state.title}</>
    }
}
