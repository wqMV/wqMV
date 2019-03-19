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
		/*
		m.r(q("wNav"), {
			"菜单a": "alert('a')",
			"菜单b": "alert('b')",
			"菜单c": "alert('c')"
		});
		*/
		m.b(q("_w_Mb"), {
			"菜单一": "alert('一')",
			"菜单二": "alert('二')",
			"菜单三": "alert('三')"
		});

		ed(document.getElementById("_w_Edr"));
	},

	to: () => {
		q("wIcon").onclick = () => {
			let h = q("wMenu");
			h.c = "_M_dh";
			q("@TIME", h).for(e => { e.c = "dh" });
			q("@SPAN", h).for(e => { e.c = "dh" });
			h = q("wLink");
			h.c = "_M_dh";
			q("@TIME", h).for(e => { e.c = "dh" });
			q("@A", h).for(e => { e.c = "dh" });
		};
		wq.box();
	},

	go: () => {
		//const ut = m.ut();
		//q("wTime").h = ut.y + "年 " + ut.n + "月 " + ut.d + "日 星期" + ut.w;
		setTimeout(wq.to, 127);
	}
};
try { window.onload = wq.go } catch (e) { }
