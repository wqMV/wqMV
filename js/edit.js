"use strict";
const edit = {
    to: () => {
        ed(document.getElementById("Med"));
        q("wTJ").onclick = () => {
            let h = ed.ht(q("wqEDR").h);
            console.log(h);
            console.log(ed.hh(h));
        };
    },

    go: () => {
        setTimeout(edit.to, 127);
    }
};
try { window.onload = edit.go } catch (e) { }
