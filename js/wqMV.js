/*!
 * wqMV.js v 2.0
 * (c) 2019 WangQiang
 * date: 2019-1-1
 * date: 2019-10-1
 */

"use strict";

// w
(() => {
    //J Json: c Callback, d formData, u Url, t waitTime, m Mode, o timeOut
    const w = J => {
        let wI = 0, wT = 0;
        const wPT = () => {
            const k = new XMLHttpRequest();
            k.onreadystatechange = () => { if (k.readyState === 4) wT = k.responseText };
            k.open(J.m, J.u, true);
            if (J.m === "GET") k.send();
            else k.send(J.d);
        }, wOK = () => {
            // wT is true
            if (wT) {
                clearInterval(wI);
                if (J.c) J.c(wT);
                wT = 1;
            }
        }, wON = () => {
            wPT();
            wI = setInterval(wOK, 127);
        }, wED = () => {
            if (wT !== 1) {
                clearInterval(wI);
                if (J.c) J.c("0");
            }
        }, wRD = K => Math.floor(Math.random() * K * 89) + (K + 1) * 127;

        J.m = J.m === "GET" ? "GET" : "POST";
        J.u = window.location.origin + "/" + (J.u ? J.u : "ajax.aspx");
        if (!J.d.append) {
            let k = new FormData();
            for (const i in J.d) k.append(i, J.d[i]);
            J.d = k;
        }
        setTimeout(wON, wRD(J.t ? J.t : 0));
        setTimeout(wED, (J.o ? J.o * 1000 : 120000));
    };

    window.w = w;
})();

