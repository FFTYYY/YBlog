
var mj_sc = document.createElement('script');
mj_sc.setAttribute('type','text/javascript');
mj_sc.setAttribute('src','/static/Universe/MathJax/MathJax.js');
document.head.appendChild(mj_sc);

var mj_cf = document.createElement('script');
mj_cf.setAttribute('type','text/x-mathjax-config');
mj_cf.text = '\
MathJax.Hub.Config({\
	extensions: ["tex2jax.js"],\
	jax: ["input/TeX","output/HTML-CSS"],\
	tex2jax: {inlineMath: [["$","$"]]}\
});\
'
document.head.appendChild(mj_cf);
