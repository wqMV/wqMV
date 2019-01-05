var a = q(":oN").css({ color: "#f00", background: "#00f" });
var b = q.c("aa", "bb");
console.log(a);
b = '"a":"aa","b":"bb"';
console.log(q.j(b));
q.m("test", () => { alert("ok") });
