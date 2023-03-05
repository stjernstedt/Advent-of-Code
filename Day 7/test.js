const fs = require('fs');
const content = fs.readFileSync('test.txt', 'utf-8');

const rules = content.split('\n').map(line => getRule(line));

const map = new Map();
for (const { inner, outer } of rules) {
	for (const { bag } of inner) {
		if (!map.has(bag)) {
			map.set(bag, new Set());
		}
		map.get(bag).add(outer);
	}
}

const result = new Set();
const visited = new Set();
findOuter('shiny gold');
console.log(result.size);

function findOuter(innerBag) {
	if (!map.has(innerBag)) return;
	if (visited.has(innerBag)) return;
	visited.add(innerBag);

	for (const outer of map.get(innerBag)) {
		result.add(outer);
		findOuter(outer);
	}
}

// gets input in form of 'light red bags contain 1 bright white bag, 2 muted yellow bags.' etc.
function getRule(ruleString) {
	// splits each bag into bagtype and what kind of bags it contains
	const [_, outer, contains] = ruleString.match(/(.*) bags contain (.*)\./);

	//further splits the contained bags into separate bags and sets the amount and type
	const inner = contains.split(', ').map(contain => {
		if (contain == 'no other bags') return null;
		const [_, amount, bag] = contain.match(/(\d*) (.*) bags?/);
		return { amount, bag };
	}).filter(Boolean); //filters out everything that returns false, i.e. null


	return {
		outer,
		inner
	}
}