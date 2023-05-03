import{D as h,a as t,$ as n,j as a}from"./titleword.5306297c.js";var s="E:\\Coding\\Projects\\YBlog\\yblog_frontend\\templates\\articlezone\\base\\construction\\math.tsx";let l="$",c="$",o="$$",m="$$";var u=new h(()=>{let e=window.MathJax;e!=null&&e.typesetPromise!=null&&(e.texReset(),e.typesetPromise(),e.typeset())},1e3);function r(){u.go()}function d(e){return t.useEffect(()=>{let i=n(`
            
            <script defer>
                MathJax = {
                    
                    tex: {
                        packages: {"[+]": ["tagformat"]} , 
                        inlineMath: [["${l}", "${c}"]] , 
                        displayMath: [["${o}", "${m}"]] , 
                        tags: "ams" , 
                        
                    },
                    svg: {
                        fontCache: "global" , 
                        scale: 1.0 , 
                    } , 
                    ignoreHtmlClass: "mathjax_ignore" , 
                    processHtmlClass: "mathjax_process" , 
                    preRemoveClass: "mathjax_preview" , 
                }
            <\/script>

            <script type="text/javascript" id="MathJax-script" async
                src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
            <\/script>
        `);return n("head").append(i),()=>{i.remove()}},[]),a.exports.jsxDEV(t.Fragment,{children:e.children},void 0,!1,{fileName:s,lineNumber:74,columnNumber:12},this)}function f(e){return t.useEffect(()=>{r()},[e.children]),a.exports.jsxDEV("span",{className:"mathjax_process",children:[l,e.children,c]},void 0,!0,{fileName:s,lineNumber:84,columnNumber:12},this)}function p(e){return t.useEffect(()=>{r()},[e.children]),a.exports.jsxDEV("div",{className:"mathjax_process",children:[o,e.children,m]},void 0,!0,{fileName:s,lineNumber:92,columnNumber:12},this)}function N(e){return t.useEffect(()=>{r()},[e.children]),a.exports.jsxDEV("div",{className:"mathjax_process",children:e.children},void 0,!1,{fileName:s,lineNumber:100,columnNumber:12},this)}export{d as M,p as a,f as b,N as c,u as f};
