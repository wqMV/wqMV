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
		const s = (E) => {
			if (!E.a) {
				E.a = (S = "", V = "") => {
					if (S && V) E.setAttribute(S, V);
					else return E.getAttribute(S) || "";
				};
				E.c = E.textContent || "";
				Object.defineProperties(E, {
					h: {
						get: () => { return E.innerHTML || "" },
						set: (S = "") => { E.innerHTML = S }
					},
					v: {
						get: () => { return E.value || "" },
						set: (S = "") => { if (E.value) E.value = S }
					}
				});
			}
		};

		if (S.startsWith(".")) E = E.getElementsByClassName(S.substr(1));
		else if (S.startsWith("$")) E = document.getElementsByName(S.substr(1));
		else if (S.startsWith("@")) E = E.getElementsByTagName(S.substr(1));
		else if (S) E = document.getElementById(S);
		if (!E || (E && E.length === 0)) return;
		q.e = E;
		//q.l = E.tagName === "SELECT" ? 0 : E.length;
		//if (q.l) for (const i of E) s(i);
		//else s(E);

		/*
		E.del = () => {
			if (q.l) for (let i = 0; i < q.l; i++) E[0].parentElement.removeChild(E[0]);
			else E.parentElement.removeChild(E);
			return "";
		};

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

		// N keycode,F Function
		E.key = (F, N = 13) => {
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

		*/
		return E;
	};

	q.prototype = {
		_name: "chen",
		age: 21,
		set h(name) { this._name = name; },
		get h() { return this._name; }
	};
	console.log(q.prototype);
	/*
	Object.defineProperties(q.prototype, {
		h: {
			get: () => { alert(); return q.e.innerHTML || "" },
			set: (S = "") => { q.e.innerHTML = S }
		},
		v: {
			get: () => { return q.e.value || "" },
			set: (S = "") => { if (q.e.value) q.e.value = S }
		}
	});
	*/

	var person = {
		_name: "chen",
		age: 21,
		set name(name) { this._name = name; },
		get name() { return this._name; }
	}
	console.log(person.name);


	// N Name, V Value 0 delete
	q.ss = (N, V) => {
		const s = sessionStorage;
		if (V === 0) s.removeItem(N);
		else if (V) s.setItem(N, V);
		return s.getItem(N);
	};

	Array.prototype.p = Array.prototype.push;
	W.q = q;
})(window);
