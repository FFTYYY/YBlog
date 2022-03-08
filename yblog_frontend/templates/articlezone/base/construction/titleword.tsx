import React from "react"
import { Interaction } from "../interaction"

export { TitleWord }

/** 这个组件异步加载一个节点的标题，等加载好了就现实出来。 */
class TitleWord extends React.Component<{node_id: number} , {title: string | undefined}>{
    constructor(props){
        super(props)

        this.state = {
            title: undefined
        }
    }

    async componentDidMount() {
        let root = await Interaction.get.content(this.props.node_id)
        this.setState({title: root.parameters.title}) 
    }

    render(){
        return <>{this.state.title}</>
    }
}