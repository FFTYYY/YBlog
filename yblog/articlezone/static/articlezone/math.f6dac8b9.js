import{D as o,a as t,$ as s,j as m,b as r}from"./titleword.c40d5a82.js";let n="$",i="$",c="$$",h="$$";var x=new o(()=>{let e=window.MathJax;e!=null&&e.typesetPromise!=null&&(e.typesetPromise(),e.texReset())},3e3);function l(){x.go()}function d(e){return t.useEffect(()=>{let a=s(`
            
            <script defer>
                MathJax = {
                    
                    tex: {
                        packages: {"[+]": ["tagformat"]} , 
                        inlineMath: [["${n}", "${i}"]] , 
                        displayMath: [["${c}", "${h}"]] , 
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
        `);return s("head").append(a),()=>{a.remove()}},[]),m(t.Fragment,{children:e.children})}function f(e){return t.useEffect(()=>{l()},[e.children]),r("span",{className:"mathjax_process",children:[n,e.children,i]})}function _(e){return t.useEffect(()=>{l()},[e.children]),r("div",{className:"mathjax_process",children:[c,e.children,h]})}export{d as M,_ as a,f as b};