// q
(() => {
    // S String, E Element, J Json
    const q = (S, E, J) => {
        let l = 0;
        const s = E => {
            if (!E.g) {
                E.g = (S, V) => {
                    if (S && (V || V === "")) E.setAttribute(S, V);
                    return E.getAttribute(S) || "";
                };
                E.t = E.textContent || "";
                Object.defineProperties(E, {
                    c: {
                        get: () => E.className || "",
                        set: S => { E.className = S }
                    },
                    h: {
                        get: () => E.type ? E.value : E.innerHTML,
                        set: S => { E.type ? E.value = S : E.innerHTML = S }
                    }
                });
            }
        };

        J = typeof J === "object" && J.d ? J : 0;
        if (typeof E === "object" && E.d) J = E, E = document.body;
        E = E || document.body;
        if (S.startsWith(".")) E = E.querySelectorAll(S.substr(1));
        else if (S.startsWith(":")) E = document.getElementsByName(S.substr(1));
        else if (S.startsWith("@")) E = E.getElementsByTagName(S.substr(1));
        else if (S) E = document.getElementById(S);
        if (E) {
            l = E.nodeType === 1 ? 0 : E.length;
            if (l) {
                E = [].slice.call(E);
                for (const i of E) s(i);
            } else s(E);
        } else return;

        // J Json: b background for :for, d data, m on mode, c callback
        if (J) {
            const up = (N, O, S, V) => {
                if (V === 3) O.textContent = S.replace(/\$\{(.*)\}/g, J.d[N]);
                else if (V === 1) O.innerHTML = S.replace(/\$\{(.*)\}/g, J.d[N]);
                else if (V === 11) O.value = J.d[N];
                else if (V === 12) {
                    let r = O.nextElementSibling, k = 0;
                    if (O.value || O.value === "") O.value = J.d[N][0];
                    else O.innerHTML = J.d[N][0];
                    while (r && r.getAttribute("_q") === N) {
                        r.parentNode.removeChild(r);
                        r = O.nextElementSibling;
                    }
                    if (Array.isArray(J.b[N])) {
                        O.style.background = J.b[N][0];
                        k = J.b[N].length;
                    }
                    for (let i = 1; i < J.d[N].length; i++) {
                        let n = O.cloneNode(true);
                        if (r) n = O.parentNode.insertBefore(n, r);
                        else n = O.parentNode.appendChild(n);
                        if (n.value || n.value === "") n.value = J.d[N][i];
                        else n.innerHTML = J.d[N][i];
                        if (k) n.style.background = J.b[N][(i < k ? i : i % k)];
                    }
                }
            }, pt = (N, O, S, V) => {
                // N Name, O Object, S String, V tag 1 push
                if (V === 1 && J.q[N].indexOf(O) === -1) {
                    J.q[N].push(O);
                    J.q[N + "_v"].push(S);
                }
            }, go = (O, S, V) => {
                let r = /\$\{(.*)\}/,
                    n = r.test(S) ? r.exec(S)[1] : (r = /\:v(.*)/).test(S) ? r.exec(S)[1] : (r = /\:for(.*)/).test(S) ? r.exec(S)[1] : "";
                if (O.nodeType == 3 && (J.d[n] || J.d[n] === "")) {
                    pt(n, O, S, V);
                    up(n, O, S, 3);
                } else if (O.nodeType === 1) {
                    if (J.d[n] || J.d[n] === "") {
                        pt(n, O, S, V);
                        if (S.indexOf(":v") === 0) up(n, O, "", 11);
                        else if (S.indexOf(":for") === 0) up(n, O, "", 12);
                        else up(n, O, S, 1);
                    }
                    for (const i of [].slice.call(O.attributes)) {
                        r = i.name.split(':');
                        n = i.value;
                        if ((O.value || O.value === "") && r[1] === "v" && J.d[n]) {
                            // :v value
                            pt(n, O, ":v" + n, V);
                            up(n, O, "", 11);
                            O.addEventListener('input', S => { J.d[i.value] = S.target.value }, false);
                            O.removeAttribute(i.name);
                        } else if (r[0] === "on" && J.m[n]) {
                            // on:click onclick
                            if (O.getAttribute(":for") || O.getAttribute("_q")) O.parentNode.addEventListener(r[1], S => { if (S.target.getAttribute("_q")) J.m[i.value](J.d, S.target) }, false);
                            else O.addEventListener(r[1], S => { J.m[i.value](J.d, S.target) }, false);
                            O.removeAttribute(i.name);
                        } else if (r[1] === "for" && Array.isArray(J.d[n])) {
                            // :for for
                            O.removeAttribute(i.name);
                            O.setAttribute("_q", n);
                            pt(n, O, ":for" + n, V);
                            up(n, O, "", 12);
                        }
                    }
                }
            }, to = O => {
                if (O.childNodes.length === 0) go(O, O.textContent, 1);
                else for (const i of [].slice.call(O.childNodes)) {
                    if (i.children && i.children.length) to(i);
                    else go(i, i.textContent, 1);
                }
            }, df = (O, K, V) => {
                Object.defineProperty(O, K, {
                    get: () => V,
                    set: S => {
                        if (S === V) return;
                        V = S;
                        for (let i = 0; i < J.q[K].length; i++) go(J.q[K][i], J.q[K + "_v"][i]);
                    }
                });
            };

            J.q = J.q ? J.q : {};
            for (const i in J.d) {
                J.q[i] = J.q[i] ? J.q[i] : [];
                J.q[i + "_v"] = J.q[i + "_v"] ? J.q[i + "_v"] : [];
                df(J.d, i, J.d[i]);
            }
            if (l) for (const i of E) to(i);
            else to(E);
            if (typeof J.c === "function") J.c(J.d);
        }

        // S String, A Any
        E.add = (S, A) => {
            const k = () => {
                if (l) for (const i of E) i.insertAdjacentHTML(S, A);
                else E.insertAdjacentHTML(S, A)
            };
            if (S && typeof A === "function") {
                if (l) for (const i of E) i.addEventListener(S, A, false);
                else E.addEventListener(S, A, false);
            } else {
                if (S === "be") S = "beforeEnd";
                else if (S === "ab") S = "afterBegin";
                else if (S === "bb") S = "beforeBegin";
                else if (S === "ae") S = "afterEnd";
                k();
            }
            return E;
        };

        // J Json or String
        E.css = J => {
            if (typeof J === "object") {
                if (l) for (const i of E) for (const j in J) i.style[j] = J[j];
                else for (const j in J) E.style[j] = J[j];
            } else E.className = J;
            return E;
        };

        E.del = () => {
            if (l) for (let i = 0; i < l; i++) E[0].parentNode.removeChild(E[0]);
            else E.parentNode.removeChild(E);
            return "";
        };

        // C Callback
        E.for = C => {
            if (l) for (const i of E) C(i);
            return E;
        };

        // C Callback, N keycode
        E.key = (C, N) => {
            const k = () => {
                N = N || 13;
                if (event.keyCode === N) {
                    event.returnValue = false;
                    if (typeof C === "function") C(event.target);
                }
            };
            if (l) for (const i of E) i.onkeydown = k;
            else E.onkeydown = k;
            return E;
        };
        return E;
    };

    // S String
    q.a = S => {
        let k = [];
        if (typeof S === "string" && S && S != 0) {
            S = S.split(";");
            for (let i = 0; i < S.length; i++) {
                const s = S[i].split(",");
                k[i] = [];
                for (let j = 0; j < s.length; j++) k[i].push(s[j]);
            }
        }
        return k;
    };

    // N Name, V Value, K Key 0 delete
    q.c = (N, V, K) => {
        let k = document.cookie;
        if (N && V) {
            let d = new Date();
            d.setDate(d.getDate() + K);
            document.cookie = escape(N) + "=" + escape(V) + (typeof K !== "number" ? "" : "; expires=" + d.toGMTString());
        } else if (N) {
            const r = new RegExp("(^| )" + N + "=([^;]*)(;|$)");
            if (k = k.match(r)) V = k[2];
            else V = "";
        }
        return (K === 0 ? "" : V);
    };

    // S String
    q.j = S => typeof S === "string" ? JSON.parse(S) : JSON.stringify(S);

    // N Name, C Callback, T Time
    q.m = (N, C, T) => {
        let k, s = () => { if (typeof C === "function") setTimeout(C, T) };
        if (!N) return;
        T = typeof C === "number" ? C : (T ? T : 127);
        k = document.getElementById("_w_" + N);
        if (!k) {
            let u = new Date();
            u = u.getFullYear() + "" + (u.getMonth() + 1) + "" + u.getDate();
            k = document.createElement("script");
            k.type = "text/JavaScript";
            k.id = "_w_" + N;
            if ("onload" in k) k.onload = () => { s() }
            else k.onreadystatechange = () => { if (/loaded|complete/.test(k.readyState)) s() }
            k.src = "js/" + N + ".js?" + u;
            document.body.insertAdjacentElement("beforeEnd", k);
        } else s();
    };

    // N Name 0 clear, V Value 0 delete
    q.s = (N, V) => {
        const k = sessionStorage;
        if (V === 0) k.removeItem(N);
        else if (V) k.setItem(N, V);
        else if (N === 0) k.clear();
        return k.getItem(N) || "";
    };

    // N Name, J Json, C Callback
    q.w = (N, J, C) => {
        const k = new Worker("src/" + N + ".js");
        k.postMessage(J);
        k.onmessage = J => { if (typeof C === "function") C(J) }
    };

    // get sessionStorage
    q.sg = () => {
        if (!sessionStorage.length) localStorage.setItem('w_sg', Date.now());
        window.addEventListener('storage', function (event) {
            if (event.key == 'w_sg') {
                localStorage.setItem('w_ss', JSON.stringify(sessionStorage));
                localStorage.removeItem('w_ss');
            }
            else if (event.key == 'w_ss' && !sessionStorage.length) {
                let data = JSON.parse(event.newValue);
                for (let key in data) sessionStorage.setItem(key, data[key]);
            }
        });
    };

    Array.prototype.p = Array.prototype.push;
    Array.prototype.j = Array.prototype.join;
    window.q = q;
})();

