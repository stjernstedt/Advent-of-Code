document.getElementById("fileInput").addEventListener("change", function () {
	let reader = new FileReader();
	reader.onload = function () {
		lines = reader.result.split(/\n/);

		console.log(readMap(lines));
	}

	reader.readAsText(this.files[0]);
})

function readMap(lines) {
	let xIncrement = 1;
	let yIncrement = 2;
	let x = xIncrement;
	let trees = 0;

	for (let line = yIncrement; line < lines.length; line += yIncrement) {
		if (x > 30) x = x - 31;

		if (lines[line][x] == "#") {
			trees++;
		}
		x += xIncrement;
	}

	return trees;
}