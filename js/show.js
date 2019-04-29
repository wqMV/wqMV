"use strict";
const sh = {
    pi: o => {
        w({
            d: { tp: "pish", nid: o },
            c: e => {
                let h = [];
                e = q.a(e);
                h.p(`<div class="bt p5t">评论：</div>`);
                for (const i of e) {
                    h.p(`<div class="m50">`)
                    h.p(`<div class="fs">作者：${i[2]}　时间：${i[3]}</div>`);
                    h.p(`<div class="p01 fs">${i[4]}</div>`);
                    h.p(`</div>`);
                    q("wPing").h = h.join("");
                }
            }
        });
    },

    up: () => {
        let nnr = q("wNnr").h;
        if (nnr) {
            w({
                d: { tp: "piup", nid: q("wNid").h, nnr: nnr, sid: q.s("sid"), uid: q.s("uid"), ucn: q.s("ucn") },
                c: e => {
                    if (e == 2) sh.pi(q("wNid").h);
                }
            });
        }
        else v.i({ t: "评论内容不能为空！", m: 1 });
    },

    li: o => {
        w({
            d: { tp: "xwsh", nid: o },
            c: e => {
                let h = [];
                e = q.a(e);
                if (e.length) {
                    m.m({
                        e: q("wMain"),
                        id: "Rxwsh",
                        t: `作者：${e[0][1]}　发布时间：${e[0][2]}`,
                        c: "d1",
                    });
                    h.p(`<div id="wNid" class="dh">${o}</div>`);
                    h.p(`<div class="fxl">标题：${e[0][3]}</div>`);
                    h.p(`<div class="m10 nr"><div>${e[0][4]}</div>`);
                    h.p(`<div id="wPing"></div></div>`);
                    h.p(`<div class="df vc bt"><span class="p5">评论：</span><textarea id="wNnr"></textarea>`);
                    h.p(`<div><input id="wHui" type="button" onclick="sh.up()" value="新增评论"></div></div>`);
                    q("Rxwsh").h = h.join("");
                    q("wNnr").onchange = m.ts;
                    sh.pi(o);
                }
            }
        });
    },

    to: () => {

    },

    go: () => {
        setTimeout(sh.to, 127);
    }
};
try { window.onload = sh.go } catch (e) { }
