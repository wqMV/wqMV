const wq = {
	f: () => {
		w.f({
			id: 1, ph: 0, cn: 0, h: 1, t: 1, s: 2, dc: () => {
				b = document.getElementById("_w_FO");
				console.log(b);
			}, uc: () => {
				v.del();
			}
		});

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

		m.u(q("wLink"), "友情链接", {
			c: "&#xeb99;",
			"链接 1": "1.html",
			"链接 2": "1.html",
			"链接 3": "1.html",
			"链接 4": "1.html"
		});
		m.d(q("wMenu"), {
			"主菜单一": {
				c: "&#xe87b;",
				"子菜单 1": "console.log('1')",
				"子菜单 2": "alert('2')",
				"子菜单 3": "alert('3')",
				"子菜单 4": "alert('4')"
			}, "主菜单二": {
				c: "&#xe882;",
				"子菜单 1": "alert('1')",
				"子菜单 2": "alert('2')",
				"子菜单 3": "alert('3')",
				"子菜单 4": "alert('4')"
			}, "主菜单三": {
				c: "&#xeb95;",
				"子菜单 1": "alert('1')",
				"子菜单 2": "alert('2')",
				"子菜单 3": "alert('3')",
				"子菜单 4": "alert('4')"
			}, "主菜单四": {
				c: "&#xeb9c;",
				"子菜单 1": "alert('1')",
				"子菜单 2": "alert('2')",
				"子菜单 3": "alert('3')",
				"子菜单 4": "alert('4')"
			}
		});

		m.r(q("wNav"), {
			"菜单a": "alert('a')",
			"菜单b": "alert('b')",
			"菜单c": "alert('c')"
		});

		m.l(q("_w_Mb"), {
			"菜单一": "alert('一')",
			"菜单二": "alert('二')",
			"菜单三": "alert('三')"
		});

		m.m({ e: q("wMain"), id: "Rmode", t: "模块一", c: "d1", m: 1 });

		//ed(document.getElementById("_w_Edr"));
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
			q("wLink").c = "_M_dh";
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
