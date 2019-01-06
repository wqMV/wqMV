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

			wRD = (K) => Math.floor(Math.random() * K * 89) + (K + 1) * 127;

		M = C === "GET" || D === "GET" || N === "GET" || T === "GET" ? "GET" : (M === "GET" ? M : "POST");
		T = typeof C === "number" ? C : (typeof D === "number" ? D : (typeof N === "number" ? N : (typeof T === "number" ? T : 0)));
		N = typeof C === "string" && C !== "GET" ? C : (typeof D === "string" && D !== "GET" ? D : (!N || typeof N !== "string" || N === "GET" ? "" : N));
		D = typeof C === "object" ? C : (!D || typeof D !== "object" ? 0 : D);
		C = !C || typeof C !== "function" ? 0 : C;

		wF += N;
		if (!N) wF += "ajax.aspx";
		setTimeout(wON, wRD(T));
	};

	// J Json: id, ph, cn, t, p, uc, dc, h
	w.f = (J) => {
		const del = () => {
			t.c("您确定删除这个文件吗？", function () {
				J.dc();
			});
		}, up = () => {
			if (q("#Efs").V) {
				t.c("您上传了新文件，这将覆盖原有的文件！<br>您确定继续吗？", function () {
					q("#Ein").h("正在上传文件，请不要关闭当前窗口……");
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
			var o = q("#Efs").E.files[0];
			if (o) {
				var fr = new FileReader();
				fr.onload = function (e) {
					if (o.size > 20479999) {
						t.i("上传文件大小不能超过20M！", 1);
						q("#Efs").E.value = "";
					} else {
						q("#Efl").E.value = "2";
						q("#Ecn").E.value = m.sp(o.name);
					}
					o = fr = null;
				};
				fr.readAsDataURL(o);
			}
		};
		let h = [];

		h.p(`<input name="id" type="hidden" value="${J.id}">`);
		h.p(`<input name="old" type="hidden" value="${J.ph}">`);
		h.p(`<input id="Efl" name="fl" type="hidden" value="1">`);
		//if (J.h) h.p(J.h + "<br>");
		h.p(`<label>标题：<input id="Ecn" name="cn" type="text" style="width:360px" required value="${J.cn}"></label>`);
		h.p(`<div style="padding:5px 0"><label>文件：<input id="Efs" name="fs" type="file" style="width:360px" /></label></div>`);
		h.p(`<div id="Ein" class="fs" style="color:#060; text-align:center">　</div>`);
		//t.t(J.t, J.p, h.join(""), (J.id === 0 ? 0 : 1));
		//q("Ecn").onchange = cnch;
		//q("Efs").onchange = fsch;
		//q("#_w_D").E.onclick = del;
		//q("#_w_F").E.onsubmit = () => up();

		return h.join("");
	};

	window.w = w;
})();

// q
(() => {
	// S String, E Element
	const q = (S, E) => {
		let l = 0;
		const s = (E) => {
			if (!E.g) {
				E.g = (S, V) => {
					if (S && V) E.setAttribute(S, V);
					return E.getAttribute(S) || "";
				};
				E.c = E.textContent || "";
				Object.defineProperties(E, {
					h: {
						get: () => { return E.innerHTML || "" },
						set: (S) => { E.innerHTML = S }
					},
					v: {
						get: () => { return E.value || "" },
						set: (S) => { if (E.value !== "undefined") E.value = S }
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
		l = E.tagName === "SELECT" ? 0 : E.length;
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
		E.css = (J) => {
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

		// F Function
		E.for = (C) => {
			if (l) for (const i of E) C(i);
			return E;
		};

		// N keycode, C Callback
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
	q.a = (S) => {
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
	q.d = (J) => {
		let k = new FormData();
		for (const i in J) k.append(i, J[i]);
		return k;
	};

	// S String
	q.j = (S) => typeof S === "string" ? JSON.parse(`{${S}}`) : JSON.stringify(S);

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

// V
(() => {
	// S String, T Text, P Prompt, H Html, N Number, C Callback
	const v = {
		// T Title, S Subheading, H Html, M Mode 0 default 1 del 2 close
		t: (T, S, H, M) => {
			let k = q("_w_tB");
			if (k) v.del();
			k = q("#_w_tB");
			if (!k) {
				// B Background, F Foreground, H Head, T Title, S Subheading, M main, U bUtton
				k = [];
				k.p(`<div id="_w_tB"></div>`);
				k.p(`<div id="_w_tF">`);
				k.p(`<div id="_w_tH" onmousedown="v.mv.d(event)" onmousemove="v.mv.v(event)" onmouseup="v.mv.u(event)">`);
				k.p(`<div id="_w_tT" class="fl"></div>`);
				k.p(`<div id="_w_tS" class="fs"></div>`);
				k.p(`</div>`);
				k.p(`<form id="_w_F">`);
				k.p(`<div id="_w_tM"></div>`);
				k.p(`<div id="_w_tU">`);
				if (M !== 2) {
					k.p(`<input type="submit" value="确定" />`);
					if (M === 1) k.p(`<input id="_w_D" type="button" value="删除" />`);
					k.p(`<input type="reset" value="重置" />`);
				}
				k.p(`<input type="button" onclick="v.del()" value="关闭" />`);
				k.p(`</div></form></div>`);
				document.body.insertAdjacentHTML("beforeEnd", k.j(""));
				k = q("#_w_tB").E;
				if (k) {
					q("#_w_tT").h(T);
					q("#_w_tS").h(S);
					q("#_w_tM").h(H);
					t.ad("t");
				}
			}
		},

		c: function (T, C) {
			var a = q("#wqBtc").E;
			if (a) t.del("i");
			a = q("#wqBtc").E;
			if (!a) {
				a = [];
				q.p(a, "<div id=\"wqBtc\"></div>");
				q.p(a, "<div id=\"wqRtc\">");
				q.p(a, "<div id=\"wqAtca\" class=\"hl\"></div>");
				q.p(a, "<div id=\"wqCbt\">")
				q.p(a, "<input id =\"wqCok\" type=\"button\" value=\"确定\" />");
				q.p(a, "<input type=\"button\" onclick=\"t.del('c')\" value=\"关闭\" />");
				q.p(a, "</div></div>");
				document.body.insertAdjacentHTML("beforeEnd", a.join(""));
				a = q("#wqCok").E;
				if (a) {
					a.onclick = function () {
						t.del("c");
						if (typeof C == "function") C();
					};
					a = q("#wqAtca").E;
					a.innerHTML = T;
					t.ad("c");
				}
			}
			T = a = null;
		},

		i: function (T, N) {
			var a = q("#wqBti").E;
			if (a) t.del("i");
			a = q("#wqBti").E;
			if (!a) {
				a = [];
				q.p(a, "<div id=\"wqBti\"></div>");
				q.p(a, "<div id=\"wqRti\" style=\"background:");
				if (N == 1) q.p(a, "#f66");
				else q.p(a, "#6f6");
				q.p(a, "\">");
				q.p(a, "<div id=\"wqAtia\" class=\"fs\"></div>");
				q.p(a, "</div>");
				document.body.insertAdjacentHTML("beforeEnd", a.join(""));
				a = q("#wqAtia").E;
				if (a) {
					a.innerHTML = T;
					if (N != 2) setTimeout(function () {
						t.del("i")
					}, 1200);
					t.ad("i");
				}
			}
			T = N = a = null;
		},

		del: function (S) {
			var a, b;
			if (S == U) S = "t";
			a = q("#wqBt" + S).E, b = q("#wqRt" + S).E;
			if (a) a.parentElement.removeChild(a);
			if (b) b.parentElement.removeChild(b);
			S = a = b = null;
		},

		ad: function (S) {
			var a = b = 0,
				c = q("#wqRt" + S).E;
			if (c) {
				a = (window.innerWidth - c.offsetWidth) / 2 - 20;
				b = (window.innerHeight - c.offsetHeight) / 2 - 50;
				if (a < 0) a = 0;
				if (b < 0) b = 0;
				c.style.left = a + "px";
				c.style.top = b + "px";
			}
			S = a = b = c = null;
		},

		mv: {
			o: 0, x: 0, y: 0, mx: 0, my: 0, f: 0,
			m: function (e) {
				this.o = q("#_w_tF").E;
				this.tx = this.o.offsetLeft;
				this.ty = this.o.offsetTop;
				this.mx = e.clientX;
				this.my = e.clientY;
			},
			d: function (e) {
				this.m(e);
				this.o.style.cursor = "move";
				this.f = 1;
			},
			v: function (e) {
				var x = e.clientX,
					y = e.clientY;
				if (this.f) {
					this.o.style.left = parseInt(this.tx) + parseInt(x) - parseInt(this.mx) + "px";
					this.o.style.top = parseInt(this.ty) + parseInt(y) - parseInt(this.my) + "px";
				}
			},
			u: function (e) {
				if (this.f) {
					var x = e.clientX,
						y = e.clientY;
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
