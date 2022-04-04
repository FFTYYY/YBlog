/** 这个模块执行初始化跳转的行为。 */

import {
    YPrinter
} from "../../../lib"
import $ from "jquery"

export { linkto }

function linkto(printer: YPrinter , target_idx: number ){
    $(document).ready(()=>{
        let element = $(`#yconcept-${target_idx}`)
        if((!element) || element.length <= 0){
            return
        }
        element[0].scrollIntoView({
            behavior: "smooth" , 
            block: "center"
        })

        let next = element.next()
        if(!next){
            return 
        }

        next.css({border: "2px solid #ccbb44"})
    })
}