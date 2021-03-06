"use strict";

(() => {
    // J Json: e Element, id,
    // d Data: c Color, y Yaxis, x Xaxis, nx[NameXaxis], d [Data], da [DataAverage]
    const cv = J => {
        J.e.insertAdjacentHTML("beforeEnd", `<div id="${J.id}" class="wqCV"></div>`);
        sessionStorage.setItem("wqCV_" + J.id, JSON.stringify(J.d));
        cv.rs();
        window.addEventListener("resize", cv.rs, true);
    };

    // J Json: e Element, l left, t Top, w Width, h Height, c Color
    cv.lt = J => {
        let l = (e, h) => {
            e = document.getElementById(e);
            e.insertAdjacentHTML("beforeEnd", h);
        };

        J.d = JSON.parse(sessionStorage.getItem("wqCV_" + J.e));
        J.da = J.d.da || 0;
        J.d = J.d.d;
        J.t = document.getElementById(J.e).offsetHeight - J.t - 1;
        for (let i = 0; i < J.d.length; i++) {
            let h = [],
                nl = J.l + parseInt(J.w * (i + 0.5)) - parseInt(J.w / 6),
                nh = J.h * J.d[i];
            h.push(`<div class="wqCVc" style="`);
            h.push(`left: ${nl}px;`);
            h.push(` top: ${J.t - nh}px;`);
            h.push(` width: ${parseInt(J.w / 3)}px;`);
            h.push(` height: ${nh}px;`);
            h.push(` background: ${J.c}`);
            h.push(`" title="均：${J.da ? J.da[i] : ''}\n值：${J.d[i]}"`);
            h.push(`></div>`);
            h.push(`<div class="wqCVn" style="`);
            h.push(`left: ${nl}px;`);
            h.push(` top: ${J.t - nh - 14}px`);
            h.push(`">${J.d[i]}</div>`);
            setTimeout(() => { l(J.e, h.join('')) }, i * 127);
        }
    };

    // J Json: id, w Width, h Height
    cv.dr = J => {
        let h = [], ct = 0,
            d = JSON.parse(sessionStorage.getItem("wqCV_" + J.id));

        J.e = document.getElementById(J.id);
        h.push(`<div id="${J.id}y" style="left: 0; top: 0; padding: .5rem">${d.y}</div>`);
        h.push(`<div id="${J.id}x" style="padding: .5rem">${d.x}</div>`);
        J.e.insertAdjacentHTML("beforeEnd", h.join(''));
        J.e = document.getElementById(J.id + "x");
        J.b = J.e.offsetHeight + 4;
        J.y = J.h - J.e.offsetHeight;
        J.x = J.w - J.e.offsetWidth;
        J.e.style.left = J.x + "px";
        J.e.style.top = J.y + "px";

        J.e = document.getElementById(J.id + "y");
        J.w = J.x - 6;
        J.x = J.e.offsetWidth;
        J.h = J.y - 6;
        h = [];
        h.push(`<canvas id="${J.id}g" width="${J.w}" height="${J.h}" style="left: ${J.x}px; top: 6px"></canvas>`);
        J.e = document.getElementById(J.id);
        J.e.insertAdjacentHTML("beforeEnd", h.join(''));

        ct = document.getElementById(J.id + "g").getContext("2d");
        ct.lineCap = "round";
        ct.lineJoin = "round";
        ct.lineWidth = 4;
        ct.strokeStyle = "rgba(0, 0, 0, .8)";
        ct.fillStyle = "rgba(255, 255, 255, .1)";
        ct.moveTo(0, 0);
        ct.lineTo(0, J.h);
        ct.stroke();
        ct.beginPath();
        ct.moveTo(0, J.h);
        ct.lineTo(J.w, J.h);
        ct.stroke();

        J.h = J.h - 18;
        J.m = parseInt(J.h / 10);
        for (let i = J.h - J.m; i > 0; i = i - J.m * 2) ct.fillRect(2, i + 16, J.w, J.m);

        J.m = Math.max.apply(null, d.d);
        J.m = parseInt(J.h / J.m);
        J.w = parseInt((J.w - 16) / d.d.length);
        h = [];
        for (let i = 0; i < d.nx.length; i++) {
            h.push(`<div style="`);
            h.push(` left: ${J.x + parseInt(J.w * (i + 0.5)) - parseInt(J.w / 6)}px;`);
            h.push(` top: ${J.y + 2}px`);
            h.push(`">${d.nx[i]}</div>`);
        }
        J.e.insertAdjacentHTML("beforeEnd", h.join(''));

        ct.lineWidth = 2;
        ct.strokeStyle = "rgba(255, 0, 0, .618)";
        ct.fillStyle = "rgba(255, 0, 0, .618)";
        ct.font = 'bold 12px Tahoma';
        if (d.da && d.da.length === d.d.length) for (let i = 0; i < d.da.length; i++) {
            let nl = parseInt(J.w * (i + 0.5)),
                nt = J.h + 14 - J.m * d.da[i];
            ct.beginPath();
            if (i === 0) ct.moveTo(nl, nt);
            else {
                ct.moveTo(J.e, J.y);
                ct.lineTo(nl, nt);
                ct.stroke();
            }
            J.e = nl;
            J.y = nt;
            ct.fillText(d.da[i], J.e, J.y);
        }

        setTimeout(() => {
            cv.lt({
                e: J.id,
                l: J.x,
                t: J.b,
                w: J.w,
                h: J.m,
                c: d.c || "#08e"
            })
        }, 211);
    };

    cv.rs = () => {
        let f = () => {
            let e = document.querySelectorAll(".wqCV")
            for (let i = 0; i < e.length; i++) {
                let k = e[i].parentNode;
                k.style.display = "flex";
                k = getComputedStyle(k);
                setTimeout(() => { cv.dr({ id: e[i].id, w: parseInt(k.width), h: parseInt(k.height) }) }, (i + 1) * 521);
            }
        }, o = document.querySelectorAll(".wqCV");

        if (o.length) {
            for (let i = 0; i < o.length; i++)  o[i].innerHTML = "";
            clearTimeout(cv.rs.t);
            cv.rs.t = setTimeout(f, 383);
        } else window.removeEventListener("resize", cv.rs, true);
    };

    window.cv = cv;
})();
