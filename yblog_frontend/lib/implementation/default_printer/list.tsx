import { Node } from "slate"
import type  { PrinterRenderFunc_Props } from "../../printer"
import { GroupNode} from "../../core/elements"
import Card from '@mui/material/Card'
import type { PrinterRenderer } from "../../printer"
import { OrderEffector } from "./effecter"

export { get_DefaultListPrinter }


function get_DefaultListPrinter(){
    let order_effector = new OrderEffector<GroupNode>(
        "order" , 
        "order" , 
        (element, env) => element.relation == "separating" , 
    )
    return {
        render_func: (props: PrinterRenderFunc_Props) => {
            let order = order_effector.get_context(props.context)

            return <Card sx={{marginLeft: "1%"}}>{order}:{props.children}</Card>
        } , 
        enter_effect: (element: GroupNode, env: any): [any,any] => {
            let ret = [env , {}]
            ret = order_effector.enter_fuse( element , ret[0] , ret[1] )

            return ret as [any , any]
        } , 
        exit_effect: (element: GroupNode, env: any , context: any):[any,any] => {
            let ret = [env , context]
            ret = order_effector.exit_fuse( element , ret[0] , ret[1] )

            return ret as [any , any]
        } ,
    } 
}
