/*!
 * wqMV.js v 1.0
 * (c) 2019 WangQiang
 * date: 2019-1-1
 */

"use strict";

// w
(() => {
	// C Callback, D formData, N Name, T Time, M Mode
	const w = (C, D, N, T, M) => {
		let wI, wT = 0,
			wF = window.location.origin + "/",

			wPT = () => {
				const k = new XMLHttpRequest();
				k.onreadystatechange = () => { if (k.readyState === 4) wT = k.responseText };
				k.open(M, wF, true);
				if (M === "GET") k.send();
				else k.send(D);
			},

			wOK = () => {
				// wT is true
				if (wT) {
					clearInterval(wI);
					if (C) C(wT);
				}
			},
			wON = function () {
				wPT();
				wI = setInterval(wOK, 127);
			},

			wRD = K => Math.floor(Math.random() * K * 89) + (K + 1) * 127;

		M = C === "GET" || D === "GET" || N === "GET" || T === "GET" ? "GET" : (M === "GET" ? M : "POST");
		T = typeof C === "number" ? C : (typeof D === "number" ? D : (typeof N === "number" ? N : (typeof T === "number" ? T : 0)));
		N = typeof C === "string" && C !== "GET" ? C : (typeof D === "string" && D !== "GET" ? D : (!N || typeof N !== "string" || N === "GET" ? "" : N));
		D = typeof C === "object" ? C : (!D || typeof D !== "object" ? 0 : D);
		C = !C || typeof C !== "function" ? 0 : C;

		wF += N;
		if (!N) wF += "ajax.aspx";
		setTimeout(wON, wRD(T));
	};

	// J Json: id, cn, ph path, t title, s subheading, h html, n number, uc up callback, dc del callback
	w.f = J => {
		const del = () => {
			v.c("您确定删除这个文件吗？", () => { J.dc() });
		}, up = () => {
			if (q("Efs").v) {
				v.c("您上传了新文件，原有文件将被覆盖！<br>您确定继续吗？", function () {
					q("Ein").h = "正在上传文件，请不要关闭当前窗口……";
					q("@INPUT", q("_w_F")).for(e => { e.g("disabled", "disabled") });
					J.uc();
					return false;
				});
			} else {
				J.uc();
				return false;
			}
			return false;
		}, cnch = () => {
			this.value = m.sp(this.value);
		}, fsch = () => {
			const k = q("Efs").files[0];
			if (k) {
				const fr = new FileReader();
				J.n = J.n ? parseInt(J.n * 1024000 - 1) : 20479999;
				fr.onload = () => {
					if (k.size > J.n) {
						v.i(`上传文件大小不能超过 ${parseInt((J.n + 1) / 1024000)} MB！`, 1);
						q("Efs").v = "";
					} else {
						q("Efl").v = "2";
						q("Ecn").v = m.sp(k.name);
					}
				};
				fr.readAsDataURL(k);
			}
		};

		let h = [];
		h.p(`<input name="id" type="hidden" value="${J.id}">`);
		h.p(`<input name="old" type="hidden" value="${J.ph}">`);
		h.p(`<input id="Efl" name="fl" type="hidden" value="1">`);
		if (J.h) h.p(J.h + "<br>");
		h.p(`<label>标题：<input id="Ecn" name="cn" type="text" style="width:24rem" required value="${J.cn}"></label>`);
		h.p(`<div style="padding:5px 0"><label>文件：<input id="Efs" name="fs" type="file" style="width:24rem"></label></div>`);
		h.p(`<div id="Ein" class="fs r tc">　</div>`);
		v.t(J.t, J.s, h.j(""), (J.id === 0 ? 0 : 1));
		q("Ecn").onchange = cnch;
		q("Efs").onchange = fsch;
		q("_w_D").onclick = del;
		q("_w_F").onsubmit = () => up();
	};

	window.w = w;
})();

