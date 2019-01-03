/*!
 * wqMV.js v 1.0
 * (c) 2019 WangQiang
 * date: 2019-1-1
 */

"use strict";

// q
((W) => {
	// S String, E Element
	const q = (S, E = document.body) => {
		const p = (E) => {
			E.C = E.textContent || "";
			E.H = E.innerHTML || "";
			E.V = E.value || "";
			E.g = (S) => E.getAttribute(S) || "";
			E.h = (S = "") => { E.innerHTML = S };
			E.v = (S = "") => {
				if (E.value) {
					if (!S) return E.value;
					E.value = S;
				}
			};
		};
		let l = 0;

		if (S.startsWith(".")) E = E.getElementsByClassName(S.substr(1));
		else if (S.startsWith("$")) E = document.getElementsByName(S.substr(1));
		else if (S.startsWith("@")) E = E.getElementsByTagName(S.substr(1));
		else if (S) E = document.getElementById(S);
		if (!E || (E && E.length === 0)) return;

		l = E.tagName === "SELECT" ? 0 : E.length;
		if (l) for (const i of E) p(i);
		else p(E);

		E.del = () => {
			if (l) for (let i = 0; i < l; i++) E[0].parentElement.removeChild(E[0]);
			else E.parentElement.removeChild(E);
			return "";
		};

		// S String, A Any
		E.add = (S = "", A = "") => {
			const u = () => {
				if (l) for (const i of E) i.insertAdjacentHTML(S, A);
				else E.insertAdjacentHTML(S, A)
			};
			if (S && typeof A === "function") {
				if (l) for (const i of E) i.addEventListener(S, A, false);
				else E.addEventListener(S, A, false);
			} else {
				if (S === "bb") S = "beforeBegin";
				else if (S === "ab") S = "afterBegin";
				else if (S === "be") S = "beforeEnd";
				else if (S === "ae") S = "afterEnd";
				u();
			}
			return E;
		};

		// N keycode,F Function
		E.key = (N, F) => {
			const k = () => {
				if (event.keyCode == N) {
					event.returnValue = false;
					if (typeof F === "function") F(event.target);
				}
			};
			if (l) for (const i of E) i.onkeydown = k;
			else E.onkeydown = k;
			return E;
		};
		return E;
	};

	W.q = q;
})(window);
