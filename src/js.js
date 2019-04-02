"use strict";
const wq = {
	t: () => {
		v.t({
			t: "标题",
			s: "副标题",
			h: "HTML文本",
			m: 2
		});
	},
	i: () => { v.i({ t: "警告警告警告", m: 1 }) },
	it: () => { v.i({ t: "tipstipstips" }) },
	c: () => {
		v.c({
			h: "HTML文本<br>您确定吗？",
			c: () => { alert('提示') }
		});
	},
	l: () => {
		v.l();
	},
	f: () => {
		v.f({
			id: 1,
			ph: "",
			cn: "",
			h: "HTML文本",
			t: "上传文件",
			s: "副标题",
			dc: () => {
				v.del();
			},
			uc: () => {
				v.del();
				v.del("l");
			}
		});

	},


	lg: e => {
		let h = [];
		h.p(`<div class="in">`);
		h.p(`<b class="if g">&#xe7ae;</b>`);
		h.p(`<input placeholder="用户">`);
		h.p(`</div><br>`);
		h.p(`<div class="in m50">`);
		h.p(`<b class="if g">&#xe7c9;</b>`);
		h.p(`<input type="password" placeholder="密码">`);
		h.p(`</div>`);
		h.p(`<div class="tr"><input class="l" type="button" value="登录">`)
		h.p(`<input type="button" value="注册新用户"></div>`)
		v.p({ e: e, t: "用户登录：", h: h.j("") });
	},
	rm: e => {
		v.p({ e: e, t: "消息通知：", h: "消息通知" });
	},

	box: () => {
		/*
		q("wHome", {
			b: {
				tf: ["crimson", "seagreen", "#28d"]
			},
			d: {
				ta: "a",
				tf: ["fa", "fb", "fc"]
			},
			m: {
				to: (d, e) => { alert(d.tf) },
				fo: (d, e) => { console.log(e) }
			},
			c: d => {
				d.ta = "ta";
				d.tf = ["fa", "fb", "fc", "fd"];
			}
		});
		*/

		m.u({
			e: q("wLink"),
			t: "友情链接",
			l: {
				i: "&#xe633;",
				"链接 1": "1.html",
				"链接 2": "1.html",
				"链接 3": "1.html",
				"链接 4": "1.html"
			}
		});

		m.d({
			e: q("wMenu"),
			l: {
				"主菜单一": {
					i: "&#xe601;",
					"子菜单 1": "console.log('1')",
					"子菜单 2": "alert('2')",
					"子菜单 3": "alert('3')",
					"子菜单 4": "alert('4')"
				},
				"主菜单二": {
					i: "&#xe705;",
					"子菜单 1": "alert('1')",
					"子菜单 2": "alert('2')",
					"子菜单 3": "alert('3')",
					"子菜单 4": "alert('4')"
				},
				"主菜单三": {
					i: "&#xe673;",
					"子菜单 1": "alert('1')",
					"子菜单 2": "alert('2')",
					"子菜单 3": "alert('3')",
					"子菜单 4": "alert('4')"
				},
				"主菜单四": {
					i: "&#xe7fd;",
					"子菜单 1": "alert('1')",
					"子菜单 2": "alert('2')",
					"子菜单 3": "alert('3')",
					"子菜单 4": "alert('4')"
				}
			}
		});

		m.r({
			e: q("wNav"),
			l: {
				"菜单a": "alert('a')",
				"菜单b": "alert('b')",
				"菜单c": "alert('c')"
			}
		});

		m.l({
			e: q("_w_Mb"),
			id: "_w_M",
			l: {
				"菜单一": "alert('一')",
				"菜单二": "alert('二')",
				"菜单三": "alert('三')"
			}
		});

		m.m({
			e: q("wMain"),
			id: "Rmode1",
			t: "模块一",
			c: "d1",
			m: 1,
			l: {
				"菜单一": "alert('一')",
				"菜单二": "alert('二')",
				"菜单三": "alert('三')"
			}
		});

		m.m({ e: q("wMain"), id: "Rmode2", t: "模块二", c: "d100", w: "20rem", m: 1 });
		m.m({ e: q("wMain"), id: "Rmode3", c: "d100", m: 1 });

		q("_w_M").h = "HTML文本";
		//ed(document.getElementById("_w_Edr"));

		/*
		w({
			d: { typ: "test" },
			c: e => {
				alert(e);
			}
		});
		*/
	},

	mu: () => {
		let h = q("wIcon");
		if (h.g("dh") === "dh") {
			h.g("dh", "");
			q("wMenu").c = "";
			q("wLink").c = "bt m10";
		} else {
			h.g("dh", "dh");
			q("wMenu").c = "_M_dh";
			q("wLink").c = "_M_dh bt m10";
		};
	},

	go: () => {
		const ut = m.ut();
		q("wTime").h = ut.cn;
		q("wIcon").onclick = wq.mu;
		setTimeout(wq.box, 127);
	}
};
try { window.onload = wq.go } catch (e) { }
