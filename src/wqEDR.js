(() => {
	const ed = O => {
		const be = ["sour", "draf",
			"clea", "move",
			"bold", "ital", "unde", "stri", "supe", "subs",
			"unor", "orde",
			"left", "cent", "righ",
			"link", "imag", "vide",
			"full",
		], bc = ["视图/源码", "读/写草稿",
			"清空文档", "清除格式",
			"粗体", "斜体", "下划线", "删除线", "上标", "下标",
			"无序列表", "有序列表",
			"左对齐", "居中对齐", "右对齐",
			"增/删链接", "图片", "视频",
			"全屏"
		], bx = ["_sour", "_draf",
			"_clea", "removeformat",
			"bold", "italic", "underline", "strikethrough", "superscript", "subscript",
			"insertunorderedlist", "insertorderedlist",
			"justifyleft", "justifycenter", "justifyright",
			"_link", "_imag", "_vide",
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
			k.push(`<select id="_wqE${e}" onchange="ed.s('${e}')">`);
			k.push(`<option value="" selected>${n}</option>`);
			for (const i in j) k.push(`<option value="${i}">${j[i]}</option>`);
			k.push(`</select>`);
			return k.join("");
		},
			p = n => `<div class="ed_btn ${be[n]}" onmousedown="return false" title="${bc[n]}"><div class="${be[n]} icon" onclick="ed.e('${bx[n]}')"></div></div>`,
			s = () => `<div class="ed_btn sept"></div>`;
		let h = [];

		h.push(`<style type="text/css">\n`);
		h.push(`#_wqEb { position: absolute; z-index: 4001; height: 100vh; width: 100vw; top: 0; left: 0; margin: 0; opacity: 0.5; background: gray }`)
		h.push(`#_wqEc { position: absolute; z-index: 4002; padding: 5px 1rem; text-align: center; background: ivory; border: 1px solid silver; border-radius: 5px; box-shadow: 2px 5px 1rem gray }`)
		h.push(`#_wqEt { padding: 5px 10px; border-top: 1px solid silver; border-left: 1px solid silver; border-right: 1px solid silver; border-radius: 5px 5px 0 0; box-shadow: 2px 2px 2px gray }\n`);
		h.push(`#_wqEr { padding: 10px; height: 12rem; overflow-y: scroll; outline: none; border: 1px solid silver; box-shadow: 2px 2px 2px gray }\n`);
		h.push(`#_wqEt select { margin: 0 5px; padding: 2px; border-radius: 3px }\n`);
		h.push(`#_wqEt > div { display:inline-block }\n`);
		h.push(`.ed_ful { position: absolute; top: 0; left: 0; background: #000 }\n`);
		h.push(`.ed_ful > div { background: snow }\n`);
		h.push(`.ed_btn { display:inline-block; margin: 0 1px; padding: 1px; vertical-align: middle }\n`);
		h.push(`.sept { width: 2px; height: 20px; background: url("img/ed.png") -380px 0 }\n`);
		h.push(`.icon { width: 20px; height: 20px; border: 1px solid transparent; background-repeat: no-repeat; background:url("img/ed.png") }\n`);
		h.push(`.icon:hover, .icon:active { border: 1px solid #28d; background-color: #cff }\n`);
		for (var i = 0; i < be.length; i++) h.push(`.${be[i]} { background-position: -${i * 20}px 0 }\n`);
		h.push(`</style>\n`);
		h.push(`<div id="_wqEt" unselectable="on" ><div>`);
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
		for (var i = 15; i < 18; i++) h.push(p(i));
		h.push(s());
		h.push(p(18));
		h.push(`</div></div>`);
		h.push(`<div id="_wqEr" contenteditable="true" tabindex="0"></div>`);
		O.style["text-align"] = "left";
		O.style["padding"] = "5px";
		O.innerHTML = h.join("");
		ed.o = O;
		ed.g = document.getElementById("_wqEr");
		ed.g.focus();
	};

	ed.o = 0;
	ed.g = 0;
	ed.d = () => {
		let k = document.getElementById("_wqEb");
		if (k) k.parentElement.removeChild(k);
		k = document.getElementById("_wqEc");
		if (k) k.parentElement.removeChild(k);
	};
	ed.c = (H, C) => {
		let x = 0, y = 0, k = document.getElementById("_wqEb");
		if (k) ed.d();
		else {
			k = [];
			k.push(`<div id="_wqEb"></div>`);
			k.push(`<div id="_wqEc">`);
			k.push(`<div id="_wqEf">${H}</div>`);
			k.push(`<div style="padding: 5px 1rem 0 1rem">`);
			k.push(`<input id ="_wqEok" type="button" value="确定">`);
			k.push(`<input type="button" onclick="ed.d()" value="关闭">`);
			k.push(`</div></div>`);
			document.body.insertAdjacentHTML("beforeEnd", k.join(""));
			document.getElementById("_wqEok").onclick = () => { if (typeof C == "function") C() };
			k = document.getElementById("_wqEf").children[0];
			k.focus();
			k.select();
			k = document.getElementById("_wqEc");
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
		const fsch = () => {
			const f = document.getElementById("Eimag").files[0];
			if (f) {
				const fr = new FileReader();
				fr.onload = () => {
					if (f.size > 5119999) {
						alert(`上传文件大小不能超过 5 MB！`);
						document.getElementById("Eimag").value = "";
					}
				};
				fr.readAsDataURL(f);
			}
		};
		ed.c(`上传图片：<input id="Eimag" type="file" accept="image/*">`, C);
		document.getElementById("Eimag").onchange = fsch;
	};
	ed.e = c => {
		if (c.startsWith("_")) ed[c.replace("_", "")]();
		else document.execCommand(c, false, null);
	};
	ed.s = o => {
		let s = document.getElementById("_wqE" + o);
		ed.g.focus();
		document.execCommand(o, false, s.value);
		s.value = "";
	};

	ed.sour = () => {
		let o = document.getElementById("_wqEx"),
			x = ed.g.clientWidth - 80, y = ed.g.clientHeight - 60, i = ed.g.innerHTML;
		if (o) {
			i = o.value;
			ed.g.innerHTML = i;
			ed.g.focus();
		} else {
			ed.g.innerHTML = `<textarea id="_wqEx" style="width: ${x}px; height: ${y}px">${i}</textarea>`;
			document.getElementById("_wqEx").focus();
		}
	};
	ed.draf = () => { alert("draf") };
	ed.link = () => {
		let k = document.getSelection(), x = 0, y = 0;
		if (k.type === "None") return;
		k = k.getRangeAt(0);
		x = k.startOffset;
		y = k.endOffset;
		if (x === y) return;
		ed.c(`链接地址：<input id="Elink" type="text">`, () => {
			let s = document.getElementById("Elink").value,
				r = x > y ? x : y;
			x = x > y ? y : x;
			y = r;
			ed.d();
			r = document.createRange();
			k = k.commonAncestorContainer;
			r.selectNode(k);
			r.setStart(k, x);
			r.setEnd(k, y);
			k = document.getSelection();
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
		ed.c(`上传图片：<input id="Eimag" type="file" accept="image/*">`, () => {
			ed.d();
			r = document.createRange();
			k = k.commonAncestorContainer;
			r.selectNode(k);
			r.setStart(k, x);
			r.setEnd(k, x);
			k = document.getSelection();
			k.addRange(r);
		});
	};
	ed.vide = () => { alert("vide") };
	ed.clea = () => { ed.e("selectall"); ed.e("delete"); };
	ed.full = () => {
		if (ed.o.className) {
			ed.o.className = "";
			ed.o.style.width = "";
			ed.g.style.height = "12rem";
		} else {
			ed.o.className = "ed_ful";
			ed.o.style.width = "calc(100vw - 10px)";
			ed.g.style.height = "calc(100vh - 72px)";
		}
	};

	window.ed = ed;
})();
