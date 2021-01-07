const fs = require('fs');
const content = fs.readFileSync('boardingpasses.txt', 'utf-8');
const lines = content.split('\n');

let boardingpasses = [];
let highestId = 0;
for (line of lines) {
	let currentId = getSeatId(line);
	boardingpasses.push(currentId);
	if (currentId > highestId) highestId = currentId;
}
boardingpasses.sort();

console.log('Highest id: ' + highestId);
console.log('Own id: ' + getOwnId(boardingpasses));

function getSeatId(boardingpass) {
	let leftIndex = 0;
	let rightIndex = 127;
	let rowIndex;
	let columnIndex;
	const regex = /((B|F){7})((L|R){3})/;
	let [_, row, __, column] = boardingpass.match(regex);
	for (const token of row) {
		rowIndex = Math.floor((leftIndex + rightIndex) / 2);
		if (token == 'F') rightIndex = rowIndex;
		if (token == 'B') leftIndex = rowIndex + 1;
		rowIndex = leftIndex;
	}

	leftIndex = 0;
	rightIndex = 7;
	for (const token of column) {
		columnIndex = Math.floor((leftIndex + rightIndex) / 2);

		if (token == 'L') rightIndex = columnIndex;
		if (token == 'R') leftIndex = columnIndex + 1;
		columnIndex = leftIndex;
	}

	return (rowIndex * 8) + columnIndex;
}

function getOwnId(boardingpasses) {
	for (pass of boardingpasses) {
		if (!boardingpasses.includes(pass + 1) && boardingpasses.includes(pass + 2)) return pass + 1;
	}
}