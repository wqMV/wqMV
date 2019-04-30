"use strict";
const edit = {
    to: () => {
        ed(document.getElementById("Med"));
    },

    go: () => {
        setTimeout(edit.to, 127);
    }
};
try { window.onload = edit.go } catch (e) { }
