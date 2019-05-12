"use strict";
const test = {
    tp: () => {
        let J = { e: q("tOK"), t: "弹窗", h: "文本，文本，文本，文本，文本" };
        let o = () => {
            J.e.open = false;
            v.del("p");
        }, lf = () => ({ x: J.e.offsetLeft + J.e.offsetWidth, y: J.e.offsetTop + J.e.offsetHeight + 8 }),
            k = q("VBp"), x = lf();
        if (k) v.del("p");
        k = [];
        k.p(`<div id="VBp" class="pf Vb db" style="background: transparent"></div>`);
        k.p(`<div id="VFp" class="pa Vf db bd gw" style="visibility: visible">`);
        k.p(`<div class="bb p51">${J.t}</div>`);
        k.p(`<div class="p51">${J.h}</div></div>`)
        J.e.offsetParent.insertAdjacentHTML("beforeEnd", k.j(""));
        k = q("VFp");
        k.style.left = "-6000px";
        x.x = x.x - k.offsetWidth;
        k.style.left = x.x + "px";
        k.style.top = x.y + "px";
        q("VBp").onclick = o;
    },

    to: () => {

    },

    go: () => {
        setTimeout(test.to, 127);
    }
};
try { window.onload = test.go } catch (e) { }
