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
		}, cnch = function () {
			this.v = m.sp(this.v);
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
		h.p(`<div id="Ein" class="fs tc g">　</div>`);
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
	// S String, E Element, J Json
	const q = (S, E, J) => {
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
						get: () => E.className || "",
						set: S => { E.className = S }
					},
					h: {
						get: () => E.value ? E.value : E.innerHTML,
						set: S => { E.value ? E.value = S : E.innerHTML = S }
					}
				});
			}
		};

		J = typeof J === "object" && J.d ? J : 0;
		if (typeof E === "object" && E.d) J = E, E = document.body;
		E = E || document.body;
		if (S.startsWith(".")) E = E.getElementsByClassName(S.substr(1));
		else if (S.startsWith(":")) E = document.getElementsByName(S.substr(1));
		else if (S.startsWith("@")) E = E.getElementsByTagName(S.substr(1));
		else if (S) E = document.getElementById(S);
		if (!E || (E && E.length === 0)) return;
		l = E.nodeType === 1 ? 0 : E.length;
		if (l) {
			E = [].slice.call(E);
			for (const i of E) s(i);
		} else s(E);

		// J Json: b background for :for, d data, m on mode, c callback
		if (J) {
			const up = (N, O, S, V) => {
				if (V === 3) O.textContent = S.replace(/\$\{(.*)\}/g, J.d[N]);
				else if (V === 1) O.innerHTML = S.replace(/\$\{(.*)\}/g, J.d[N]);
				else if (V === 11) O.value = J.d[N];
				else if (V === 12) {
					let r = O.nextElementSibling, k = 0;
					if (O.value || O.value === "") O.value = J.d[N][0];
					else O.innerHTML = J.d[N][0];
					while (r && r.getAttribute("_q") === N) {
						r.parentElement.removeChild(r);
						r = O.nextElementSibling;
					}
					if (Array.isArray(J.b[N])) {
						O.style.background = J.b[N][0];
						k = J.b[N].length;
					}
					for (let i = 1; i < J.d[N].length; i++) {
						let n = O.cloneNode(true);
						if (r) n = O.parentNode.insertBefore(n, r);
						else n = O.parentNode.appendChild(n);
						if (n.value || n.value === "") n.value = J.d[N][i];
						else n.innerHTML = J.d[N][i];
						if (k) n.style.background = J.b[N][(i < k ? i : i % k)];
					}
				}
			}, pt = (N, O, S, V) => {
				// N Name, O Object, S String, V tag 1 push
				if (V === 1 && J.q[N].indexOf(O) === -1) {
					J.q[N].push(O);
					J.q[N + "_v"].push(S);
				}
			}, go = (O, S, V) => {
				let r = /\$\{(.*)\}/,
					n = r.test(S) ? r.exec(S)[1] : (r = /\:v(.*)/).test(S) ? r.exec(S)[1] : (r = /\:for(.*)/).test(S) ? r.exec(S)[1] : "";
				if (O.nodeType == 3 && (J.d[n] || J.d[n] === "")) {
					pt(n, O, S, V);
					up(n, O, S, 3);
				} else if (O.nodeType === 1) {
					if (J.d[n] || J.d[n] === "") {
						pt(n, O, S, V);
						if (S.indexOf(":v") === 0) up(n, O, "", 11);
						else if (S.indexOf(":for") === 0) up(n, O, "", 12);
						else up(n, O, S, 1);
					}
					for (const i of [].slice.call(O.attributes)) {
						r = i.name.split(':');
						n = i.value;
						if ((O.value || O.value === "") && r[1] === "v" && J.d[n]) {
							// :v value
							pt(n, O, ":v" + n, V);
							up(n, O, "", 11);
							O.addEventListener('input', S => { J.d[i.value] = S.target.value }, false);
							O.removeAttribute(i.name);
						} else if (r[0] === "on" && J.m[n]) {
							// on:click onclick
							if (O.getAttribute(":for") || O.getAttribute("_q")) O.parentNode.addEventListener(r[1], S => { if (S.target.getAttribute("_q")) J.m[i.value](J.d, S.target) }, false);
							else O.addEventListener(r[1], S => { J.m[i.value](J.d, S.target) }, false);
							O.removeAttribute(i.name);
						} else if (r[1] === "for" && Array.isArray(J.d[n])) {
							// :for for
							O.removeAttribute(i.name);
							O.setAttribute("_q", n);
							pt(n, O, ":for" + n, V);
							up(n, O, "", 12);
						}
					}
				}
			}, to = O => {
				if (O.childNodes.length === 0) go(O, O.textContent, 1);
				else for (const i of [].slice.call(O.childNodes)) {
					if (i.children && i.children.length) to(i);
					else go(i, i.textContent, 1);
				}
			}, df = (O, K, V) => {
				Object.defineProperty(O, K, {
					get: () => V,
					set: S => {
						if (S === V) return;
						V = S;
						for (let i = 0; i < J.q[K].length; i++) go(J.q[K][i], J.q[K + "_v"][i]);
					}
				});
			};

			J.q = J.q ? J.q : {};
			for (const i in J.d) {
				J.q[i] = J.q[i] ? J.q[i] : [];
				J.q[i + "_v"] = J.q[i + "_v"] ? J.q[i + "_v"] : [];
				df(J.d, i, J.d[i]);
			}
			if (l) for (const i of E) to(i);
			else to(E);
			if (typeof J.c === "function") J.c(J.d);
		}

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
		let k = [];
		if (typeof S === "string") {
			S = S.split(";");
			for (let i = 0; i < S.length; i++) {
				const s = S[i].split(",");
				k[i] = [];
				for (let j = 0; j < s.length; j++) k[i].push(s[j]);
			}
		}
		return k;
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
	q.j = S => typeof S === "string" ? JSON.parse(S) : JSON.stringify(S);

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

	// N Name 0 clear, V Value 0 delete
	q.s = (N, V) => {
		const k = sessionStorage;
		if (V === 0) k.removeItem(N);
		else if (V) k.setItem(N, V);
		else if (N === 0) k.clear();
		return k.getItem(N) || "";
	};

	Array.prototype.p = Array.prototype.push;
	Array.prototype.j = Array.prototype.join;
	window.q = q;
})();

