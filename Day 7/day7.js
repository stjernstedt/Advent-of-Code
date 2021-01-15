const fs = require('fs');
const content = fs.readFileSync('bags.txt', 'utf-8');

const lines = content.split('\n');

class Node {
	constructor(parent, amount, type) {
		this.parent = parent;
		this.amount = amount;
		this.type = type;
	}
}

const bagRules = [];
let nodes = [];
let hasShinyGold = [];
const regex = /(\w+ \w+) bags? contain (.+)./;
const regex2 = /(\w+ \w+) bags*/g;
const regex3 = /(\d+) (\w+ \w+) bags*/g;
let match;
for (line of lines) {
	if (!line.trim().length) {
		for (const key in bagRules) {
			nodes.push(new Node(null, 1, key));
			containsShinyGold(nodes.pop());
		}
	} else {
		match = line.match(regex);
		const [_, type, contents] = line.match(regex);
		bagRules[type] = contents;
	}

}

function containsShinyGold(bagNode) {
	while (matches = regex3.exec(bagRules[bagNode.type])) {
		if (matches[2] != 'no other') {
			nodes.push(new Node(bagNode, matches[1], matches[2]));
			if (matches[2] == 'shiny gold') {
				markAllParents(bagNode);
			}
		}
	}
	if (nodes.length > 0) {
		containsShinyGold(nodes.pop());
	}
}

function markAllParents(bagNode) {
	if (!hasShinyGold.includes(bagNode.type)) {
		hasShinyGold.push(bagNode.type);
	}
	if (bagNode.parent) {
		markAllParents(bagNode.parent);
	}
}

totalBags = 0;


// console.log(hasShinyGold.length);