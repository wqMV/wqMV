"use strict";
(() => {
    const ed = O => {
        const h = [];
        h.push(`<div id="wqEDR" class="wqEDc"><div class="wqEDt" unselectable="on" onmousedown="return false">`);
        for (let i = 0, ct = ed.bt.length; i < ct; i++) {
            for (let j = 0; j < ed.bt[i].length; j++) {
                h.p(`<div class="wqEDi ef" title="${ed.bt[i][j].cn}"`);
                if (ed.bt[i][j].t === 1) h.p(` onclick="ed.${ed.bt[i][j].en}()"`);
                else if (ed.bt[i][j].t === 2) h.p(` onclick="ed.e('${ed.bt[i][j].en}')"`);
                else h.p(` onclick="ed.ov(${i},${j},this)"`);
                h.p(`>${ed.bt[i][j].im}</div >`);
            }
            if (i < ct - 1) h.p(`<div class="wqEDs ef">&#xe606;</div>`);
        }
        h.push(`</div>`);
        h.push(`<div id="wqEDe" style="height: 12rem" tabindex="0" contenteditable></div></div>`);

        O.innerHTML = h.join("");
        ed.o = document.getElementById("wqEDR");
        ed.g = document.getElementById("wqEDe");
        ed.g.onpaste = e => {
            document.execCommand('insertText', false, e.clipboardData.getData("Text"));
            return false;
        };
    };

    ed.cl = {
        "crimson": "红色",
        "seagreen": "绿色",
        "#28d": "蓝色",
        "#aee": "青色",
        "#eae": "粉色",
        "#eea": "黄色"
    };
    ed.bt = [
        [
            {
                en: "clear",
                cn: "清空文档",
                im: "&#xe7bb;",
                t: 1
            },
            {
                en: "removeformat",
                cn: "清除格式",
                im: "&#xe61a;",
                t: 2
            }
        ],
        [
            {
                en: "forecolor",
                cn: "前景色",
                im: "&#xe7fc;",
                t: 3,
                l: ed.cl
            },
            {
                en: "backcolor",
                cn: "背景色",
                im: "&#xe802;",
                t: 4,
                l: ed.cl
            },
            {
                en: "fontsize",
                cn: "大小",
                im: "&#xe7fe;",
                t: 5,
                l: {
                    "1": "很小",
                    "2": "小",
                    "3": "正常",
                    "4": "大",
                    "5": "很大",
                    "6": "特大",
                    "7": "最大"
                }
            },
            {
                en: "style",
                cn: "样式",
                im: "&#xe7ff;",
                t: 6,
                l: {
                    bold: ["&#xe7fb;", "粗体"],
                    italic: ["&#xe801;", "斜体"],
                    underline: ["&#xe800;", "下划线"],
                    strikethrough: ["&#xe7ff;", "删除线"]
                }
            }
        ],
        [
            {
                en: "formatblock",
                cn: "排版",
                im: "&#xe7fa;",
                t: 5,
                l: {
                    div: "正文",
                    p: "段落",
                    h1: "标题1",
                    h2: "标题2",
                    h3: "标题3"
                }
            },
            {
                en: "list",
                cn: "列表",
                im: "&#xe7f5;",
                t: 6,
                l: {
                    insertunorderedlist: ["&#xe7f5;", "无序列表"],
                    insertorderedlist: ["&#xe7f6;", "有序列表"]
                }
            },
            {
                en: "just",
                cn: "对齐",
                im: "&#xe7f8;",
                t: 6,
                l: {
                    justifyleft: ["&#xe7f9;", "左对齐"],
                    justifycenter: ["&#xe7f8;", "居中对齐"],
                    justifyright: ["&#xe7f7;", "右对齐"]
                }
            }
        ],
        [
            {
                en: "look",
                cn: "表情",
                im: "&#xe603;",
                t: 7,
                l: {
                    "1": {
                        "广播": "&#xe602;",
                        "引用": "&#xec81;",
                        "沙发": "&#xe601;",
                        "爱心": "&#xe60b;"
                    },
                    "2": {
                        "眨眼": "&#xe603;",
                        "卖萌": "&#xe60a;",
                        "亲亲": "&#xe609;",
                        "发呆": "&#xe608;"
                    },
                    "3": {
                        "尴尬": "&#xe600;",
                        "吃惊": "&#xe604;",
                        "生气": "&#xe607;",
                        "哭脸": "&#xe605;"
                    }
                }
            },
            {
                en: "link",
                cn: "增/删链接",
                im: "&#xe7e2;",
                t: 1
            },
            {
                en: "image",
                cn: "图片",
                im: "&#xe7de;",
                t: 1
            }
        ],
        [
            {
                en: "full",
                cn: "全屏",
                im: "&#xe7ec;",
                t: 1
            }
        ]
    ];

    ed.ov = (S, N, O) => {
        let lf = () => ({ x: O.offsetLeft - 8, y: O.offsetTop + O.offsetHeight + 10 }),
            h = document.getElementById("wqEDb"), o = ed.bt[S][N], xy = lf();

        O.className = "wqEDh ef";
        if (h) ed.dl();
        else {
            h = [];
            h.push(`<div id="wqEDb"></div>`);
            h.push(`<div id="wqEDf" style="position: absolute; left: ${xy.x}px; top: ${xy.y}px" unselectable="on" onmousedown="return false">`);
            for (const i in o.l) {
                switch (o.t) {
                    case 3:
                        h.push(`<li onclick="ed.s('${o.en}','${i}')" style="color: ${i}">${o.l[i]}</li>`);
                        break;
                    case 4:
                        h.push(`<li onclick="ed.s('${o.en}','${i}')" style="background: ${i}">${o.l[i]}</li>`);
                        break;
                    case 5:
                        h.push(`<li onclick="ed.s('${o.en}','${i}')">${o.l[i]}</li>`);
                        break;
                    case 6:
                        h.push(`<li onclick="ed.e('${i}')"><span class="ef">${o.l[i][0]}</span><span> ${o.l[i][1]}</span></li>`);
                        break;
                    case 7:
                        h.push('<div>');
                        for (const j in o.l[i])
                            h.push(`<span class="ef" style="padding: 0 3px" title="${j}" onclick="ed.s('insertHTML','<b class=sf>${o.l[i][j]}</b>')">${o.l[i][j]}</span>`);
                        h.push('</div>');
                        break;
                }
            }
            h.push(`</div>`);
            document.getElementById("wqEDR").insertAdjacentHTML("beforeEnd", h.join(""));
            document.getElementById("wqEDb").onclick = document.getElementById("wqEDf").onmouseleave = ed.dl;
        }
    };

    ed.dl = () => {
        let k = document.getElementById("wqEDb");
        if (k) k.parentElement.removeChild(k);
        k = document.getElementById("wqEDf");
        if (k) k.parentElement.removeChild(k);
        k = document.querySelector(".wqEDh");
        if (k) k.className = "wqEDi ef";
    };
    ed.fr = (H, C) => {
        let x = 0, y = 0, k = document.getElementById("wqEDb");
        if (k) ed.dl();
        else {
            k = [];
            k.push(`<div id="wqEDb"></div>`);
            k.push(`<div id="wqEDf">`);
            k.push(`<div id="wqEDti">${H}</div>`);
            k.push(`<div style="padding: 5px 1rem 0 1rem; text-align: right">`);
            k.push(`<input id ="wqEDok" type="button" value="确定">`);
            k.push(`<input type="button" onclick="ed.dl()" value="关闭">`);
            k.push(`</div></div>`);
            document.body.insertAdjacentHTML("beforeEnd", k.join(""));
            document.getElementById("wqEDok").onclick = () => { if (typeof C == "function") C() };
            k = document.getElementById("wqEDti").children[0];
            if (k.tagName === "INPUT") {
                k.focus();
                k.select();
            }
            k = document.getElementById("wqEDf");
            if (k) {
                x = (window.innerWidth - k.offsetWidth) / 2;
                y = (window.innerHeight - k.offsetHeight) / 2 - 30;
                if (x < 0) x = 0;
                if (y < 0) y = 0;
                k.style.left = x + "px";
                k.style.top = y + "px";
            }
        }
    };
    ed.im = C => {
        const imch = e => {
            let k = document.getElementById("Ecanv"),
                f = e.target,
                x = f.width, y = f.height;
            e = x / y;
            if (x > 400) x = 400, y = parseInt(400 / e);
            k.width = x;
            k.height = y;
            k = k.getContext("2d");
            k.fillStyle = "#fff";
            k.fillRect(0, 0, x, y);
            k.drawImage(f, 0, 0, x, y);
            k.font = "14px Tahoma";
            k.fillStyle = "rgba(255, 255, 255, .6)";
            k.fillText(`@${location.host}`, x - 200, y - 20);
        }, fsch = () => {
            let f = document.getElementById("Eimag").files[0];
            if (f) {
                const fr = new FileReader();
                fr.onload = e => {
                    if (f.size > 5119999) {
                        alert(`上传图片大小不能超过 5 MB！`);
                        document.getElementById("Eimag").value = "";
                    } else {
                        f = new Image();
                        f.onload = imch;
                        f.src = e.target.result;
                    }
                };
                fr.readAsDataURL(f);
            }
        };
        ed.fr(`上传图片：<input id="Eimag" type="file" accept="image/*"><div style="padding: .5rem"><canvas id="Ecanv" style="width: 400px; height: 225px"></canvas></div>`, C);
        document.getElementById("Eimag").onchange = fsch;
    };

    // H Html
    ed.ht = H => {
        let k = document.createElement("div");
        k.textContent = H;
        return k.innerHTML;
    };
    // T Text
    ed.hh = T => {
        let k = document.createElement("div");
        k.innerHTML = T;
        return k.textContent;
    };

    ed.o = 0;
    ed.g = 0;
    ed.v = () => ed.ht(document.getElementById("wqEDe").innerHTML);
    ed.p = T => { document.getElementById("wqEDe").innerHTML = ed.hh(T) };

    ed.r = () => {
        let k = window.getSelection(), r = 0, u = 0;
        if (k.type === "None") return 1;
        r = k.focusNode;
        for (; r; r = r.parentNode) if (r.id === "wqEDe") break;
        if (!r) return 1;
        r = k.getRangeAt(0);
        u = r.commonAncestorContainer.parentNode.getAttribute("href");
        return { k: k, r: r, c: r.collapsed, u: u ? u : "" };
    };
    ed.e = c => {
        ed.dl();
        document.execCommand(c, true, null);
    };
    ed.s = (c, s) => {
        ed.dl();
        document.execCommand(c, false, s);
    };

    ed.clear = () => { ed.g.innerHTML = "" };
    ed.link = () => {
        let k = ed.r();
        if (k == 1 || k.c) return;
        ed.fr(`链接地址：<input id="wqElink" type="text" value="${k.u}">`, () => {
            let s = document.getElementById("wqElink").value;
            ed.dl();
            k.k.removeAllRanges();
            k.k.addRange(k.r);
            k = k.k.toString();
            if (s) document.execCommand("insertHTML", false, `<a href="${s}" target="_blank">${k}</a>`);
            else document.execCommand("unlink", false, null);
        });
    };
    ed.image = () => {
        let k = ed.r();
        if (k == 1) return;
        ed.im(() => {
            let s = document.getElementById("Ecanv");
            s = s.toDataURL('image/jpeg', 0.62);
            ed.dl();
            k.k.removeAllRanges();
            k.k.addRange(k.r);
            if (s) document.execCommand("insertHTML", false, `<img src="${s}">`);
        });
    };
    ed.full = () => {
        if (ed.o.className === "wqEDw") {
            ed.o.className = "wqEDc";
            ed.g.style.height = "12rem";
        } else {
            ed.o.className = "wqEDw";
            ed.g.style.height = "";
        }
    };

    window.ed = ed;
})();
