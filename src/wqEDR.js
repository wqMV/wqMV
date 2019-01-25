(() => {
	const ed = O => {
		const be = ["sour", "draf",
			"clea", "move",
			"bold", "ital", "unde", "stri", "supe", "subs",
			"unor", "orde",
			"left", "cent", "righ",
			"link", "imag", "vide",
			"full",
		], bc = ["源代码", "读草稿",
			"清空文档", "清除格式",
			"加粗", "斜体", "下划线", "删除线", "上标", "下标",
			"无序列表", "有序列表",
			"左对齐", "居中对齐", "右对齐",
			"链接", "图片", "视频",
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
			k.p(`<select id="_wqE${e}" onchange="ed.s('${e}')">`);
			k.p(`<option value="" selected>${n}</option>`);
			for (const i in j) k.p(`<option value="${i}">${j[i]}</option>`);
			k.p(`</select>`);
			return k.j("");
		},
			p = n => `<div class="ed_btn ${be[n]}" onmousedown="return false" title="${bc[n]}"><div class="${be[n]} icon" onclick="ed.e('${bx[n]}')"></div></div>`,
			s = () => `<div class="ed_btn sept"></div>`;
		let h = [];

		h.p(`<style type="text/css">\n`);
		h.p(`#_wqEt { padding: 5px 10px; border-top: 1px solid silver; border-left: 1px solid silver; border-right: 1px solid silver; border-radius: 5px 5px 0 0; box-shadow: 2px 2px 2px gray }\n`);
		h.p(`#_wqEr { padding: 10px; height: 12rem; overflow-y: scroll; outline: none; border: 1px solid silver; box-shadow: 2px 2px 2px gray }\n`);
		h.p(`#_wqEt select { margin: 0 5px; padding: 2px; border-radius: 3px }\n`);
		h.p(`#_wqEt > div { display:inline-block }\n`);
		h.p(`.ed_ful { position: absolute; top: 0; left: 0; background: #000 }\n`);
		h.p(`.ed_ful > div { background: snow }\n`);
		h.p(`.ed_btn { display:inline-block; margin: 0 1px; padding: 1px; vertical-align: middle }\n`);
		h.p(`.sept { width: 2px; height: 20px; background: url("img/ed.png") -380px 0 }\n`);
		h.p(`.icon { width: 20px; height: 20px; border: 1px solid transparent; background-repeat: no-repeat; background:url("img/ed.png") }\n`);
		h.p(`.icon:hover, .icon:active { border: 1px solid #28d; background-color: #cff }\n`);
		for (var i = 0; i < be.length; i++) h.p(`.${be[i]} { background-position: -${i * 20}px 0 }\n`);
		h.p(`</style>\n`);
		h.p(`<div id="_wqEt" unselectable="on" ><div>`);
		for (var i = 0; i < 2; i++) h.p(p(i));
		h.p(s());
		for (var i = 2; i < 4; i++) h.p(p(i));
		h.p(s());
		h.p(c("forecolor", "前景", cl));
		h.p(c("backcolor", "背景", cl));
		h.p(s());
		h.p(c("formatblock", "段落", {
			div: "正文",
			p: "段落",
			h1: "标题1",
			h2: "标题2",
			h3: "标题3"
		}));
		h.p(c("fontsize", "大小", {
			"1": "很小",
			"2": "小",
			"3": "正常",
			"4": "大",
			"5": "很大",
			"6": "特大",
			"7": "最大"
		}));
		h.p(s());
		h.p(`</div><div onmousedown="return false">`);
		for (var i = 4; i < 10; i++) h.p(p(i));
		h.p(s());
		for (var i = 10; i < 12; i++) h.p(p(i));
		h.p(s());
		for (var i = 12; i < 15; i++) h.p(p(i));
		h.p(s());
		for (var i = 15; i < 18; i++) h.p(p(i));
		h.p(s());
		h.p(p(18));
		h.p(`</div></div>`);
		h.p(`<div id="_wqEr" contenteditable="true" tabindex="0"></div>`);
		O.style["text-align"] = "left";
		O.style["padding"] = "5px";
		O.innerHTML = h.join("");
		ed.o = O;
		ed.g = document.getElementById("_wqEr");
		ed.g.focus();
	};

	ed.o = 0;
	ed.g = 0;
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
		let k = document.getSelection(),
			x = k.anchorOffset,
			y = k.focusOffset;
		console.log(k);
		console.log(k.extentNode.parentNode.tagName);
		v.c(`链接地址：<input id="eElink" type="text">`, () => {
			let s = document.getElementById("eElink").value,
				r = x > y ? x : y;
			x = x > y ? y : x;
			y = r;
			v.del("c");
			r = document.createRange();
			k = ed.g.firstChild;
			r.selectNode(k);
			r.setStart(k, x);
			r.setEnd(k, y);
			k = document.getSelection();
			k.addRange(r);
			document.execCommand("insertHTML", false, `<a href="${s}" target="_blank">${k}</a>`);

		});
	};
	ed.imag = () => { alert("imag") };
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
