/*!
 * wqMV.js v 1.0
 * (c) 2019 WangQiang
 * date: 2019-1-1
 */

"use strict";

// q
(() => {
	// S String, E Element
	const q = (S, E = document.body) => {
		let l = 0;
		const s = (E) => {
			if (!E.g) {
				E.g = (S = "", V = "") => {
					if (S && V) E.setAttribute(S, V);
					return E.getAttribute(S) || "";
				};
				E.c = E.textContent || "";
				Object.defineProperties(E, {
					h: {
						get: () => { return E.innerHTML || "" },
						set: (S = "") => { E.innerHTML = S }
					},
					v: {
						get: () => { return E.value || "" },
						set: (S = "") => { if (E.value !== "undefined") E.value = S }
					}
				});
			}
		};

		if (S.startsWith(".")) E = E.getElementsByClassName(S.substr(1));
		else if (S.startsWith(":")) E = document.getElementsByName(S.substr(1));
		else if (S.startsWith("@")) E = E.getElementsByTagName(S.substr(1));
		else if (S) E = document.getElementById(S);
		if (!E || (E && E.length === 0)) return;
		l = E.tagName === "SELECT" ? 0 : E.length;
		if (l) for (const i of E) s(i);
		else s(E);

		// S String, A Any
		E.add = (S = "", A = "") => {
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
		E.css = (J = "") => {
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
		E.key = (C, N = 13) => {
			const k = () => {
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
