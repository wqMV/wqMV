"use strict";
const test = {
    to: () => {

    },

    go: () => {
        setTimeout(test.to, 127);
    }
};
try { window.onload = test.go } catch (e) { }
