import{D as m,a as t,$ as r,j as c,b as n}from"./titleword.b2af390c.js";let i="$",h="$",l="$$",o="$$";var x=new m(()=>{let e=window.MathJax;e!=null&&e.typesetPromise!=null&&(e.texReset(),e.typesetPromise(),e.typeset())},1e3);function a(){x.go()}function f(e){return t.useEffect(()=>{let s=r(`
            
            <script defer>
                MathJax = {
                    
                    tex: {
                        packages: {"[+]": ["tagformat"]} , 
                        inlineMath: [["${i}", "${h}"]] , 
                        displayMath: [["${l}", "${o}"]] , 
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
        `);return r("head").append(s),()=>{s.remove()}},[]),c(t.Fragment,{children:e.children})}function p(e){return t.useEffect(()=>{a()},[e.children]),n("span",{className:"mathjax_process",children:[i,e.children,h]})}function u(e){return t.useEffect(()=>{a()},[e.children]),n("div",{className:"mathjax_process",children:[l,e.children,o]})}function _(e){return t.useEffect(()=>{a()},[e.children]),c("div",{className:"mathjax_process",children:e.children})}export{f as M,u as a,p as b,_ as c,x as f};
