/*!
 * wqMV.js v 1.0
 * (c) 2019 WangQiang
 * date: 2019-1-1
 */

"use strict";

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
				if (event.keyCode == N) {
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
	q.f = (J) => {
		let k = new FormData();
		for (const i in J) k.append(i, J[i]);
		return k;
	};

	// S String
	q.j = function (S) {
		if (typeof N === "string") return JSON.parse(S);
		return JSON.stringify(S);
	};

	//P tyPe,N Number,C Callback
	q.js = function (P, N, C) {
		var a;
		if (P == U) return;
		if (N == U) N = 0;
		if (typeof N == "function") C = N;
		a = D.getElementById("wqJS" + P);
		if (!a) {
			var a = D.createElement("script");
			a.type = "text/JavaScript";
			a.id = "wqJS" + P;
			if ("onload" in a) {
				a.onload = function () {
					a.onload = null;
					if (typeof C == "function") setTimeout(C, N);
				}
			} else {
				a.onreadystatechange = function () {
					if (/loaded|complete/.test(a.readyState)) {
						a.onreadystatechange = null;
						if (typeof C == "function") setTimeout(C, N);
					}
				}
			}
			a.src = "src/" + P + ".js";
			D.body.insertAdjacentElement("beforeEnd", a);
		} else if (typeof C == "function") setTimeout(C, N);
		P = null;
	};

	// N Name, V Value 0 delete
	q.ss = (N, V) => {
		const s = sessionStorage;
		if (V === 0) s.removeItem(N);
		else if (V) s.setItem(N, V);
		return s.getItem(N);
	};

	Array.prototype.p = Array.prototype.push;
	window.q = q;
})();