// q
(() => {
	// S String, E Element
	const q = (S, E) => {
		let l = 0;
		const s = E => {
			if (!E.g) {
				E.g = (S, V) => {
					if (S && V) E.setAttribute(S, V);
					return E.getAttribute(S) || "";
				};
				E.t = E.textContent || "";
				Object.defineProperties(E, {
					c: {
						get: () => { return E.className || "" },
						set: S => { E.className = S }
					},
					h: {
						get: () => { return E.innerHTML || "" },
						set: S => { E.innerHTML = S }
					},
					v: {
						get: () => { return E.value || "" },
						set: S => { if (E.value !== "undefined") E.value = S }
					}
				});
			}
		};

		E = E || document.body;
		if (S.startsWith(".")) E = E.getElementsByClassName(S.substr(1));
		else if (S.startsWith(":")) E = document.getElementsByName(S.substr(1));
		else if (S.startsWith("@")) E = E.getElementsByTagName(S.substr(1));
		else if (S) E = document.getElementById(S);
		if (!E || (E && E.length === 0)) return;
		l = E.tagName === "SELECT" || E.tagName === "FORM" ? 0 : E.length;
		if (l) {
			let k = [];
			for (let i = 0; i < l; i++) k.push(E[i]);
			E = k;
			for (const i of E) s(i);
		} else s(E);

		// S String, A Any
		E.add = (S, A) => {
			const k = () => {
				if (l) for (const i of E) i.insertAdjacentHTML(S, A);
				else E.insertAdjacentHTML(S, A)
			};
			if (S && typeof A === "function") {
				if (l) for (const i of E) i.addEventListener(S, A, false);
				else E.addEventListener(S, A, false);
			} else {
				if (S === "be") S = "beforeEnd";
				else if (S === "ab") S = "afterBegin";
				else if (S === "bb") S = "beforeBegin";
				else if (S === "ae") S = "afterEnd";
				k();
			}
			return E;
		};


		// J Json or String
		E.css = J => {
			if (typeof J === "object") {
				if (l) for (const i of E) for (const j in J) i.style[j] = J[j];
				else for (const j in J) E.style[j] = J[j];
			} else E.className = J;
			return E;
		};

		E.del = () => {
			if (l) for (let i = 0; i < l; i++) E[0].parentElement.removeChild(E[0]);
			else E.parentElement.removeChild(E);
			return "";
		};

		// C Callback
		E.for = C => {
			if (l) for (const i of E) C(i);
			return E;
		};

		// C Callback, N keycode
		E.key = (C, N) => {
			const k = () => {
				N = N || 13;
				if (event.keyCode === N) {
					event.returnValue = false;
					if (typeof C === "function") C(event.target);
				}
			};
			if (l) for (const i of E) i.onkeydown = k;
			else E.onkeydown = k;
			return E;
		};
		return E;
	};

	// S String
	q.a = S => {
		if (typeof S === "string") {
			let k = [];
			S = S.split(";");
			for (const i of S) {
				const s = i.split(",");
				k[i] = [];
				for (const j of s) k[i].push(j);
			}
			S = k;
		} else S = [];
		return S;
	};

	// N Name, V Value, K Key 0 delete
	q.c = (N, V, K) => {
		let k = document.cookie;
		if (N && V) {
			let d = new Date();
			d.setDate(d.getDate() + K);
			document.cookie = escape(N) + "=" + escape(V) + (typeof K !== "number" ? "" : "; expires=" + d.toGMTString());
		} else if (N) {
			const r = new RegExp("(^| )" + N + "=([^;]*)(;|$)");
			if (k = k.match(r)) V = k[2];
			else V = "";
		}
		return (K === 0 ? "" : V);
	};

	// J Json
	q.d = J => {
		let k = new FormData();
		for (const i in J) k.append(i, J[i]);
		return k;
	};

	// S String
	q.j = S => typeof S === "string" ? JSON.parse(`{${S}}`) : JSON.stringify(S);

	// N Name, C Callback, T Time
	q.m = (N, C, T) => {
		let k, s;
		if (!N) return;
		T = typeof C === "number" ? C : (T ? T : 127);
		k = document.getElementById("_w_" + N);
		s = () => { if (typeof C === "function") setTimeout(C, T) };
		if (!k) {
			k = document.createElement("script");
			k.type = "text/JavaScript";
			k.id = "_w_" + N;
			if ("onload" in k) k.onload = () => { s() }
			else k.onreadystatechange = () => { if (/loaded|complete/.test(k.readyState)) s() }
			k.src = "src/" + N + ".js";
			document.body.insertAdjacentElement("beforeEnd", k);
		} else s();
	};

	// N Name, V Value 0 delete
	q.s = (N, V) => {
		const k = sessionStorage;
		if (V === 0) k.removeItem(N);
		else if (V) k.setItem(N, V);
		return k.getItem(N);
	};

	Array.prototype.p = Array.prototype.push;
	Array.prototype.j = Array.prototype.join;
	window.q = q;
})();

