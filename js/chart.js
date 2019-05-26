"use strict";
const test = {
    to: () => {
        cv({
            e: document.getElementById("wCanv1"),
            id: "wqCV1",
            d: {
                c: "#08e",
                y: "次",
                x: "月",
                nx: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                d: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                da: [12, 2, 11, 4, 10, 6, 9, 7, 8, 3, 5, 1]
            }
        });

        cv({
            e: document.getElementById("wCanv2"),
            id: "wqCV2",
            d: {
                y: "次",
                x: "月",
                nx: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                d: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
                da: [12, 2, 11, 4, 10, 6, 9, 7, 8, 3, 5, 1]
            }
        });
    },

    go: () => { setTimeout(test.to, 127) }
};
try { window.onload = test.go } catch (e) { }
