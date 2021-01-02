// function checkPassword(range, character, password) {
// 	let count = 0;
// 	let rangeHighLow = range.split("-");
// 	for (let i = 0; i < password.length; i++) {
// 		if (password[i] == character[0]) count++;
// 	}

// 	if (count >= rangeHighLow[0] && count <= rangeHighLow[1])
// 		return true;
// 	else return false;
// }

function checkPassword(range, character, password) {
	let rangeHighLow = range.split("-");
	if (password[rangeHighLow[0] - 1] == character[0] && password[rangeHighLow[1] - 1] == character[0]) return false;
	if (password[rangeHighLow[0] - 1] == character[0] || password[rangeHighLow[1] - 1] == character[0]) return true;
}

let fileContent = "";
// const reader = new FileReader();
document.getElementById("fileInput").addEventListener("change", function () {
	let reader = new FileReader();
	let validPasswords = 0;
	reader.onload = function () {
		fileContent = reader.result.split(/\n/);
		for (let i = 0; i < fileContent.length - 1; i++) {
			/* TODO: filter each part into own var */
			// let range = fileContent[i].split(/\d{2}-\d{2}/);
			let result = fileContent[i].split(/\s/);
			if (checkPassword(result[0], result[1], result[2])) {
				console.log("true");
				validPasswords++;
			}
			else console.log("false");
		}
		console.log(validPasswords);
	}

	reader.readAsText(this.files[0]);

})