import{D as h,a as t,$ as i,j as a}from"./titleword.8f63c6d1.js";var s="E:\\Coding\\Projects\\YBlog\\yblog_frontend\\templates\\articlezone\\base\\construction\\math.tsx";let n="$",o="$",c="$$",m="$$";var d=new h(()=>{let e=window.MathJax;e!=null&&e.typesetPromise!=null&&(e.typeset(),e.typesetPromise(),e.typeset())},1e3);function r(){d.go()}function x(e){return t.useEffect(()=>{let l=i(`
            
            <script defer>
                MathJax = {
                    loader: {load: ["[tex]/boldsymbol"]},
                    tex: {
                        packages: {"[+]": ["tagformat", "boldsymbol"]} , 
                        inlineMath: [["${n}", "${o}"]] , 
                        displayMath: [["${c}", "${m}"]] , 
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

            <script type="text/javascript" id="MathJax-script" defer
              src="https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/tex-chtml-full.js">
            <\/script>
        `);return i("head").append(l),()=>{l.remove()}},[]),a.exports.jsxDEV(t.Fragment,{children:e.children},void 0,!1,{fileName:s,lineNumber:74,columnNumber:12},this)}function f(e){return t.useEffect(()=>{r()},[e.children]),a.exports.jsxDEV("span",{className:"mathjax_process",children:[n,e.children,o]},void 0,!0,{fileName:s,lineNumber:84,columnNumber:12},this)}function p(e){return t.useEffect(()=>{r()},[e.children]),a.exports.jsxDEV("div",{className:"mathjax_process",children:[c,e.children,m]},void 0,!0,{fileName:s,lineNumber:92,columnNumber:12},this)}function N(e){return t.useEffect(()=>{r()},[e.children]),a.exports.jsxDEV("div",{className:"mathjax_process",children:e.children},void 0,!1,{fileName:s,lineNumber:100,columnNumber:12},this)}export{x as M,p as a,f as b,N as c,r as d,d as f};
