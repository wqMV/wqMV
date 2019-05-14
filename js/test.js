"use strict";
const test = {
    to: () => {
        cv({
            e: document.getElementById("wCanv1"),
            id: "wqCV1",
            d: { c1: 1 }
        });

        cv({
            e: document.getElementById("wCanv2"),
            id: "wqCV2",
            d: { c2: 2 }
        });
    },

    go: () => { setTimeout(test.to, 127) }
};
try { window.onload = test.go } catch (e) { }
