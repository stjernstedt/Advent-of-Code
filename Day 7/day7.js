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
const regex2 = /(\d+) (\w+ \w+) bags*/g;
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
	while (matches = regex2.exec(bagRules[bagNode.type])) {
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


class Node2 {
	constructor(amount, type, parent) {
		this.children = [];
		this.amount = amount;
		this.type = type;
		this.parent = parent;
		this.trail = [];
	}
}

totalBags = 0;
let startNode = new Node2(1, 'shiny gold');

function populateTree(bagNode) {
	while (matches = regex2.exec(bagRules[bagNode.type])) {
		if (matches[2] != 'no other') {
			let child = new Node2(matches[1], matches[2], bagNode);
			child.trail.push(bagNode.amount);
			bagNode.children.push(child);
		}
	}
	if (bagNode.type != 'no other') {
		for (child of bagNode.children) {
			populateTree(child);
		}
	}
}

function sumNodes(bagNode) {
	if (bagNode.children.length > 0) {
		for (child of bagNode.children) {
			let fact = 0;
			for (let i = child.trail.length - 1; i <= 0; i--) {
				fact += child.trail[i] * child.amount;
			}
			totalBags += fact;
			sumNodes(child);
		}
	}
}

function test(bagNode) {
	// walk through parents
}

// populateTree(startNode);
// sumNodes(startNode);
// console.log(totalBags);

// console.log(hasShinyGold.length);
