import { OutRenderer_Props} from "../../out_renderer"
import { GroupNode} from "../../core/elements"
import { Node } from "slate"
export { list_out_renderer }
import Card from '@mui/material/Card'

var list_out_renderer = { 
    renderer_func: (props: OutRenderer_Props) => {
        let list_idx = props.env_enter.list_idx
        let my_idx = list_idx[list_idx.length-1]

        return <Card sx={{marginLeft: "1%"}}>{my_idx}:{props.children}</Card>
    } , 
    pre_effect_exit: (_element: Node, env: any) => {
        let element = _element as GroupNode

        env.list_idx = env[element.idx] 

        return env
    } , 
    pre_effect_enter: (_element: Node, env: any) => {
        let element = _element as GroupNode


        if(env["list_idx"] == undefined){
            env["list_idx"] = [1]
        }
        else{
            let list_idx = [... env["list_idx"]]
            if(element.relation == "separating")
            list_idx.push(1) // 新建一个
            else{
                list_idx[list_idx.length-1] = list_idx[list_idx.length-1] + 1
            }
            env["list_idx"] = list_idx
        }
                
        if(env[element.idx] == undefined){
            env[element.idx] = env["list_idx"]
        }

        return env
    }
}