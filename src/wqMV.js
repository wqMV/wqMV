/*!
 * wqMV.js v 1.0
 * (c) 2017-2019 WangQiang
 * date: 2019-1-1
 */

"use strict";

// q
((W) => {
	// S String, E Element, A Any
	const q = (S, E = document.body) => {
		const p = (E) => {
			E.C = E.textContent || "";
			E.H = E.innerHTML || "";
			E.V = E.value || "";
			E.h = (S = "") => { E.innerHTML = S };
			E.g = (S) => E.getAttribute(S) || "";
		};
		let l = 0;

		if (S.startsWith(".")) E = E.getElementsByClassName(S.substr(1));
		else if (S.startsWith("$")) E = document.getElementsByName(S.substr(1));
		else if (S.startsWith("@")) E = E.getElementsByTagName(S.substr(1));
		else if (S) E = document.getElementById(S);
		l = E.length;
		if (l) for (const i of E) p(i);
		else p(E);

		E.del = () => {
			if (l) for (let i = 0; i < l; i++) E[0].parentElement.removeChild(E[0]);
			else E.parentElement.removeChild(E);
			return "";
		};
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
			return "";
		};
		return E;
	};

	W.q = q;
})(window);
