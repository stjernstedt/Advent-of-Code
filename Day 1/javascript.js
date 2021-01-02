let fileContent = "";
const reader = new FileReader();
document.getElementById("fileInput").addEventListener("change", function () {
	let reader = new FileReader();
	reader.onload = function () {
		fileContent = reader.result.split("\n");

		for (let i = 0; i < fileContent.length; i++) {
			for (let j = 0; j < fileContent.length; j++) {
				for (let k = 0; k < fileContent.length; k++) {
					if (parseInt(fileContent[i]) + parseInt(fileContent[j]) + parseInt(fileContent[k]) == 2020) {
						console.log(parseInt(fileContent[i]) * parseInt(fileContent[j]) * parseInt(fileContent[k]));
					}
				}
			}

		}
	}

	reader.readAsText(this.files[0]);

})