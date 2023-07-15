import{D as d,a as t,$ as n,j as i,b as c}from"./titleword.b9bbf85f.js";let l="$",o="$",h="$$",m="$$";function r(e){e.startup.document.state(0),e.texReset(),e.typeset(),e.typesetClear()}var u=new d(()=>{let e=window.MathJax;e!=null&&e.typesetPromise!=null&&(r(e),e.typesetPromise(),r(e))},1e3);function s(){u.go()}function j(e){return t.useEffect(()=>{let a=n(`
            
            <script defer>
                MathJax = {
                    config: ["MMLorHTML.js"],
                    jax: ["input/TeX","input/MathML","input/AsciiMath","output/HTML-CSS","output/NativeMML"],
                    extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js"],

                    loader: {load: ["[tex]/boldsymbol"]},
                    tex: {
                        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"] , 
                        packages: {"[+]": ["tagformat", "boldsymbol"]} , 
                        inlineMath: [["${l}", "${o}"]] , 
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
              src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js">
            <\/script>
        `);return n("head").append(a),()=>{a.remove()}},[]),i(t.Fragment,{children:e.children})}function p(e){return t.useEffect(()=>{s()},[e.children]),c("span",{className:"mathjax_process",children:[l,e.children,o]})}function f(e){return t.useEffect(()=>{s()},[e.children]),c("div",{className:"mathjax_process",children:[h,e.children,m]})}function M(e){return t.useEffect(()=>{s()},[e.children]),i("div",{className:"mathjax_process",children:e.children})}export{j as M,f as a,p as b,M as c,s as d,u as f};
