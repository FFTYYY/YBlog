import React, { useEffect } from "react"
import { DoSomething } from "@ftyyy/ytext"
import { MathJax, MathJaxContext as _MathJaxContext } from "better-react-mathjax"
import "./mathstyles.css"

export { MathJaxContext , MathJaxInline , MathJaxBlock , MathJaxFlusher , flush_math}

let MATHJAX_INLINE_START = "$"
let MATHJAX_INLINE_END = "$"
let MATHJAX_BLOCK_START = "$$"
let MATHJAX_BLOCK_END = "$$"

/** 这个函数清除mathjax的缓存内容（label和节点编号之类的） */
function clear_memory(MathJax: any){
    MathJax.startup.document.state(0)
    // MathJax.texReset()
    MathJax.typeset()
    MathJax.typesetClear()
}

var last_flush = 0
function flush_math(){
    // let MathJax = (window as any).MathJax
    // if(MathJax == undefined || MathJax.typesetPromise == undefined)
    //     return 
    // let now = Date.now()
    // if(now - last_flush < 5000)
    //     return
    // console.log("flush")

    // clear_memory(MathJax)
    // MathJax.typesetPromise()
    // clear_memory(MathJax)    
    // last_flush = now
}

function MathJaxInline(props: {children: any}){
    return <span className = "mathjax_process"><MathJax dynamic>{MATHJAX_INLINE_START}{props.children}{MATHJAX_INLINE_END}</MathJax></ span>
}

function MathJaxBlock(props: {children: any}){
    return <div className = "mathjax_process"><MathJax dynamic>{MATHJAX_BLOCK_START}{props.children}{MATHJAX_BLOCK_END}</MathJax></div>
}

function MathJaxFlusher(props: {
    block?: boolean | undefined , 
    children: any
}){
    let block = props.block
    let children = props.children

    if (block){
        return <MathJax dynamic>{props.children}</MathJax>
    }
    return <MathJax inline dynamic>{props.children}</MathJax>
}

const config = {
    loader: {
        load: ["input/tex", "output/chtml", "[tex]/boldsymbol"] // 使用 CHTML 渲染并加载必要模块
    },
    extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js", "noUndefined.js"] , 
    tex: {
        packages: {"[+]": ["tagformat", "boldsymbol"]}, // 添加自定义包
        inlineMath: [[MATHJAX_INLINE_START, MATHJAX_INLINE_END]], // 内联数学公式标记
        displayMath: [[MATHJAX_BLOCK_START, MATHJAX_BLOCK_END]], // 块数学公式标记
        tags: "ams", // 使用 AMS 标签样式
    },
    chtml: {
        fontCache: "global", // 使用全局字体缓存以提高性能
        scale: 1.0 ,  // 调整缩放比例
    },
    ignoreHtmlClass  : "mathjax_ignore", // 忽略特定类的 HTML
    processHtmlClass : "mathjax_process", // 处理特定类的 HTML
    preRemoveClass   : "mathjax_preview", // 预移除特定类
};
  
function MathJaxContext(props: {children: any}){  
    return <_MathJaxContext version={3} config={config}>
        {props.children}
    </_MathJaxContext>
}

