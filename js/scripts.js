function testInstanceOf() {
	var name = new EmptyField;
	console.log(name instanceof EmptyField);
	console.log(name instanceof Field);
	console.log(name instanceof AppleField);
}

function testObjects() {
	console.log({});
	console.log([]);
	console.log("");
}