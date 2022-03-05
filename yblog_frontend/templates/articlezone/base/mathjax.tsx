import React, { useEffect } from "react"
import $ from "jquery"
import { EditorCore , DoSomething } from "../../../lib"
// import "mathjax/es5/tex-svg"

export { MathJaxContext , MathJaxInline , MathJaxBlock , }

let MATHJAX_INLINE_START = "_MATHJAX_INLINE_START"
let MATHJAX_INLINE_END = "_MATHJAX_INLINE_END"
let MATHJAX_BLOCK_START = "_MATHJAX_BLOCK_START"
let MATHJAX_BLOCK_END = "_MATHJAX_BLOCK_END"

function flush_mathjax(){
    let MathJax = (window as any).MathJax
    if(MathJax != undefined && MathJax.typesetPromise != undefined){
        MathJax.typesetPromise()
    }
}

function MathJaxContext(props: {core: EditorCore , children: any}){
    React.useEffect(() => {
        let script = $(`
            ${""/** mathjax配置。必须先于mathjax的引入。 */}
            <script>
                MathJax = {
                    tex: {
                        inlineMath: [["${MATHJAX_INLINE_START}", "${MATHJAX_INLINE_END}"]] , 
                        displayMath: [["${MATHJAX_BLOCK_START}", "${MATHJAX_BLOCK_END}"]] , 
                    },
                    svg: {
                        fontCache: "global"
                    } , 
                    ignoreHtmlClass: "mathjax_ignore" , 
                    processHtmlClass: "mathjax_process" , 
                    preRemoveClass: "mathjax_preview" , 
                }
            </script>

            ${""/** mathjax的引入。 */}
            <script src="./node_modules/mathjax/es5/tex-svg.js" async></script>
        `)

        $("head").append(script)
        
        /** 刷新页面 */
        // setInterval(flush_mathjax , 500)

        return ()=>{
            script.remove()
            props.core.remove_notificatioon("mathjax")
        }
    }, [])

    return <React.Fragment>
        {props.children}
    </React.Fragment>
}

function MathJaxInline(props: {children: any}){

    React.useEffect(()=>{
        flush_mathjax()
    })

    return <span className = "mathjax_process">{MATHJAX_INLINE_START}{props.children}{MATHJAX_INLINE_END}</ span>
}

function MathJaxBlock(props: {children: any}){
    
    React.useEffect(()=>{
        flush_mathjax()
    })
    return <div className = "mathjax_process">{MATHJAX_BLOCK_START}{props.children}{MATHJAX_BLOCK_END}</div>
}
