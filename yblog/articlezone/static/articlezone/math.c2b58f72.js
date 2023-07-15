import{D as d,a as t,$ as r,j as l,b as n}from"./titleword.7803c42a.js";let i="$",o="$",h="$$",m="$$";function c(e){e.startup.document.state(0),e.texReset(),e.typeset(),e.typesetClear()}var f=new d(()=>{let e=window.MathJax;e!=null&&e.typesetPromise!=null&&(c(e),e.typesetPromise(),c(e))},1e3);function a(){f.go()}function x(e){return t.useEffect(()=>{let s=r(`
            
            <script defer>
                MathJax = {
                    loader: {load: ["[tex]/boldsymbol"]},
                    tex: {
                        packages: {"[+]": ["tagformat", "boldsymbol"]} , 
                        inlineMath: [["${i}", "${o}"]] , 
                        displayMath: [["${h}", "${m}"]] , 
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
        `);return r("head").append(s),()=>{s.remove()}},[]),l(t.Fragment,{children:e.children})}function u(e){return t.useEffect(()=>{a()},[e.children]),n("span",{className:"mathjax_process",children:[i,e.children,o]})}function _(e){return t.useEffect(()=>{a()},[e.children]),n("div",{className:"mathjax_process",children:[h,e.children,m]})}function j(e){return t.useEffect(()=>{a()},[e.children]),l("div",{className:"mathjax_process",children:e.children})}export{x as M,_ as a,u as b,j as c,a as d,f};
