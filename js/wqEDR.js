"use strict";
(() => {
    const ed = O => {
        const h = [];
        h.push(`<div id="wqEDR" class="wqEDc"><div class="wqEDt" unselectable="on" onmousedown="return false">`);
        for (let i = 0, ct = ed.bt.length; i < ct; i++) {
            for (let j = 0; j < ed.bt[i].length; j++) {
                h.p(`<div class="wqEDi ef" title="${ed.bt[i][j].cn}"`);
                if (ed.bt[i][j].t === 1) h.p(` onclick="ed.e('${ed.bt[i][j].en}')"`);
                else if (ed.bt[i][j].t === 4) h.p(` onclick="ed.${ed.bt[i][j].en}()"`);
                else h.p(` onmouseover="ed.ov(${i},${j},${ed.bt[i][j].t})"`);
                h.p(`>${ed.bt[i][j].im}</div >`);
            }
            if (i < ct - 1) h.p(`<div class="wqEDs ef">&#xe606;</div>`);
        }
        h.push(`</div>`);
        h.push(`<div id="wqEDe" style="height: 12rem" tabindex="0" contenteditable></div></div>`);

        O.innerHTML = h.join("");
        ed.o = document.getElementById("wqEDR");;
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
                t: 4
            },
            {
                en: "removeformat",
                cn: "清除格式",
                im: "&#xe61a;",
                t: 1
            }
        ],
        [
            {
                en: "forecolor",
                cn: "前景色",
                im: "&#xe7fc;",
                t: 2,
                l: ed.cl
            },
            {
                en: "backcolor",
                cn: "背景色",
                im: "&#xe802;",
                t: 2,
                l: ed.cl
            },
            {
                en: "fontsize",
                cn: "大小",
                im: "&#xe7fe;",
                t: 2,
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
                t: 3,
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
                t: 3,
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
                t: 3,
                l: {
                    insertunorderedlist: ["&#xe7f5;", "无序列表"],
                    insertorderedlist2: ["&#xe7f6;", "有序列表"]
                }
            },
            {
                en: "just",
                cn: "对齐",
                im: "&#xe7f8;",
                t: 3,
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
                t: 4
            },
            {
                en: "link",
                cn: "增/删链接",
                im: "&#xe7e2;",
                t: 4
            },
            {
                en: "image",
                cn: "图片",
                im: "&#xe7de;",
                t: 4
            }
        ],
        [
            {
                en: "full",
                cn: "全屏",
                im: "&#xe7ec;",
                t: 4
            }
        ]
    ];

    ed.ov = (S, N, T) => {
        let o = ed.bt[S][N].l;
        console.log();
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

    ed.dl = () => {
        let k = document.getElementById("wqEDb");
        if (k) k.parentElement.removeChild(k);
        k = document.getElementById("wqEDf");
        if (k) k.parentElement.removeChild(k);
    };
    ed.fr = (H, C) => {
        let x = 0, y = 0, k = document.getElementById("wqEDb");
        if (k) ed.dl();
        else {
            k = [];
            k.push(`<div id="wqEDb"></div>`);
            k.push(`<div id="wqEDf">`);
            k.push(`<div id="wqEDti">${H}</div>`);
            k.push(`<div style="padding: 5px 1rem 0 1rem">`);
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
                y = (window.innerHeight - k.offsetHeight) / 2 - 20;
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

    ed.o = 0;
    ed.g = 0;

    ed.r = () => {
        let k = window.getSelection(), r = 0;
        if (k.type === "None") return 1;
        r = k.focusNode;
        for (; r; r = r.parentNode) if (r.id === "wqEDe") break;
        if (!r) return 1;
        r = k.getRangeAt(0);
        return { k: k, r: r, c: r.collapsed };
    };
    ed.e = c => {
        if (c.startsWith("_")) ed[c.replace("_", "")]();
        else document.execCommand(c, false, null);
    };
    ed.s = o => {
        let s = document.getElementById("wqED" + o);
        ed.g.focus();
        document.execCommand(o, false, s.value);
        s.value = "";
    };

    ed.clear = () => { ed.g.innerHTML = "" };
    ed.link = () => {
        let k = ed.r();
        if (k == 1 || k.c) return;
        ed.fr(`链接地址：<input id="wqElink" type="text">`, () => {
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
            s = s.toDataURL('image/jpeg', 0.9);
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
