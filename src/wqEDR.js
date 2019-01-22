(() => {
	const ed = O => {
		const be = ["sour", "clea", "move",
			"bold", "ital", "unde", "stri", "supe", "subs",
			"unor", "orde",
			"left", "cent", "righ", "just",
			"full"
		], bc = ["源代码", "清空文档", "清除格式",
			"加粗", "斜体", "下划线", "删除线", "上标", "下标",
			"无序列表", "有序列表",
			"左对齐", "居中对齐", "右对齐", "两端对齐",
			"全屏"
		], bx = ["sour", "clea", "removeformat",
			"bold", "italic", "underline", "strikethrough", "superscript", "subscript",
			"insertunorderedlist", "insertorderedlist",
			"justifyleft", "justifycenter", "justifyright", "justifyfull",
			"full"
		], cl = {
			"#f00": "红色",
			"#0f0": "绿色",
			"#00f": "蓝色",
			"#0ff": "青色",
			"#f0f": "粉色",
			"#ff0": "黄色"
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
		h.p(`#_wqEt { padding: 5px 10px; border-top: 1px solid #999; border-left: 1px solid #999; border-right: 1px solid #999; border-radius: 5px 5px 0 0; box-shadow: 2px 2px 2px #666 }\n`);
		h.p(`#_wqEr { padding: 10px; height: 12rem; overflow-y: scroll; outline: none; border: 1px solid #999; box-shadow: 2px 2px 2px #666 }\n`);
		h.p(`#_wqEt select { margin: 0 5px; padding: 2px; border-radius: 3px }\n`);
		h.p(`#_wqEt > div { display:inline-block }\n`);
		h.p(`.ed_ful { position: absolute; top: 0; left: 0; background: #000 }\n`);
		h.p(`.ed_ful > div { background: snow }\n`);
		h.p(`.ed_btn { display:inline-block; margin: 0 1px; padding: 1px; vertical-align: middle }\n`);
		h.p(`.sept { width: 2px; height: 20px; background: url("img/ed.png") -400px 0 }\n`);
		h.p(`.icon { width: 20px; height: 20px; border: 1px solid transparent; background-repeat: no-repeat; background:url("img/ed.png") }\n`);
		h.p(`.icon:hover, .icon:active { border: 1px solid #28d; background-color: #cff }\n`);
		for (var i = 0; i < be.length; i++) h.p(`.${be[i]} { background-position: -${i * 20}px 0 }\n`);
		h.p(`</style>\n`);
		h.p(`<div id="_wqEt" unselectable="on" ><div>`);
		for (var i = 0; i < 3; i++) h.p(p(i));
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
		h.p(`</div><div onmousedown="return false">`);
		for (var i = 3; i < 9; i++) h.p(p(i));
		h.p(s());
		for (var i = 9; i < 11; i++) h.p(p(i));
		h.p(s());
		for (var i = 11; i < 15; i++) h.p(p(i));
		h.p(s());
		h.p(p(15));
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
		if (c == "sour") ed.sour();
		else if (c == "clea") ed.clea();
		else if (c == "full") ed.full();
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
