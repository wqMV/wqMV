"use strict";

(() => {
    /*
    el: element *, id: *, ht: innerHTML, hb: button, dy: 0,
    bt: { e: edit, ad: add, rd: import, rm: delete, ex: export }
    fd: { se:{ type: }, ed:{ type: } } *
    th: { t: 'title' *, v: ['column 1', 'column 2'] *,
        c: click [0, 1], w: [width, 0], h: height,
        ch: check, nu: serial
    }
    ed: {
        t: 'title' *,
        k: ['name1', 'name2'] *,
        f: file index,
        p: { name2: [edit, br, 'textarea/type', height/width, 'style'] }
    }
    fn: {
        se: s => { return s },
        ed: {
            cj: s => { return s }
        },
        ex: s => { return h.j('') }
    }

    // E.g
    el: q('Wtb'),
	id: 'WQtb',
	ht: h.j(''),
	bt: { ad: 1, rd: 1, rm: 1, ex: 1 },
	fd: {
		se: { op: 'test' },
		ed: { typ: 'djg', op: 'aq' }
	},
	th: {
		t: 'title',
		v: ['column 1', 'column 2', 'column 3'],
		c: [0, 1, 1],
		w: [10, 0, 20],
		h: 20,
		ch: 1, nu: 1
	},
	ed: {
		t: 'edit',
		k: ['name1', 'name2', 'name3'],
		f: 2,
		p: {
            name1: [1, 0],
            name2: [1, 1, '', 5, 'required'],
            name3: [1, 1, 't', 4]
		}
	},
	fn: {
        se: s => { return q.j(s) },
        td: a => { return '' },
        ed: {
            cj: s => { return s }
        },
        ex: s => { return h.j('') }
    }
    */

    const tb = J => {
        let o = J.th.v.length, h = [];

        J.n = o;
        1 == J.th.ch && o++;
        1 == J.th.nu && o++;
        J.th.h = J.th.h ? J.th.h : '';

        h.p(`<div class="p5 gs"><form id="${J.id}_se" class="di" onsubmit="return false">`);
        for (let i in J.fd.se) h.p(`<input name="${i}" type="hidden" value="${J.fd.se[i]}">`);
        h.p(`${J.ht}</form>`);
        delete J.fd.se;
        delete J.ht;

        h.p(`<input type="button" onclick="tb.se('${J.id}')" value="搜索">`);
        if (J.bt) {
            0 == J.bt.e || (
                1 == J.bt.ad && h.p(`<input type="button" onclick="tb.ed('${J.id}',event,1)" value="新增">`),
                1 == J.bt.rd && h.p(`<input type="button" onclick="tb.rd('${J.id}')" value="导入">`),
                1 == J.bt.rm && h.p(`<input type="button" onclick="tb.rm('${J.id}')" value="删除">`)
            );
            1 == J.bt.ex && h.p(`<input type="button" onclick="tb.ex('${J.id}')" value="导出">`);
        }
        J.hb && h.p(J.hb);
        delete J.hb;
        h.p(`</div>`);

        h.p(`<table id="${J.id}_tb" border="1" cellpadding="5" class="df dc d1 m5t bd fs">`);
        h.p(`<thead id="${J.id}_th" style="display: table; width: calc( 100% - 1rem - 3px )">`);
        h.p(`<tr><th id="${J.id}_tc" colspan="${o}" class="fl">${J.th.t}</th></tr>`);
        h.p(`<tr class="gs">`);
        1 == J.th.ch && h.p(`<th style="width: 2rem">选择</th>`);
        1 == J.th.nu && h.p(`<th style="width: 2rem">序号</th>`);
        for (let i = 0; i < J.n; i++) {
            h.p(`<th style="height: ${J.th.h}px`);
            J.th.w && J.th.w[i] && h.p(`; width: ${J.th.w[i]}rem`);
            h.p(`">${J.th.v[i]}</th>`)
        }
        h.p(`</tr></thead>`);

        h.p(`<tbody id="${J.id}_td" class="df dc dy" style="${0 == J.dy ? 'flex: 1' : 'flex: 1 0 0'}"`);
        0 == J.bt.e || h.p(` onclick="tb.ed('${J.id}',event)"`);
        h.p(` c></tbody></table>`);

        o = J.el;
        o.innerHTML = h.j('');

        delete J.dy;
        delete J.el;
        delete J.bt;
        delete J.th.t;
        q(`${J.id}_tb`).J = J;

        J = null, h = null, o = null
    };

    tb.se = S => {
        let J = q(`${S}_tb`).J;

        w({
            d: new FormData(q(`${S}_se`)),
            // id: [1, 2]
            c: e => {
                q(`${S}_td`).h = '';
                0 == e || tb.td(S, J.fn && J.fn.se ? J.fn.se(e) : q.j(e));
                J = null, e = null
            }
        })
    };

    tb.td = (S, T) => {
        let J = q(`${S}_tb`).J;
        let m = 0, h = [];

        for (let i in T) {
            h.p(`<tr i="${i}"${m % 2 ? ' class="gs"' : ''}`);
            h.p(` style="display: table; width: calc( 100% - 2px ); `);
            J.fn && J.fn.td && h.p(J.fn.td(T[i]));
            h.p(`">`);
            1 == J.th.ch && h.p(`<td style="width: 2rem"><input type="checkbox"></td>`);
            1 == J.th.nu && h.p(`<td style="width: 2rem">${m + 1}</td>`);
            for (let n = 0; n < J.n; n++) {
                h.p(`<td style="height: ${J.th.h}px`);
                J.th.w && J.th.w[n] && h.p(`; width: ${J.th.w[n]}rem`);
                h.p(`" c${J.th.c && 0 == J.th.c[n] ? '' : '="1"'}>`);
                h.p(`${T[i][n]}</td>`)
            }
            h.p(`</tr>`);
            m++
        }
        q(`${S}_td`).h = h.j('');
        S = null, T = null, J = null, h = null, m = null
    };

    tb.ed = (S, e, n) => {
        const up = () => {
            w({
                d: new FormData(q('_w_F')),
                c: e => {
                    if (2 == e) {
                        let f = q('_w_F');

                        v.l();
                        if (f.o.o) {
                            let J = q(`${f.o.s}_tb`).J, o = [], l = 0

                            for (let i = 0; i < f.length; i++)
                                'hidden' == f[i].type || 'button' == f[i].type || 'submit' == f[i].type || 'reset' == f[i].type || o.p(f[i]);
                            e = q('@TD', f.o.o);
                            l = e.length - J.n;
                            f = J.ed.k;
                            for (let i = 0; i < f.length; i++) e[i + l].h = o[i].value;
                            J = null, o = null, l = null
                        } else tb.se(f.o.s)
                        f = null;
                        v.del();
                        v.del('l');
                        v.i(u.ok)
                    } else v.i(u.e, 1);
                    e = null
                }
            });
            return false
        };

        const rm = () => {
            v.c({
                h: `您确定要进行 删除 操作吗？`,
                c: () => {
                    let f = q('_w_F');
                    f = q(`${f.o.s}_tb`).J.fd.ed;
                    f.op = 'qdrm';

                    w({
                        d: f,
                        c: e => {
                            if (2 == e) {
                                let o = f = q('_w_F').o.o;
                                o.remove();
                                v.del();
                                o = null
                            } else v.i(u.e, 1)
                        }
                    });
                    f.op = 'qded';
                    f = null
                }
            })
        };

        let o = e.target;
        let c = n;

        1 == n || (c = o.getAttribute("c"));
        if (1 != c) {
            S = null, o = null, n = null, c = null;
            return
        }

        let J = q(`${S}_tb`).J;
        let h = [];

        if (1 == n) {
            c = [];
            for (let i = 0; i < J.n; i++) c.p(document.createElement('td'));
            J.o = c;
            J.id = 0
        }
        else {
            o = o.parentNode;
            J.o = q('@TD', o);
            J.o.splice(0, J.o.length - J.n);
            J.id = o.getAttribute('i')
        }
        n = null, c = null;

        J.ed.f || (J.fd.ed.id = J.id);
        for (let i in J.fd.ed) h.p(`<input name="${i}" type="hidden" value="${J.fd.ed[i]}">`);

        e = o;
        o = document.createElement('div');
        for (let i = 0; i < J.n; i++) {
            let k = J.ed.k[i];

            if (J.ed.p[k]) {
                let p = J.ed.p[k];
                let m = [`<label>${J.th.v[i]}:`];

                if (0 == p[0]) continue;
                if (J.fn && J.fn.ed && J.fn.ed[k]) m.p(J.fn.ed[k](J.o[i].textContent))
                else {
                    if ('t' == p[2]) {
                        m.p(`<textarea name="${k}"`);
                        p[3] && m.p(` style="height: ${p[3]}rem"`);
                        p[4] && m.p(` ${p[4]}`);
                        m.p(` onchange="m.ts.call(this)">${J.o[i].textContent}</textarea>`)
                    }
                    else {
                        m.p(`<input name="${k}" type="${p[2] ? p[2] : 'text'}"`);
                        p[3] && m.p(` style="width: ${p[3]}rem"`);
                        p[4] && m.p(` ${p[4]}`);
                        m.p(` value="${J.o[i].textContent}" onchange="m.ts.call(this)">`)
                    }
                }
                m.p(`</label>`);
                o.innerHTML += m.j('');
                m = null;

                if (p[1]) {
                    h.p(`<div>${o.innerHTML}</div>`);
                    o = document.createElement('div')
                }
                p = null
            }
            k = null
        }
        o.innerHTML && h.p(`<div>${o.innerHTML}</div>`);

        o = {
            t: J.ed.t,
            h: h.j(''),
            m: J.id ? 1 : 0
        };
        if (J.ed.f) {
            v.f(o)
        } else v.t(o);
        o = q('_w_F');
        o.o = { s: S, o: 0 == J.id ? 0 : e };
        o.onsubmit = () => { return up() };
        q('_w_D') && (q('_w_D').onclick = rm);
        S = null, J = null, h = null, o = null, e = null
    };

    tb.ex = S => {
        const b64 = s => window.btoa(unescape(encodeURIComponent(s)));
        const url = 'data:application/vnd.ms-excel;base64,';

        let o = q(`${S}_tc`), s = o.t, J = q(`${S}_tb`).J;
        let h = [];

        h.p(`<html xmlns:o="urn:schemas-microsoft-com:office:office"`);
        h.p(` xmlns:x="urn:schemas-microsoft-com:office:excel"`);
        h.p(` xmlns="http://www.w3.org/TR/REC-html40">`);
        h.p(`<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">`);
        h.p(`<!--[if gte mso 9]><xml>`);
        h.p(`<x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>`);
        h.p(`<x:Name>Sheet1</x:Name>`);
        h.p(`<x:WorksheetOptions><x:DisplayGridlines/>`);
        h.p(`</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>`);
        h.p(`</xml><![endif]--></head>`);
        h.p(`<body><table border="1">`);
        h.p(q(`${S}_th`).h);
        h.p(q(`${S}_td`).h);
        J.fn && J.fn.ex && h.p(J.fn.ex(o.g('colspan')));
        h.p(`</table></body></html>`);

        o = document.createElement('a');
        o.href = url + b64(h.j(''));
        o.download = `${s.replace(/ /g, '')}.xls`;
        o.click();

        J = null, o = null, s = null, h = null
    };

    window.tb = tb
})();
