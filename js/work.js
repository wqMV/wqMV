onmessage = function (J) {
	J = J.data;
	console.log(J)
	postMessage(J);
}
