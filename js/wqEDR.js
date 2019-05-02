"use strict";
(() => {
    const ed = O => {
        const be = ["sour", "draf",
            "clea", "move",
            "bold", "ital", "unde", "stri", "supe", "subs",
            "unor", "orde",
            "left", "cent", "righ",
            "link", "imag",
            "full",
        ], bc = ["视图/源码", "读/写草稿",
            "清空文档", "清除格式",
            "粗体", "斜体", "下划线", "删除线", "上标", "下标",
            "无序列表", "有序列表",
            "左对齐", "居中对齐", "右对齐",
            "增/删链接", "图片",
            "全屏"
        ], bx = ["_sour", "_draf",
            "_clea", "removeformat",
            "bold", "italic", "underline", "strikethrough", "superscript", "subscript",
            "insertunorderedlist", "insertorderedlist",
            "justifyleft", "justifycenter", "justifyright",
            "_link", "_imag",
            "_full"
        ], cl = {
            "crimson": "红色",
            "seagreen": "绿色",
            "#28d": "蓝色",
            "#aee": "青色",
            "#eae": "粉色",
            "#eea": "黄色"
        }, c = (e, n, j) => {
            let k = [];
            k.push(`<select id="wqED${e}" onchange="ed.s('${e}')">`);
            k.push(`<option value="" selected>${n}</option>`);
            for (const i in j) k.push(`<option value="${i}">${j[i]}</option>`);
            k.push(`</select>`);
            return k.join("");
        },
            p = n => `<div class="wqEDbtn ${be[n]}" onmousedown="return false" title="${bc[n]}"><div class="${be[n]} icon" onclick="ed.e('${bx[n]}')"></div></div>`,
            s = () => `<div class="wqEDbtn sept"></div>`;
        let h = [];

        h.push(`<div id="wqEDt" unselectable="on"><div>`);
        for (var i = 0; i < 2; i++) h.push(p(i));
        h.push(s());
        for (var i = 2; i < 4; i++) h.push(p(i));
        h.push(s());
        h.push(c("forecolor", "前景", cl));
        h.push(c("backcolor", "背景", cl));
        h.push(s());
        h.push(c("formatblock", "段落", {
            div: "正文",
            p: "段落",
            h1: "标题1",
            h2: "标题2",
            h3: "标题3"
        }));
        h.push(c("fontsize", "大小", {
            "1": "很小",
            "2": "小",
            "3": "正常",
            "4": "大",
            "5": "很大",
            "6": "特大",
            "7": "最大"
        }));
        h.push(s());
        h.push(`</div><div onmousedown="return false">`);
        for (var i = 4; i < 10; i++) h.push(p(i));
        h.push(s());
        for (var i = 10; i < 12; i++) h.push(p(i));
        h.push(s());
        for (var i = 12; i < 15; i++) h.push(p(i));
        h.push(s());
        for (var i = 15; i < 17; i++) h.push(p(i));
        h.push(s());
        h.push(p(17));
        h.push(`</div></div>`);
        h.push(`<div id="wqEDR" contenteditable="true" tabindex="0"></div>`);
        O.style["text-align"] = "left";
        O.style["padding"] = "5px";
        O.innerHTML = h.join("");
        ed.o = O;
        ed.g = document.getElementById("wqEDR");
        ed.g.onpaste = e => {
            document.execCommand('insertText', false, e.clipboardData.getData("Text"));
            return false;
        };
    };

    ed.o = 0;
    ed.g = 0;

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

    ed.d = () => {
        let k = document.getElementById("wqEDb");
        if (k) k.parentElement.removeChild(k);
        k = document.getElementById("wqEDc");
        if (k) k.parentElement.removeChild(k);
    };
    ed.c = (H, C) => {
        let x = 0, y = 0, k = document.getElementById("wqEDb");
        if (k) ed.d();
        else {
            k = [];
            k.push(`<div id="wqEDb"></div>`);
            k.push(`<div id="wqEDc">`);
            k.push(`<div id="wqEDf">${H}</div>`);
            k.push(`<div style="padding: 5px 1rem 0 1rem">`);
            k.push(`<input id ="wqEDok" type="button" value="确定">`);
            k.push(`<input type="button" onclick="ed.d()" value="关闭">`);
            k.push(`</div></div>`);
            document.body.insertAdjacentHTML("beforeEnd", k.join(""));
            document.getElementById("wqEDok").onclick = () => { if (typeof C == "function") C() };
            k = document.getElementById("wqEDf").children[0];
            if (k.tagName === "INPUT") {
                k.focus();
                k.select();
            }
            k = document.getElementById("wqEDc");
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
    ed.m = C => {
        const imch = e => {
            let k = document.getElementById("Ecanv"),
                f = e.target,
                x = f.width, y = f.height;
            e = x / y;
            if (x > 576) x = 576, y = parseInt(576 / e);
            k.width = x;
            k.height = y;
            k = k.getContext("2d");
            k.fillStyle = "#fff";
            k.fillRect(0, 0, x, y);
            k.drawImage(f, 0, 0, x, y);
            k.font = "20px Tahoma";
            k.fillStyle = "rgba(255,255,255,0.5)";
            k.fillText(`@${location.host}`, x - 200, y - 50);
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
        ed.c(`上传图片：<input id="Eimag" type="file" accept="image/*"><div style="padding: .5rem"><canvas id="Ecanv" style="width: 576px; height: 324px"></canvas></div>`, C);
        document.getElementById("Eimag").onchange = fsch;
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

    ed.sour = () => {
        let o = document.getElementById("wqEDx"),
            x = ed.g.clientWidth - 80, y = ed.g.clientHeight - 60, i = ed.g.innerHTML;
        if (o) {
            i = o.value;
            ed.g.innerHTML = i;
            ed.g.focus();
        } else {
            ed.g.innerHTML = `<textarea id="wqEDx" style="width: ${x}px; height: ${y}px">${i}</textarea>`;
            document.getElementById("wqEDx").focus();
        }
    };
    ed.draf = () => {
        let l = function () {
            let k = this.id, r = k.startsWith("_wqDr") ? 0 : 1, n = k.replace(/_wqDr|_wqDw/g, "");
            k = localStorage;
            if (r) {
                k.setItem("wqEDDn" + n, document.getElementById("_wqDn" + n).value);
                k.setItem("wqEDDt" + n, document.getElementById("wqEDR").innerHTML);
            } else {
                document.getElementById("wqEDR").innerHTML = k.getItem("wqEDDt" + n);
                document.getElementById("wqEDR").focus();
            }
            ed.d();
        }, h = [];
        h.push(`<div style="font-size: small; color: crimson">提示：草稿为客户端存储，不能保证数据的完整性，请您提前做好相关文档的备份。</div>`);
        for (let i = 1; i < 3; i++) {
            let s = localStorage.getItem("wqEDDn" + i);
            h.push(`<li>草稿${i}，文章名：`);
            h.push(`<input id="_wqDn${i}" style="width:12rem" type="text" value="${s ? s : ''}">`);
            h.push(`<input id="_wqDr${i}" type="button" value="读取">`);
            h.push(`<input id="_wqDw${i}" type="button" value="保存">`);
            h.push(`</li>`);
        }
        ed.c(h.join(""), () => { ed.d() });
        for (let i = 1; i < 3; i++) {
            document.getElementById("_wqDr" + i).onclick = l;
            document.getElementById("_wqDw" + i).onclick = l;
        }
        document.getElementById("_wqDn1").select();
    };
    ed.link = () => {
        let k = window.getSelection(), r = 0;
        if (k.type === "None") return;
        r = k.focusNode.parentNode;
        for (; r; r = r.parentNode) if (r.id === "wqEDR") break;
        if (!r) return;
        r = k.getRangeAt(0);
        if (r.collapsed) return;
        ed.c(`链接地址：<input id="wqElink" type="text">`, () => {
            let s = document.getElementById("wqElink").value;
            ed.d();
            k.removeAllRanges();
            k.addRange(r);
            r = k.toString();
            if (s) document.execCommand("insertHTML", false, `<a href="${s}" target="_blank">${r}</a>`);
            else document.execCommand("unlink", false, null);
        });
    };
    ed.imag = () => {
        let k = document.getSelection(), x = 0, y = 0;
        if (k.type === "None") return;
        k = k.getRangeAt(0);
        x = k.startOffset;
        y = k.endOffset;
        x = x > y ? x : y;
        ed.m(() => {
            let s = document.getElementById("Ecanv"),
                r = document.createRange();
            s = s.toDataURL('image/jpeg', 0.9);
            ed.d();
            k = k.commonAncestorContainer;
            r.selectNode(k);
            r.setEnd(k, x);
            k = document.getSelection();
            if (s) document.execCommand("insertHTML", false, `<div><img src="${s}"></div>`);
        });
    };
    ed.clea = () => { ed.e("selectall"); ed.e("delete"); };
    ed.full = () => {
        if (ed.o.className) {
            ed.o.className = "";
            ed.o.style.width = "";
            ed.g.style.height = "12rem";
        } else {
            ed.o.className = "wqEDful";
            ed.o.style.width = "calc(100vw - 10px)";
            ed.g.style.height = "calc(100vh - 72px)";
        }
    };

    window.ed = ed;
})();
