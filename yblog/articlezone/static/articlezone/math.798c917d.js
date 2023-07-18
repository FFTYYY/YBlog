import{D as d,a as e,$ as r,j as i,b as o}from"./titleword.81953787.js";let c="$",l="$",m="$$",h="$$";function n(t){t.startup.document.state(0),t.texReset(),t.typeset(),t.typesetClear()}var x=new d(()=>{let t=window.MathJax;t!=null&&t.typesetPromise!=null&&(n(t),t.typesetPromise(),n(t))},1e3);function a(){x.go()}function j(t){return e.useEffect(()=>{let s=r(`
            
            <script defer>
                MathJax = {
                    config: ["MMLorHTML.js"],
                    jax: ["input/TeX","input/MathML","input/AsciiMath","output/HTML-CSS","output/NativeMML"],
                    extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js"],

                    loader: {load: ["[tex]/boldsymbol"]},
                    tex: {
                        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"] , 
                        packages: {"[+]": ["tagformat", "boldsymbol"]} , 
                        inlineMath: [["${c}", "${l}"]] , 
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
              src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js">
            <\/script>
            
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
        `);return r("head").append(s),()=>{s.remove()}},[]),i(e.Fragment,{children:t.children})}function u(t){return e.useEffect(()=>{a()},[t.children]),o("span",{className:"mathjax_process",children:[c,t.children,l]})}function f(t){return e.useEffect(()=>{a()},[t.children]),o("div",{className:"mathjax_process",children:[m,t.children,h]})}function M(t){return e.useEffect(()=>{a()},[t.children]),i("div",{className:"mathjax_process",children:t.children})}export{j as M,f as a,u as b,M as c,a as d,x as f};