// M
(() => {
	const m = {
		// E Element, J Json
		r: (E, J) => {
			var k = [], o = E => {
				q("@A", q("_M_r")).for(e => { e.c = "" });
				E.c = "_M_r";
			};
			k.p(`<div id="_M_r">`);
			for (var i in J) k.p(`<a href="javascript:${J[i]}">${i}</a>`);
			k.p(`</div>`);
			E.innerHTML = k.j("");
			k = q("@A", q("_M_r")).for(e => { e.onclick = function () { o(this) } });
			o(k[0]);
		},

		// E Element, J Json
		b: (E, J) => {
			let k = [], o = E => {
				q("@span", q("_M_b")).for(e => { e.c = "_M_b" });
				E.children[0].c = "_M_b _M_f";
			};
			k.p(`<div id="_M_b" class="g">`);
			for (const i in J) k.p(`<label><span class="_M_b" onclick="${J[i]}">${i}</span></label>`);
			k.p(`</div><div id="_w_M"></div>`);
			E.innerHTML = k.j("");
			k = q("@LABEL", q("_M_b")).for(e => { e.onclick = function () { o(this) } });
			o(k[0]);
		},

		// E Element, J Json
		d: (E, J) => {
			let k = [], o = E => {
				q("@LI", q("_M_d")).for(e => { e.c = "tc" });
				E.children[0].c = "_M_d tc";
			};
			k.p(`<div id="_M_d">`);
			for (const i in J) {
				k.p(`<details>`);
				k.p(`<summary class="${J[i]['c'] ? J[i]['c'] : ''}">${i}</summary>`);
				for (const j in J[i]) if (j !== "c") k.p(`<span><li class="tc" onclick="${J[i][j]}">${j}</li></span>`);
				k.p(`</details>`);
			}
			k.p(`</div>`)
			E.innerHTML = k.j("");
			k = q("@SPAN", E).for(e => { e.onclick = function () { o(this) } });
			o(k[0]);
			k[0].parentElement.setAttribute("open", "open");
			k[0].children[0].click();
		},

		// E Element, T Title, J Json
		u: (E, T, J) => {
			let k = [];
			k.p(`<details class="tc dl">`);
			k.p(`<summary class="${J['c'] ? J['c'] : ''}">${T}</summary>`);
			for (const i in J) if (i !== "c") k.p(`<a href="${J[i]}" target="_blank">${i}</a><br>`);
			k.p(`</details>`);
			E.innerHTML = k.j("");
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

			k.w = 1 == k.w ? "一" : 2 == k.w ? "二" : 3 == k.w ? "三" : 4 == k.w ? "四" : 5 == k.w ? "五" : 6 == k.w ? "六" : "日";
			return k;
		},

		// S String
		ss: S => S.replace(/,/g, "，").replace(/;/g, "；").replace(/\"/g, "＂").replace(/\'/g, "＇").replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, " "),
		sn: S => S.replace(/[^0-9]/g, ""),
		sc: S => S.replace(/[^(a-z|A-Z|0-9)]/g, ""),
		sp: S => m.ss(S).replace(/ |　|\?|\:|\%|\=|\+|\-|\*|\/|\||\\|\<|\>|\{|\}/g, ""),
		ts: function () { this.value = m.ss(this.value) },
		tn: function () { this.value = m.sn(this.value) },
		tc: function () { this.value = m.sc(this.value) },
		tp: function () { this.value = m.sp(this.value) }
	};

	window.m = m;
})();

// V
(() => {
	const v = {
		// T Title, S Subheading, H Html, M Mode 0 default 1 del 2 close
		t: (T, S, H, M) => {
			let k = q("_V_Bt");
			if (k) v.del();
			else {
				// B Background, F Foreground, H Head, T Title, S Subheading, M main, U bUtton
				k = [];
				k.p(`<div id="_V_Bt" class="_V_p _V_b db"></div>`);
				k.p(`<div id="_V_Ft" class="_V_p _V_f db">`);
				k.p(`<div id="_V_Ht" class="tc" onmousedown="v.mv.d(event)" onmousemove="v.mv.v(event)" onmouseup="v.mv.u(event)">`);
				k.p(`<div>${T}</div>`);
				k.p(`<div class="_V_s fxs">${S}</div>`);
				k.p(`</div>`);
				k.p(`<form id="_w_F">`);
				k.p(`<div class="_V_t tl">${H}</div>`);
				k.p(`<div class="_V_u tc">`);
				if (M !== 2) {
					k.p(`<input type="submit" value="确定">`);
					if (M === 1) k.p(`<input id="_w_D" type="button" value="删除">`);
					k.p(`<input type="reset" value="重置">`);
				}
				k.p(`<input type="button" onclick="v.del()" value="关闭">`);
				k.p(`</div></form></div>`);
				document.body.insertAdjacentHTML("beforeEnd", k.j(""));
				v.adi("t");
			}
		},

		// H Html, C Callback
		c: (H, C) => {
			let k = q("_V_Bc");
			if (k) v.del("c");
			else {
				k = [];
				k.p(`<div id="_V_Bc" class="_V_p _V_b db"></div>`);
				k.p(`<div id="_V_Fc" class="_V_p _V_f db">`);
				k.p(`<div class="_V_c">${H}</div>`);
				k.p(`<div class="tc">`)
				k.p(`<input id ="_w_OK" type="button" value="确定">`);
				k.p(`<input type="button" onclick="v.del('c')" value="关闭">`);
				k.p(`</div></div>`);
				document.body.insertAdjacentHTML("beforeEnd", k.j(""));
				q("_w_OK").onclick = () => {
					if (H.indexOf("input") === -1) v.del("c");
					if (typeof C == "function") C();
				};
				v.adi("c");
			}
		},

		// T Text, M Mode 0 green 1 Red 2 always
		i: (T, M) => {
			let k = q("_V_Bi");
			if (k) v.del("i");
			else {
				k = [];
				k.p(`<div id="_V_Bi" class="_V_p _V_b db"></div>`);
				k.p(`<div id="_V_Fi" class="_V_p _V_f db `);
				if (M == 1) k.p(`lr`);
				else k.p(`lg`);
				k.p(`">`);
				k.p(`<div class="fs">${T}</div>`);
				k.p(`</div>`);
				document.body.insertAdjacentHTML("beforeEnd", k.j(""));
				v.adi("i");
				if (M != 2) setTimeout(() => { v.del("i") }, 1200);
			}
		},

		del: S => {
			S = !S ? "t" : S;
			q("_V_B" + S).del();
			q("_V_F" + S).del();
		},

		adi: S => {
			let x = 0, y = 0, s = q("_V_F" + S);
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
				this.o = document.getElementById("_V_Ft");
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
