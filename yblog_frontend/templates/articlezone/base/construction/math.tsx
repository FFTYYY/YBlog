import React, { useEffect } from "react"
import $ from "jquery"
import { DoSomething } from "@ftyyy/ytext"
// import "mathjax/es5/tex-svg"

export { MathJaxContext , MathJaxInline , MathJaxBlock , MathJaxFlusher , flush_math, flush_mathjax}

let MATHJAX_INLINE_START = "$"
let MATHJAX_INLINE_END = "$"
let MATHJAX_BLOCK_START = "$$"
let MATHJAX_BLOCK_END = "$$"

/** 这个函数清除mathjax的缓存内容（label和节点编号之类的） */
function clear_memory(MathJax: any){
    MathJax.startup.document.state(0)
    MathJax.texReset()
    MathJax.typeset()
    MathJax.typesetClear()
}

var flush_math = new DoSomething(()=>{
    let MathJax = (window as any).MathJax
    if(MathJax != undefined && MathJax.typesetPromise != undefined){
        clear_memory(MathJax)
        MathJax.typesetPromise()
        clear_memory(MathJax)    
    }
} , 1000)

function flush_mathjax(){
    flush_math.go()
    // let MathJax = (window as any).MathJax
    // if(MathJax != undefined && MathJax.typesetPromise != undefined){
    //     MathJax.typesetPromise()
    // }
}
function MathJaxContext(props: {children: any}){
    React.useEffect(() => {

        let script = $(`
            ${""/** mathjax配置。必须先于mathjax的引入。 */}
            <script defer>
                MathJax = {
                    config: ["MMLorHTML.js"],
                    jax: ["input/TeX","input/MathML","input/AsciiMath","output/HTML-CSS","output/NativeMML"],
                    extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js"],

                    loader: {load: ["[tex]/boldsymbol"]},
                    tex: {
                        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"] , 
                        packages: {"[+]": ["tagformat", "boldsymbol"]} , 
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
                        scale: 1.0 , 
                    } , 
                    ignoreHtmlClass: "mathjax_ignore" , 
                    processHtmlClass: "mathjax_process" , 
                    preRemoveClass: "mathjax_preview" , 
                }
            </script>

            <script type="text/javascript" id="MathJax-script" defer
              src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-chtml-full.js">
            </script>
            
            <style>
                mjx-merror mjx-utext{
                    width: 100% !important;
                    padding: 0 !important;
                }
                mjx-merror mjx-container{
                    margin: 0 !important;
                }
                mjx-merror{
                    background-color: rgba(0,0,0,0) !important;
                    color: inherit !important;
                }

            </style>
        `)
        // style是为了cancel掉mathjax无端报错的样式
        

        // XXX 不知道是否应该用cdn版本
        // import ("mathjax/es5/tex-svg.js")
        
        setTimeout(()=>{ $("head").append(script) }, 1000)
        
        /** 刷新页面 */
        // setInterval(flush_mathjax , 500)

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

function MathJaxFlusher(props: {children: any}){

    React.useEffect(()=>{
        flush_mathjax()
    } , [props.children] )
    return <div className = "mathjax_process">{props.children}</ div>
}