// m
(() => {
    const m = {
        // Json: e element, id, t title, c classname, w width, l label Json, m mode: 1 add
        m: J => {
            let k = [], o = 0;

            k.p(`<div class="df dc m5 Mm ${J.c ? J.c : ""}"`);
            if (J.w) k.p(` style="max-width: ${J.w}"`);
            k.p(`>`);
            if (J.t) {
                k.p(`<div class="bb p51"><span id="${J.id}_t">${J.t}</span>`);
                if (J.l) {
                    k.p(`<div class="di p01 fs Mmr">`);
                    for (const i in J.l) {
                        k.p(`<label><input class="dh" name="Mm_${J.id}" type="radio"${o ? "" : " checked"}>`);
                        k.p(`<li class="tp p05 mu" onclick="${J.l[i]}">${i}</li></label>`);
                        o = 1;
                    }
                    k.p(`</div>`);
                }
                k.p(`</div>`);
            }
            k.p(`<div id="${J.id}" class="d1 p51"></div></div>`);
            J.m === 1 ? J.e.add("be", k.j("")) : J.e.h = k.j("");
        },

        // Json: e element, l label Json
        r: J => {
            let k = [], o = 0;

            k.p(`<div class="Mr">`);
            for (const i in J.l) {
                k.p(`<label><input class="dh" name="Mr_${J.e.id}" type="radio"${o ? "" : " checked"}>`);
                k.p(`<li class="tp p5 mu" onclick="${J.l[i]}">${i}</li></label>`);
                o = 1;
            }
            k.p(`</div>`);
            J.e.innerHTML = k.j("");
        },

        // Json: e element, id, l label Json
        l: J => {
            let k = [], o = 0;

            k.p(`<div class="Ml p01 bb g">`);
            for (const i in J.l) {
                k.p(`<label><input class="dh" name="Ml_${J.id}" type="radio"${o ? "" : " checked"}>`);
                k.p(`<li onclick="${J.l[i]}">${i}</li></label>`);
                o = 1;
            }
            k.p(`</div><div id="${J.id}" class="p51"></div>`);
            J.e.innerHTML = k.j("");
        },

        // Json: e element, l label Json: i icon
        d: J => {
            const s = E => {
                o = E.parentNode.parentNode;
                q("@DETAILS", o).for(e => {
                    if (e === E.parentNode) o = null;
                    else {
                        e.open = false;
                        e.c = "m50 lf";
                    }
                });
                E.parentNode.c = "Mdu m50 lfn";
            };
            let k = [], o = 0;

            k.p(`<div class="Md">`);
            for (const i in J.l) {
                k.p(`<details class="m50 lf"${o ? "" : " open"}>`);
                k.p(`<summary><b class="if fl">${J.l[i].i}</b><span>${i}</span></summary>`);
                o = o ? o : 1;
                for (const j in J.l[i]) if (j !== "i") {
                    k.p(`<label><input class="dh" name="Md_${J.e.id}" type="radio"${o === 1 ? " checked" : ""}>`);
                    k.p(`<li class="tc" onclick="${J.l[i][j]}">${j}</li></label>`);
                    o = 2;
                }
                k.p(`</details>`);
            }
            k.p(`</div>`)
            J.e.innerHTML = k.j("");
            k = q("@LABEL", J.e).for(e => { e.onclick = () => { s(e) } });
            if (k) k[0].parentNode.className = "Mdu m50 lfn";
        },

        // Json: e element, t title, l label Json: i icon
        u: J => {
            let k = [];

            k.p(`<div class="Md">`);
            k.p(`<details class="di lf tc">`);
            k.p(`<summary><b class="if fl">${J.l.i}</b><span>${J.t}</span></summary>`);
            for (const i in J.l) if (i !== "i") k.p(`<a class="db" href="${J.l[i]}" target="_blank">${i}</a>`);
            k.p(`</details></div>`);
            J.e.innerHTML = k.j("");
        },

        // T daTe
        ut: T => {
            let k = {}, s = T ? new Date(T) : new Date();

            // 数字
            k.nt = +s;

            // 今天
            k.y = s.getFullYear();
            k.n = s.getMonth() + 1;
            k.d = s.getDate();
            k.h = s.getHours();
            k.m = s.getMinutes();
            k.s = s.getSeconds();
            for (const i in k) if (k[i] < 10) k[i] = "0" + k[i];
            k.w = s.getDay();
            k.dt = k.y + "-" + k.n + "-" + k.d;
            k.dn = k.y + "-" + k.n;
            k.ut = k.dt + "T" + k.h + ":" + k.m;

            // 昨天
            s.setDate(k.d - 1);
            k.yy = s.getFullYear();
            k.yn = s.getMonth() + 1;
            k.yd = s.getDate();

            // 明天
            s = new Date(k.dt);
            s.setDate(k.d + 1);
            k.ty = s.getFullYear();
            k.tn = s.getMonth() + 1;
            k.td = s.getDate();

            // 上月
            s = new Date(k.dt);
            s.setDate(0);
            k.yny = s.getFullYear();
            k.ynn = s.getMonth() + 1;

            // 下月
            s = new Date(k.dt);
            s.setDate(32);
            k.tny = s.getFullYear();
            k.tnn = s.getMonth() + 1;

            // 本月合计天数
            s = new Date(k.tny + "-" + k.tnn + "-1");
            s.setDate(s.getDate() - 1);
            k.dc = s.getDate();

            // 上年
            k.yyy = k.y - 1;

            // 下年
            k.tyy = parseInt(k.y) + 1;

            for (const i in k) if (String(k[i]).length === 1) k[i] = "0" + k[i];
            k.ydt = k.yy + "-" + k.yn + "-" + k.yd;
            k.tdt = k.ty + "-" + k.tn + "-" + k.td;

            k.w = 1 == k.w ? "一" : 2 == k.w ? "二" : 3 == k.w ? "三" : 4 == k.w ? "四" : 5 == k.w ? "五" : 6 == k.w ? "六" : "日";
            k.cn = k.y + "年" + k.n + "月" + k.d + "日 星期" + k.w;
            return k;
        },

        // S String
        ss: S => S.replace(/,/g, "，").replace(/;/g, "；").replace(/\"/g, "＂").replace(/\'/g, "＇").replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, " "),
        sn: S => S.replace(/[^0-9]/g, ""),
        sc: S => S.replace(/[^(a-z|A-Z|0-9)]/g, ""),
        su: S => S.replace(/[^(\u3000-\u303F|\u4E00-\u9FA5|\uFF00-\uFFEF)]/g, ""),
        sp: S => m.ss(S).replace(/ |　|\?|\:|\%|\=|\+|\-|\*|\/|\||\\|\<|\>|\{|\}/g, ""),
        ts: function () { this.value = m.ss(this.value) },
        tn: function () { this.value = m.sn(this.value) },
        tc: function () { this.value = m.sc(this.value) },
        tu: function () { this.value = m.su(this.value) },
        tp: function () { this.value = m.sp(this.value) }
    };

    window.m = m;
})();

// v
(() => {
    const v = {
        // J Json: t Title, s Subheading, h Html, m Mode 1 del 2 nobutton, b Background
        t: J => {
            let k = document.querySelector(".VBt");

            if (k) v.del();
            k = [];
            k.p(`<div class="pf db Vb VBt"></div>`);
            k.p(`<div class="pf db gy bd Vf VFt" style="left: -6000px"`);
            if (J.b) k.p(` style="background: ${J.b}"`);
            k.p(`><div class="VHt" onmousedown="v.mv.d(event)" onmousemove="v.mv.v(event)" onmouseup="v.mv.u(event)">`);
            k.p(`<div class="p51 df vc ts"><span>${J.t} </span>`);
            k.p(`<span id="VHd" class="Ve fxl" onclick="v.del()">×</span></div>`);
            k.p(`<div class="Vs bb p01 fxs">${J.s ? J.s : ""}</div></div>`);
            k.p(`<form id="_w_F" class="p5">`);
            k.p(`<div class="p05">${J.h}</div>`);
            if (J.m !== 2) {
                k.p(`<div class="p05 p5t tr">`);
                k.p(`<input class="ga" type="submit" value="确定">`);
                if (J.m === 1) k.p(`<input id="_w_D" type="button" value="删除">`);
                k.p(`<input type="reset" value="重置"></div>`);
            }
            k.p(`</form></div>`);
            document.body.insertAdjacentHTML("beforeEnd", k.j(""));
            v.adi("t");
        },

        // J Json: e element, t Title, h Html, b Background
        p: J => {
            const lf = () => ({ x: J.e.offsetLeft + J.e.offsetWidth, y: J.e.offsetTop + J.e.offsetHeight + 8 });
            const o = () => {
                J.e.open = false;
                v.del("p");
            };
            let k = document.querySelector(".VBp"), x = lf();

            if (k) v.del("p");
            k = [];
            k.p(`<div class="pf db Vb VBp" style="background: transparent"></div>`);
            k.p(`<div class="pa Vf db bd gy VFp" style="visibility: visible">`);
            k.p(`<div class="bb p51">${J.t}</div>`);
            k.p(`<div class="p51">${J.h}</div></div>`)
            J.e.offsetParent.insertAdjacentHTML("beforeEnd", k.j(""));
            k = document.querySelector(".VFp");
            k.style.left = "-6000px";
            x.x = x.x - k.offsetWidth;
            k.style.left = x.x + "px";
            k.style.top = x.y + "px";
            document.querySelector(".VBp").onclick = o;
        },

        // J Json: h Html, c Callback, b Background
        c: J => {
            let k = document.querySelector(".VBc");

            if (k) v.del("c");
            k = [];
            k.p(`<div class="pf db Vb VBc"></div>`);
            k.p(`<div class="pf db p5 gy bd Vf VFc" style="left: -6000px"`);
            if (J.b) k.p(` style="background: ${J.b}"`);
            k.p(`>`);
            k.p(`<b class="vt p05 if fxl">&#xed19;</b><div class="di">${J.h}</div>`);
            k.p(`<div class="p5t tr">`)
            k.p(`<input id ="_w_OK" type="button" value="确定">`);
            k.p(`<input type="button" onclick="v.del('c')" value="取消">`);
            k.p(`</div></div>`);
            document.body.insertAdjacentHTML("beforeEnd", k.j(""));
            q("_w_OK").onclick = () => {
                if (J.h.indexOf("input") === -1) v.del("c");
                if (typeof J.c == "function") J.c();
            };
            v.adi("c");
        },

        // T Text, M Mode 1 Red
        i: (T, M) => {
            let k = document.querySelector(".VFi");

            if (k) v.del("i");
            k = [];
            k.p(`<div style="left: -6000px" class="pf db bd p5 Vf VFi `);
            if (M == 1) k.p(`gr"><b class="vm p5 if fxl">&#xed1c;`);
            else k.p(`gy"><b class="vm p5 if fxl">&#xed1b;`);
            k.p(`</b><div class="di p5 fs">${T}</div></div>`);
            document.body.insertAdjacentHTML("beforeEnd", k.j(""));
            v.adi("i");
            setTimeout(() => { v.del("i") }, 1200);
        },

        l: () => {
            let k = document.querySelector(".VBl");

            if (k) v.del("l");
            k = [];
            k.p(`<div class="pf db Vb VBl"></div>`);
            k.p(`<div class="pf db p5 gy bd Vf VFl" style="left: -6000px">`);
            k.p(`<b class="Vr di p5 if fxl vm">&#xe6c6;</b>`);
            k.p(`<span class="fs p01">正在加载…</span></div>`);
            document.body.insertAdjacentHTML("beforeEnd", k.j(""));
            v.adi("l");
        },

        // J Json: id, cn, ph path, t title, s subheading, h html, n number, uc up callback, dc del callback
        f: J => {
            const del = () => {
                v.c({
                    h: "您确定删除这个文件吗？",
                    c: () => { J.dc() }
                });
            };
            const up = () => {
                if (q("Efs").h) {
                    v.c({
                        h: "上传的新文件将覆盖原文件，<br>您确定继续吗？",
                        c: () => {
                            v.l();
                            J.uc();
                            return false;
                        }
                    });
                } else {
                    J.uc();
                    return false;
                }
                return false;
            };
            const fsch = () => {
                const k = q("Efs").files[0];
                if (k) {
                    const fr = new FileReader();
                    fr.onload = () => {
                        if (k.size > J.n) {
                            v.i(`文件大小不能超过 ${parseInt((J.n + 1) / 1024000)} MB！`, 1);
                            q("Efs").h = "";
                        } else q("Ecn").h = cnch(k.name);
                    };
                    fr.readAsDataURL(k);
                }
            };
            const cnch = k => k.replace(/ |　|,|;|\"|\'|\?|\:|\%|\=|\+|\-|\*|\/|\||\\|\<|\>|\{|\}/g, "");
            let k = document.querySelector(".VBt");

            J.n = J.n ? parseInt(J.n * 1024000 - 1) : 20479999;
            if (k) v.del();
            k = [];
            k.p(`<input name="id" type="hidden" value="${J.id}">`);
            k.p(`<input name="old" type="hidden" value="${J.ph}">`);
            if (J.h) k.p(`<div>${J.h}</div>`);
            k.p(`<div class="m50"><label>标题：<input id="Ecn" name="cn" type="text" style="width:24rem" required value="${J.cn}"></label></div>`);
            k.p(`<label>文件：<input id="Efs" name="fs" type="file" style="width:24rem"></label>`);
            v.t({
                t: J.t,
                s: J.s,
                h: k.j(""),
                m: J.id === 0 ? 0 : 1
            });
            q("Ecn").onchange = function () { this.h = cnch(this.h) };
            q("Efs").onchange = fsch;
            k = q("_w_D");
            if (k) k.onclick = del;
            q("_w_F").onsubmit = () => up();
        },

        del: S => {
            let k = 0;

            S = !S ? "t" : S;
            k = document.querySelector(".VB" + S);
            if (k) k.parentNode.removeChild(k);
            k = document.querySelector(".VF" + S);
            if (k) k.parentNode.removeChild(k);
        },

        adi: S => {
            let x = 0, y = 0, s = document.querySelector(".VF" + S);

            if (s) {
                x = (window.innerWidth - s.offsetWidth) / 2;
                y = (window.innerHeight - s.offsetHeight) / 2 - 40;
                if (x < 0) x = 0;
                if (y < 0) y = 0;
                s.style.left = x + "px";
                s.style.top = y + "px";
            }
        },

        mv: {
            o: 0, b: 0, tx: 0, ty: 0, mx: 0, my: 0, f: 0,
            m: function (e) {
                this.o = document.querySelector(".VFt");
                this.b = document.querySelector(".VBt");
                this.b.onmousemove = this.o.onmousemove = () => { v.mv.v(event) };
                this.b.onmouseup = this.o.onmouseup = () => { v.mv.u(event) };
                this.tx = this.o.offsetLeft;
                this.ty = this.o.offsetTop;
                this.mx = e.clientX;
                this.my = e.clientY;
            },
            d: function (e) {
                e.preventDefault();
                this.m(e);
                this.f = 1;
            },
            v: function (e) {
                let x = e.clientX, y = e.clientY;
                e.preventDefault();
                if (this.f) {
                    this.o.style.left = parseInt(this.tx) + parseInt(x) - parseInt(this.mx) + "px";
                    this.o.style.top = parseInt(this.ty) + parseInt(y) - parseInt(this.my) + "px";
                }
            },
            u: function (e) {
                if (this.f) {
                    let x = e.clientX, y = e.clientY;
                    this.o.style.left = parseInt(this.tx) + parseInt(x) - parseInt(this.mx) + "px";
                    this.o.style.top = parseInt(this.ty) + parseInt(y) - parseInt(this.my) + "px";
                    this.o.style.cursor = "default";
                    this.b.onmousemove = this.o.onmousemove = null;
                    this.b.onmouseup = this.o.onmouseup = null;
                    this.f = 0;
                }
            }
        }
    };

    window.v = v;
})();
