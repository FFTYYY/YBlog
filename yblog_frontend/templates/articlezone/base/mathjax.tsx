import React, { useEffect } from "react"
import $ from "jquery"
import { EditorCore , DoSomething } from "../../../lib"
// import "mathjax/es5/tex-svg"

export { MathJaxContext , MathJaxInline , MathJaxBlock , flush_mathjax ,  }

let MATHJAX_INLINE_START = "$"
let MATHJAX_INLINE_END = "$"
let MATHJAX_BLOCK_START = "$$"
let MATHJAX_BLOCK_END = "$$"

var flush_math = new DoSomething(()=>{
    let MathJax = (window as any).MathJax
    if(MathJax != undefined && MathJax.typesetPromise != undefined){
        MathJax.typesetPromise()
        MathJax.texReset()
    }
} , 3000)

function flush_mathjax(){
    flush_math.go()
}

function MathJaxContext(props: {children: any}){
    React.useEffect(() => {
        let script = $(`
            ${""/** mathjax配置。必须先于mathjax的引入。 */}
            <script defer>
                MathJax = {
                    ${""/*loader: {load: ["[tex]/tagformat"]},*/}

                    tex: {
                        packages: {"[+]": ["tagformat"]} , 
                        inlineMath: [["${MATHJAX_INLINE_START}", "${MATHJAX_INLINE_END}"]] , 
                        displayMath: [["${MATHJAX_BLOCK_START}", "${MATHJAX_BLOCK_END}"]] , 
                        tags: "ams" , 
                        ${""/*tagformat: {
                            number: (n) => n.toString(),
                            tag:    (tag) => '(' + tag + ')',
                        } , */}
                    },
                    svg: {
                        fontCache: "global" , 
                        scale: 0.9 , 
                    } , 
                    ignoreHtmlClass: "mathjax_ignore" , 
                    processHtmlClass: "mathjax_process" , 
                    preRemoveClass: "mathjax_preview" , 
                }
            </script>
        `)
        // XXX 不知道是否应该用cdn版本
        import ("mathjax/es5/tex-svg.js")

        $("head").append(script)
        
        return ()=>{
            script.remove()
        }
    }, [])

    return <React.Fragment>
        {props.children}
    </React.Fragment>
}

function MathJaxInline(props: {children: any}){

    React.useEffect(()=>{
        flush_mathjax()
    } , [props.children] )

    return <span className = "mathjax_process">{MATHJAX_INLINE_START}{props.children}{MATHJAX_INLINE_END}</ span>
}

function MathJaxBlock(props: {children: any}){
    
    React.useEffect(()=>{
        flush_mathjax()
    } , [props.children] )
    return <div className = "mathjax_process">{MATHJAX_BLOCK_START}{props.children}{MATHJAX_BLOCK_END}</div>
}

