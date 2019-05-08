"use strict";
const edit = {
    to: () => {
        ed(document.getElementById("Med"));
        ed.p(`测试文本&lt;div&gt;&amp;lt;div&amp;gt;测试文本&amp;lt;/div&amp;gt;&lt;/div&gt;`);
        q("wTJ").onclick = () => {
            console.log(ed.v());
        };
    },

    go: () => {
        setTimeout(edit.to, 127);
    }
};
try { window.onload = edit.go } catch (e) { }
