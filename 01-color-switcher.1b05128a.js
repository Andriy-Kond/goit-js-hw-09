const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let d;function r(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(function(a){t.setAttribute("disabled","");e.hasAttribute("disabled")&&e.removeAttribute("disabled","");d=setInterval(r,1e3)})),e.addEventListener("click",(function(r){clearInterval(d),e.setAttribute("disabled",""),t.removeAttribute("disabled","")}));
//# sourceMappingURL=01-color-switcher.1b05128a.js.map