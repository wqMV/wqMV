/*!
 * wqMVT.js v4.11.05
 * (c) 2017-2018 WangQiang
 * date: 2018-11-05
 */

// w
(function (W, U) {
	// F File, J Json, C Callback, S Selector, R Random
	var w = function (C, J, F, R, S) {
		var wI, wT = 0,
			wF = "http://" + W.location.host + "/",

			wPut = function () {
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) wT = xhr.responseText;
				};
				xhr.open(S, wF, true);
				if (S == "GET") xhr.send();
				else xhr.send(J);
			},

			wOK = function () {
				// wT is true
				if (wT) {
					clearInterval(wI);
					J = S = wI = wF = wR = wON = wPut = null;
					if (C) C(wT);
				}
			},
			wON = function () {
				wPut();
				wI = setInterval(wOK, 100);
			},

			wR = function (a) {
				return Math.floor(Math.random() * a * 123) + a * 200;
			};

		if (C == "GET" || J == "GET" || F == "GET" || R == "GET") S = "GET";
		if (S != "GET") S = "POST";
		if (typeof C == "number") R = C;
		if (typeof J == "number") R = J;
		if (typeof F == "number") R = F;
		if (R == U || typeof R != "number" || !R) R = 0;
		if (typeof C == "string" && C != "GET") F = C;
		if (typeof J == "string" && J != "GET") F = J;
		if (F == U || typeof F != "string" || F == "GET") F = "";
		if (typeof C == "object") J = C;
		if (J == U || typeof J != "object") J = 0;
		if (C == U || typeof C != "function") C = 0;
		wF += F;
		if (!F) wF += "ajax";
		if (F.indexOf("\.") == -1) wF += ".aspx";
		setTimeout(wON, wR(R));
		F = R = null;
	};

	// J Json:id,ph,cn,t,p,uc,dc,h
	w.up = function (J) {
		var h = [],
			del = function () {
				t.c("您确定删除这个文件吗？", function () {
					J.dc();
				});
			},
			up = function () {
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
			},
			cnch = function () {
				this.value = m.sp(this.value);
			},
			fsch = function () {
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

		q.p(h, "<input name=\"id\" type=\"hidden\" value=\"" + J.id + "\">");
		q.p(h, "<input name=\"old\" type=\"hidden\" value=\"" + J.ph + "\">");
		q.p(h, "<input id=\"Efl\" name=\"fl\" type=\"hidden\" value=\"1\">");
		if (J.h) q.p(h, J.h + "<br>");
		q.p(h, "<label>标题：<input id=\"Ecn\" name=\"cn\" type=\"text\" style=\"width:360px\" required value=\"" + J.cn + "\"></label>");
		q.p(h, "<div style=\"padding:5px 0\"><label>文件：<input id=\"Efs\" name=\"fs\" type=\"file\" style=\"width:360px\" /></label></div>");
		q.p(h, "<div id=\"Ein\" class=\"fs\" style=\"color:#060;text-align:center;\">　</div>");
		t.t(J.t, J.p, h.join(""), (J.id == 0 ? 0 : 1));
		q("#Ecn").E.onchange = cnch;
		q("#Efs").E.onchange = fsch;
		q("#wqEdel").E.onclick = del;
		q("#wqEok").E.onsubmit = function () {
			return up()
		};
		h = null;
	};

	W.w = w;
})(window);

