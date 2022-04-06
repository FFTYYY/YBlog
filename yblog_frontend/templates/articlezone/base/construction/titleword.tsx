import React from "react"
import { Interaction } from "../interaction"
import { get_param_val } from "../../../../lib" 

export { TitleWord }

/** 这个组件异步加载一个节点的标题，等加载好了就现实出来。 */
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
        let root = await Interaction.get.content(this.props.node_id)
        this.setState({title: get_param_val(root , "title") as string}) 
    }

    render(){
        return <>{this.state.title}</>
    }
}
