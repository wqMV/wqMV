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
		m.u(q("wLink"), "友情链接", {
			"链接 1": "1.html",
			"链接 2": "1.html",
			"链接 3": "1.html",
			"链接 4": "1.html"
		});
		m.d(q("wMenu"), {
			"主菜单一": {
				"子菜单 1": "alert('1')",
				"子菜单 2": "alert('2')",
				"子菜单 3": "alert('3')",
				"子菜单 4": "alert('4')"
			}, "主菜单二": {
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
		m.b(q("_w_Mb"), {
			"菜单一": "alert('一')",
			"菜单二": "alert('二')",
			"菜单三": "alert('三')"
		});
		*/

		q("oD", {
			d: { ta: "a" },
			c: function () {
				console.log(this);
				this.ta = "aaa";
			}
		});

	},
	go: () => {
		const ut = m.ut();
		q("wTime").h = ut.y + "年 " + ut.n + "月 " + ut.d + "日 星期" + ut.w;
		setTimeout(wq.box, 200);
	}
};
try { window.onload = wq.go } catch (e) { }