// M
(() => {
	// O Object, J Json, F Function
	const m = {
		c: function (O, J) {
			var a = [],
				o = function (O) {
					a = q("#wqMC").E;
					a = q("A", a).E;
					for (var i = 0; i < a.length; i++) {
						a[i].style.color = "";
						a[i].style.background = "";
					}
					O.style.color = "#ddd";
					O.style.background = "#c03";
					O = a = null;
				};
			q.p(a, "<ul id=\"wqMC\">");
			for (var i in J) q.p(a, "<li><a href=\"javascript:" + J[i] + "\">" + i + "</a></li>");
			q.p(a, "</ul>");
			O.innerHTML = a.j("");
			a = q("#wqMC").E;
			a = q("A", a).E;
			J = 0;
			for (var i = 0; i < a.length; i++) a[i].onclick = function () { o(this); };
			o(a[0]);
			O = J = a = null;
		},

		r: function (O, J) {
			var a = [],
				o = function (O) {
					a = q("#wqMRi").E;
					a = q("A", a).E;
					for (var i = 0; i < a.length; i++) a[i].style.color = "";
					O.style.color = "#c03";
					O = a = null;
				};
			q.p(a, "<div id=\"wqMRi\" class=\"lf\">");
			for (var i in J) q.p(a, "<a class=\"mr\" href=\"javascript:" + J[i] + "\">" + i + "</a>");
			q.p(a, "</div>");
			O.innerHTML = a.j("");
			a = q("#wqMRi").E;
			a = q("A", a).E;
			J = 0;
			for (var i = 0; i < a.length; i++) a[i].onclick = function () { o(this); };
			o(a[0]);
			O = J = a = null;
		},

		b: function (O, J, F) {
			var a = [],
				o = function (O) {
					a = q("#wqMBi").E;
					a = q("SPAN", a).E;
					for (var i = 0; i < a.length; i++) {
						J = a[i].id.replace(/wqMBs/, "wqMBv");
						a[i].style.background = "";
						q("#" + J).E.className = "hd";
						J = null;
					}
					O.style.background = "#f66";
					O = O.id.replace(/wqMBs/, "");
					if (F != U) F(O);
					O = a = null;
				};
			q.p(a, "<div id=\"wqMBi\" class=\"mbd\">");
			for (var i in J) q.p(a, "<span id=\"wqMBs" + i + "\" class=\"mb\">" + J[i] + "</span>");
			q.p(a, "</div><div id=\"wqMBd\" class=\"mbv\"></div>");
			O.innerHTML = a.j("");
			a = 0;
			for (var i in J) {
				if (!a) a = i;
				q("#wqMBs" + i).E.onclick = function () { o(this); };
			}
			o(q("#wqMBs" + a).E);
			O = J = a = null;
		},

		// O Dom, T Title, J Json
		d: (O, T, J) => {
			let k = [];
			k.p(`<details>`);
			k.p("<summary>" + T + "</summary>");
			for (var i in J) k.p(`<li onclick="${J[i]}">${i}</li>`);
			k.p(`</details>`);
			O.innerHTML = k.j("");
		},

		// O Dom, T Title, J Json
		u: (O, T, J) => {
			let k = [];
			k.p(`<details>`);
			k.p("<summary>" + T + "</summary>");
			for (var i in J) k.p(`<a href="${J[i]}" target="_blank">${i}</a>`);
			k.p(`</details>`);
			O.innerHTML = k.j("");
		},

		// T daTe
		ut: function (T) {
			let k = {}, s = new Date();
			if (T) s = new Date(T);
			k.y = s.getFullYear();
			k.n = s.getMonth() + 1;
			k.d = s.getDate();
			k.h = s.getHours();
			k.m = s.getMinutes();
			k.s = s.getSeconds();
			for (var i in k) if (k[i] < 10) k[i] = "0" + k[i];
			k.w = s.getDay();
			k.dt = k.y + "-" + k.n + "-" + k.d;
			k.dn = k.y + "-" + k.n;
			k.ut = k.dt + "T" + k.h + ":" + k.m;

			s.setDate(k.d - 1);
			k.yy = s.getFullYear();
			k.yn = s.getMonth() + 1;
			k.yd = s.getDate();

			s = new Date(k.dt);
			s.setDate(k.d + 1);
			k.ty = s.getFullYear();
			k.tn = s.getMonth() + 1;
			k.td = s.getDate();

			s = new Date(k.dt);
			s.setDate(0);
			k.yny = s.getFullYear();
			k.ynn = s.getMonth() + 1;

			s = new Date(k.dt);
			s.setDate(32);
			k.tny = s.getFullYear();
			k.tnn = s.getMonth() + 1;

			for (var i in k) if (String(k[i]).length === 1) k[i] = "0" + k[i];
			k.ydt = k.yy + "-" + k.yn + "-" + k.yd;
			k.tdt = k.ty + "-" + k.tn + "-" + k.td;
			return k;
		},

		ss: S => S.replace(/,/g, "，").replace(/;/g, "；").replace(/\"/g, "＂").replace(/\'/g, "＇").replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, " "),
		sn: S => S.replace(/[^0-9]/g, ""),
		sc: S => S.replace(/[^(a-z|A-Z|0-9)]/g, ""),
		sp: S => m.ss(S).replace(/ |　|\?|\:|\%|\=|\+|\-|\*|\/|\||\\|\<|\>|\{|\}/g, "")
	};

	window.m = m;
})();

// V
(() => {
	const v = {
		// T Title, S Subheading, H Html, M Mode 0 default 1 del 2 close
		t: (T, S, H, M) => {
			let k = q("_w_Bt");
			if (k) v.del();
			else {
				// B Background, F Foreground, H Head, T Title, S Subheading, M main, U bUtton
				k = [];
				k.p(`<div id="_w_Bt"></div>`);
				k.p(`<div id="_w_Ft">`);
				k.p(`<div id="_w_Ht" onmousedown="v.mv.d(event)" onmousemove="v.mv.v(event)" onmouseup="v.mv.u(event)">`);
				k.p(`<div id="_w_Tt"></div>`);
				k.p(`<div id="_w_St" class="fxs"></div>`);
				k.p(`</div>`);
				k.p(`<form id="_w_F">`);
				k.p(`<div id="_w_Mt"></div>`);
				k.p(`<div id="_w_Ut">`);
				if (M !== 2) {
					k.p(`<input type="submit" value="确定">`);
					if (M === 1) k.p(`<input id="_w_D" type="button" value="删除">`);
					k.p(`<input type="reset" value="重置">`);
				}
				k.p(`<input type="button" onclick="window.v.del()" value="关闭">`);
				k.p(`</div></form></div>`);
				document.body.insertAdjacentHTML("beforeEnd", k.j(""));
				q("_w_Tt").h = T;
				q("_w_St").h = S;
				q("_w_Mt").h = H;
				v.adi("t");
			}
		},

		// H Html, C Callback
		c: (H, C) => {
			let k = q("_w_Bc");
			if (k) v.del("c");
			else {
				k = [];
				k.p(`<div id="_w_Bc"></div>`);
				k.p(`<div id="_w_Fc">`);
				k.p(`<div id="_w_Mc"></div>`);
				k.p(`<div class="tc">`)
				k.p(`<input id ="_w_OKc" type="button" value="确定">`);
				k.p(`<input type="button" onclick="v.del('c')" value="关闭">`);
				k.p(`</div></div>`);
				document.body.insertAdjacentHTML("beforeEnd", k.j(""));
				k = q("_w_OKc");
				if (k) {
					k.onclick = function () {
						v.del("c");
						if (typeof C == "function") C();
					};
					q("_w_Mc").h = H;
					v.adi("c");
				}
			}
		},

		// T Text, M Mode 0 green 1 Red 2 always
		i: (T, M) => {
			let k = q("_w_Bi");
			if (k) v.del("i");
			else {
				k = [];
				k.p(`<div id="_w_Bi"></div>`);
				k.p(`<div id="_w_Fi" class="`);
				if (M == 1) k.p(`lr`);
				else k.p(`lg`);
				k.p(`">`);
				k.p(`<div id="_w_Mi" class="fs"></div>`);
				k.p(`</div>`);
				document.body.insertAdjacentHTML("beforeEnd", k.j(""));
				k = q("_w_Mi");
				if (k) {
					k.h = T;
					if (M != 2) setTimeout(() => { v.del("i") }, 1200);
					v.adi("i");
				}
			}
		},

		del: S => {
			S = !S ? "t" : S;
			q("_w_B" + S).del();
			q("_w_F" + S).del();
		},

		adi: S => {
			let x = 0, y = 0, s = q("_w_F" + S);
			if (s) {
				x = (window.innerWidth - s.offsetWidth) / 2;
				y = (window.innerHeight - s.offsetHeight) / 2 - 20;
				if (x < 0) x = 0;
				if (y < 0) y = 0;
				s.style.left = x + "px";
				s.style.top = y + "px";
			}
		},

		mv: {
			o: 0, tx: 0, ty: 0, mx: 0, my: 0, f: 0,
			m: function (e) {
				this.o = document.getElementById("_w_Ft");
				this.tx = this.o.offsetLeft;
				this.ty = this.o.offsetTop;
				this.mx = e.clientX;
				this.my = e.clientY;
			},
			d: function (e) {
				this.m(e);
				this.f = 1;
			},
			v: function (e) {
				let x = e.clientX, y = e.clientY;
				if (this.f) {
					this.o.style.left = parseInt(this.tx) + parseInt(x) - parseInt(this.mx) + "px";
					this.o.style.top = parseInt(this.ty) + parseInt(y) - parseInt(this.my) + "px";
				}
			},
			u: function (e) {
				if (this.f) {
					let x = e.clientX, y = e.clientY;
					this.o.style.left = parseInt(this.tx) + parseInt(x) - parseInt(this.mx) + "px";
					this.o.style.top = parseInt(this.ty) + parseInt(y) - parseInt(this.my) + "px";
					this.o.style.cursor = "default";
					this.f = 0;
				}
			}
		}
	};

	window.v = v;
})();
