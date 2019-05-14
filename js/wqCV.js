"use strict";

(() => {
    // J Json: e Element, id, d Data
    const cv = J => {
        J.e.insertAdjacentHTML("beforeEnd", `<canvas id="${J.id}" class="wqCV gr" width="0" height="0"></canvas>`);
        sessionStorage.setItem("wqCV_" + J.id, JSON.stringify(J.d));
        cv.rs();
        window.addEventListener("resize", cv.rs, true);
    };

    cv.dr = S => {
        let e = document.getElementById(S).getContext("2d"),
            d = sessionStorage.getItem("wqCV_" + S);
        console.log(d);
    };

    cv.rs = () => {
        let f = () => {
            let e = document.querySelectorAll(".wqCV")
            for (let i = 0; i < e.length; i++) {
                let k = getComputedStyle(e[i].parentNode);
                e[i].setAttribute("width", parseInt(k.width));
                e[i].setAttribute("height", parseInt(k.height));
                setTimeout(() => { cv.dr(e[i].id) }, (i + 1) * 521);
            }
        }, o = document.querySelectorAll(".wqCV");

        if (o.length) {
            for (const i of o) {
                i.setAttribute("width", "0");
                i.setAttribute("height", "0");
            }
            clearTimeout(cv.rs.t);
            cv.rs.t = setTimeout(f, 383);
        } else window.removeEventListener("resize", cv.rs, true);
    };

    window.cv = cv;
})();