// q
(function (W, U) {
	var D = W.document, q = function (S, O, C) {
		return new q.fn.fn(S, O, C)
	};
	q.fn = q.prototype = {
		//E Element(s),T innerText,H innerHtml
		E: "",
		V: "",
		T: "",
		H: "",

		//S Selector,O Object,C Callback
		fn: function (S, O, C) {
			if (S == U || !S) S = "1";
			if (typeof S == "function") C = S, O = D, S = 0;
			if (O == U) O = D;
			if (typeof O == "function") C = O, O = D;
			if (S) {
				var a = 0,
					b = "";
				if (S == "1") a = 1, this.E = O = D.body;
				else if (!S.indexOf("#")) a = 1, b = S.substr(1);
				else if (!S.indexOf("$")) a = 2, b = S.substr(1);
				else if (!S.indexOf(".")) a = 3, b = S.substr(1);
				else b = S;
				if (a == 1) {
					if (!this.E) this.E = D.getElementById(b);
					if (!this.E) this.E = "";
					else {
						this.V = this.E.value ? this.E.value : "";
						this.T = String(this.E.innerText), this.H = this.E.innerHTML;
					}
				} else {
					if (a == 2) {
						this.E = D.getElementsByName(b);
						if (!this.E.length) {
							a = O.all, this.E = [];
							for (i = 0; i < a.length; i++)
								if (a[i].name == b) this.E[this.E.length] = a[i];
						}
					} else if (a == 3) this.E = O.getElementsByClassName(b);
					else this.E = O.getElementsByTagName(b);
					if (!this.E.length) this.E = "";
				}
				a = b = null;
			}
			S = O = null;
			if (this.E && C != U) C(this.E);
			C = null;
		},

		//H innerHtml
		h: function (H) {
			if (typeof this.E == "object") this.E.innerHTML = H;
			H = null;
		},

		g: function (P) { return this.E.getAttribute(P); },

		//C Callback
		each: function (C) {
			if (C == U) return;
			if (this.E.length)
				for (var i = 0; i < this.E.length; i++) C(this.E[i]);
			C = null;
		},

		del: function () {
			var a = this.E;
			if (a) {
				if (a.length && a.tagName != "SELECT")
					while (a.length) a[0].parentElement.removeChild(a[0]);
				else {
					var b = a.id;
					while (a) {
						a.parentElement.removeChild(a);
						a = D.getElementById(b);
					}
					b = null;
				}
			}
			a = null;
		},

		//P tyPe,F Function or html
		add: function (P, F) {
			if (P == U || F == U) return;
			else {
				var a = this.E,
					b = function () {
						a.insertAdjacentHTML(P, F);
					};
				if (a) {
					if (a.length && a.tagName != "SELECT") a = a[0];
					if (P == "bb") P = "beforeBegin", b();
					else if (P == "ab") P = "afterBegin", b();
					else if (P == "be") P = "beforeEnd", b();
					else if (P == "ae") P = "afterEnd", b();
					else {
						if (typeof a.addEventListener != "undefined") a.addEventListener(P, F, false);
						else a.attachEvent("on" + P, F);
					}
				}
				a = b = null;
			}
			P = F = null;
		},

		//N keyCode,F Function
		key: function (N, F) {
			if (N == U || F == U || !this.E) return;
			else {
				var a = function () {
					var b = event ? event : W.event;
					if (b.keyCode == N) {
						b.returnValue = false;
						F(this);
					}
				};
				if (this.E.length && this.E.tagName != "SELECT")
					for (var i = 0; i < this.E.length; i++) this.E[i].onkeydown = a;
				else this.E.onkeydown = a;
			}
		}
	};
	q.fn.fn.prototype = q.fn;

	//S String
	q.a = function (S) {
		if (S == U || !S || S == 0) S = [];
		else {
			var ta = [];
			S = S.split(";");
			for (var i in S) {
				var tb = S[i].split(",");
				ta[i] = [];
				for (var j in tb) ta[i].push(tb[j]);
			}
			S = ta;
			ta = null;
		}
		return S;
	};

	//A Array,S String
	q.p = function (A, S) {
		A.push(S);
	};

	//S String,N Number
	q.j = function (S, N) {
		if (N == 1) return JSON.stringify(S);
		return JSON.parse(S);
	};

	//J Json
	q.d = function (J) {
		var a = new FormData();
		if (J == U || typeof J != "object") return a;
		for (var i in J) a.append(i, J[i]);
		return a;
	};

	//N Name,V Value,E Expries 0 delete
	q.ss = function (N, V) {
		var a = sessionStorage;
		if (V == 0) a.removeItem(N);
		else if (V != U) a.setItem(N, V);
		return a.getItem(N);
	};

	//N Name,V Value,E Expries 0 delete
	q.ck = function (N, V, E) {
		var a = D.cookie;
		if (a == U || N == U) {
			a = null;
			return V;
		}
		if (V == U) {
			var reg = new RegExp("(^| )" + N + "=([^;]*)(;|$)");
			if (a = a.match(reg)) V = a[2];
			else V = "";
			reg = null;
		} else {
			var b = new Date();
			b.setDate(b.getDate() + E);
			D.cookie = escape(N) + "=" + escape(V) + (E == U ? "" : "; expires=" + b.toGMTString());
			b = null;
		}
		N = E = a = null;
		return V;
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

	W.q = q;
})(window);

// m
(function (W, U) {
	// O Object, J Json, F Function
	var m = {
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
			O.innerHTML = a.join("");
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
			O.innerHTML = a.join("");
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
			O.innerHTML = a.join("");
			a = 0;
			for (var i in J) {
				if (!a) a = i;
				q("#wqMBs" + i).E.onclick = function () { o(this); };
			}
			o(q("#wqMBs" + a).E);
			O = J = a = null;
		},

		u: function (O, J) {
			var a = [];
			q.p(a, "<div class=\"hl\">");
			for (var i in J) q.p(a, "<a class=\"mr\" href=\"" + J[i] + "\" target=\"_blank\">" + i + "</a><br>");
			q.p(a, "</div>");
			O.innerHTML = a.join("");
			O = J = a = null;
		},

		//T daTe
		ut: function (T) {
			var a = {},
				b = new Date();
			if (T != U) b = new Date(T);
			a.y = b.getFullYear();
			a.n = b.getMonth() + 1;
			a.d = b.getDate();
			a.h = b.getHours();
			a.m = b.getMinutes();
			a.s = b.getSeconds();
			a.w = b.getDay();
			if (a.w == 1) a.w = "一";
			else if (a.w == 2) a.w = "二";
			else if (a.w == 3) a.w = "三";
			else if (a.w == 4) a.w = "四";
			else if (a.w == 5) a.w = "五";
			else if (a.w == 6) a.w = "六";
			else a.w = "日";
			b.setDate(a.d - 1);
			a.yy = b.getFullYear();
			a.yn = b.getMonth() + 1;
			a.yd = b.getDate();
			b.setDate(a.d + 1);
			a.ty = b.getFullYear();
			a.tn = b.getMonth() + 1;
			a.td = b.getDate();
			b.setMonth(a.n - 2);
			a.yny = b.getFullYear();
			a.ynn = b.getMonth() + 1;
			b.setMonth(a.n);
			a.tny = b.getFullYear();
			a.tnn = b.getMonth() + 1;
			for (var i in a)
				if (a[i] < 10) a[i] = "0" + a[i];
			a.dt = a.y + "-" + a.n + "-" + a.d;
			a.dn = a.y + "-" + a.n;
			a.ydt = a.yy + "-" + a.yn + "-" + a.yd;
			a.tdt = a.ty + "-" + a.tn + "-" + a.td;
			a.ut = a.dt + "T" + a.h + ":" + a.m;
			T = b = null;
			return a;
		},

		ss: function (S) {
			return S.replace(/,/g, "，").replace(/;/g, "；").replace(/\"/g, "＂").replace(/\'/g, "＇").replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, " ");
		},
		sn: function (S) {
			return S.replace(/[^0-9]/g, "");
		},
		sc: function (S) {
			return S.replace(/[^(a-z|A-Z|0-9)]/g, "");
		},
		sp: function (S) {
			S = m.ss(S);
			return S.replace(/ |　|\?|\:|\%|\=|\+|\-|\*|\/|\||\\|\<|\>|\{|\}/g, "");
		}
	};

	W.m = m;
})(window);

// t
(function (W, U) {
	// S String, T Text, P Prompt, H Html, N Number, C Callback
	var t = {
		t: function (T, P, H, N) {
			var a = q("#wqBtt").E;
			if (a) t.del("t");
			a = q("#wqBtt").E;
			if (!a) {
				a = [];
				q.p(a, "<div id=\"wqBtt\"></div>");
				q.p(a, "<div id=\"wqRtt\">");
				q.p(a, "<div id=\"wqHtt\" onmousedown=\"t.m.d(event)\" onmousemove=\"t.m.v(event)\" onmouseup=\"t.m.u(event)\">");
				q.p(a, "<div id=\"wqAtta\" class=\"fl\"></div>");
				q.p(a, "<div id=\"wqAttb\" class=\"fs\"></div>");
				q.p(a, "</div>");
				q.p(a, "<form id=\"wqEok\">");
				q.p(a, "<div id=\"wqAttc\"></div>");
				q.p(a, "<div id=\"wqTbt\">");
				if (N != 2) {
					q.p(a, "<input type=\"submit\" value=\"确定\" />");
					if (N == 1) q.p(a, "<input id=\"wqEdel\" type=\"button\" value=\"删除\" />");
					q.p(a, "<input type=\"reset\" value=\"重置\" />");
				}
				q.p(a, "<input type=\"button\" onclick=\"t.del()\" value=\"关闭\" />");
				q.p(a, "</div></form></div>");
				document.body.insertAdjacentHTML("beforeEnd", a.join(""));
				a = q("#wqBtt").E;
				if (a) {
					q("#wqAtta").h(T);
					q("#wqAttb").h(P);
					q("#wqAttc").h(H);
					t.ad("t");
				}
			}
			S = T = P = H = N = a = null;
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
				a = (W.innerWidth - c.offsetWidth) / 2 - 20;
				b = (W.innerHeight - c.offsetHeight) / 2 - 50;
				if (a < 0) a = 0;
				if (b < 0) b = 0;
				c.style.left = a + "px";
				c.style.top = b + "px";
			}
			S = a = b = c = null;
		},

		m: {
			o: 0,
			x: 0,
			y: 0,
			mx: 0,
			my: 0,
			f: 0,
			m: function (e) {
				this.o = q("#wqRtt").E;
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
	W.t = t;
})(window);
