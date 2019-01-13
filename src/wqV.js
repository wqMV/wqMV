// v
(function (W, U) {
	// J Json, K Key, O Object, S String, V Value
	var v = function (J) {
		l.e = document.querySelector(J.e);
		if (l.e) {
			Object.keys(J.d).forEach(function (K) { v.pr(J, K, J.d[K]); });
			v.go(J);
			J.t.call(J.d);
		}
		else console.log("Element does not exist.");
	}, l = { e: 0, t: 0, d: {} };

	v.pr = function (J, K, V) {
		Object.defineProperty(J.d, K, {
			enumerable: true,
			configurable: true,
			get: function () { return V; },
			set: function (S) {
				if (S === V) return;
				V = S;
				v.up(J, K);
			}
		});
	};

	v.go = function (J) {
		var g = function (O) {
			[].slice.call(O.childNodes).forEach(function (K) {
				if (K.children && K.children.length) g(K);
				else v.cl(J, K, K.textContent);
			});
		};
		g(l.e);
	};

	v.up = function (J, S) {
		for (var i = 0; i < l.d[S].o.length; i++) {
			l.t = l.d[S].o[i];
			v.cl(J, l.d[S].o[i], l.d[S].d[i], i);
		}
	};

	v.cl = function (J, O, S, V) {
		var n = 0, r = /\{\{(.*)\}\}/, s = "";
		if (V != U) n = V;
		if (r.test(S)) s = r.exec(S)[1];
		if (O.nodeType == 3 && J.d[s] != U) {
			if (V == U) n = v.cp(O, s);
			v.upT(J, s, n);
		} else if (O.nodeType == 1) {
			if (J.d[s] != U) {
				if (V == U) n = v.cp(O, s);
				v.upH(J, s, n);
			}
			[].slice.call(O.attributes).forEach(function (K) {
				r = O.tagName;
				s = K.name.split(':');
				if (r == "INPUT" && s[0] == "vm" && J.d[K.value] != U) {
					// vm model
					O.value = J.d[K.value];
					O.addEventListener('input', function (V) { J.d[K.value] = V.target.value; }, false);
					O.removeAttribute(K.name);
				} else if (s[0] == "vo" && J.m[K.value] != U) {
					// vo on
					if (O.getAttribute("_v") || O.getAttribute("vf")) O.parentNode.addEventListener(s[1], function (e) {
						e = e.target;
						if (e.getAttribute("_v")) J.m[K.value].call(J.d, e);
					}, false);
					else O.addEventListener(s[1], J.m[K.value].bind(J.d), false);
					O.removeAttribute(K.name);
				} else if (s[0] == "vf" && J.d[K.value] != U) {
					// vo for
					n = v.cp(O, K.value);
					s = J.d[K.value];
					O.removeAttribute(K.name);
					O.setAttribute("_v", K.value);
					if (Array.isArray(s)) v.upF(O, s);
				} else if (s[0] == "_v" && J.d[K.value] != U) {
					// _v for vf
					s = J.d[K.value];
					if (Array.isArray(s)) {
						r = O.nextElementSibling;
						while (r && r.getAttribute("_v") == K.value) {
							O.parentNode.removeChild(r);
							r = O.nextElementSibling;
						}
						v.upF(O, s);
					}
				}
			});
		}
		n = r = s = null;
	};

	v.cp = function (O, S) {
		var n = 0;
		l.t = O;
		if (l.d[S]) {
			var t = 1;
			for (; n < l.d[S].o.length; n++) if (l.d[S].o[n] == O) {
				t = 0;
				break;
			}
			if (t) {
				l.d[S].o.push(O);
				l.d[S].d.push(O.textContent);
				n = l.d[S].o.length - 1;
			} else n = n - 1;
			t = null;
		} else {
			l.d[S] = {};
			l.d[S].o = [O];
			l.d[S].d = [O.textContent];
		}
		return n;
	};

	v.upF = function (O, S) {
		var r = O.nextElementSibling, n = 0;
		O.innerHTML = S[0];
		for (var i = 1; i < S.length; i++) {
			n = O.cloneNode(true);
			if (r) n = O.parentNode.insertBefore(n, r);
			else n = O.parentNode.appendChild(n);
			n.innerHTML = S[i];
		}
		r = n = null;
	};
	v.upT = function (J, S, K) {
		l.t.textContent = (l.d[S].d[K]).replace(/\{\{(.*)\}\}/g, J.d[S]);
		l.t = 0;
	};
	v.upH = function (J, S, K) {
		l.t.innerHTML = (l.d[S].d[K]).replace(/\{\{(.*)\}\}/g, J.d[S]);
		l.t = 0;
	};

	W.v = v;
})(window);
