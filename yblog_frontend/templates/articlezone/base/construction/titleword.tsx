import React from "react"
import { Interaction } from "../interaction"

export { TitleWord }

var id2title = {} // 缓存。

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

    async componentDidMount() {
        if(id2title[this.props.node_id] == undefined){
            let root = await Interaction.get.content(this.props.node_id)
            let title = root.parameters.title.val
            id2title[this.props.node_id] = title
        }
        this.setState({title: id2title[this.props.node_id] as string}) 
    }

    render(){
        return <>{this.state.title}</>
    }
}
