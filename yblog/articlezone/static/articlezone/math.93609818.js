import{D as u,a as t,$ as i,j as s}from"./titleword.b1b80b46.js";var a="E:\\Coding\\Projects\\YBlog\\yblog_frontend\\templates\\articlezone\\base\\construction\\math.tsx";let o="$",c="$",m="$$",h="$$";function n(e){e.startup.document.state(0),e.texReset(),e.typeset(),e.typesetClear()}var d=new u(()=>{let e=window.MathJax;e!=null&&e.typesetPromise!=null&&(n(e),e.typesetPromise(),n(e))},1e3);function r(){d.go()}function x(e){return t.useEffect(()=>{let l=i(`
            
            <script defer>
                MathJax = {
                    loader: {load: ["[tex]/boldsymbol"]},
                    tex: {
                        packages: {"[+]": ["tagformat", "boldsymbol"]} , 
                        inlineMath: [["${o}", "${c}"]] , 
                        displayMath: [["${m}", "${h}"]] , 
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
        `);return i("head").append(l),()=>{l.remove()}},[]),s.exports.jsxDEV(t.Fragment,{children:e.children},void 0,!1,{fileName:a,lineNumber:82,columnNumber:12},this)}function p(e){return t.useEffect(()=>{r()},[e.children]),s.exports.jsxDEV("span",{className:"mathjax_process",children:[o,e.children,c]},void 0,!0,{fileName:a,lineNumber:92,columnNumber:12},this)}function N(e){return t.useEffect(()=>{r()},[e.children]),s.exports.jsxDEV("div",{className:"mathjax_process",children:[m,e.children,h]},void 0,!0,{fileName:a,lineNumber:100,columnNumber:12},this)}function j(e){return t.useEffect(()=>{r()},[e.children]),s.exports.jsxDEV("div",{className:"mathjax_process",children:e.children},void 0,!1,{fileName:a,lineNumber:108,columnNumber:12},this)}export{x as M,N as a,p as b,j as c,r as d,d as f};
