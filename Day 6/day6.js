const fs = require('fs');
const content = fs.readFileSync('answers.txt', 'utf-8');

const lines = content.split('\n');

let totalAnswers = 0;
// let answers = [];
let answers = null;
let currentLine = [];
for (const line of lines) {
	// For part 1
	//	----------
	// for (token of line.trim()) {
	// 	if (!answers.includes(token)) {
	// 		answers.push(token);
	// 	}
	// }
	// if (!line.trim().length) {
	// 	totalAnswers += answers.length;
	// 	answers = [];
	// }
	if (!answers) {
		answers = [...line.trim()];
	}

	if (!line.trim().length) {
		totalAnswers += answers.length;
		answers = null;
	} else {
		currentLine = [...line.trim()];
		answers = answers.filter(value => currentLine.includes(value));
	}
}

console.log(totalAnswers);