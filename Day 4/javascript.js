document.getElementById("fileInput").addEventListener("change", function () {
	const reader = new FileReader();

	reader.onload = function () {
		lines = reader.result.split(/\n/);

		console.log(checkPassports(lines));
	}
	reader.readAsText(this.files[0]);
})

function checkPassports(lines) {
	let passports = [];
	passports.push([]);
	let count = 0;

	lines.forEach(line => {
		if (line.trim().length) {
			line.trim();
			let fields = line.split(/\s/);

			fields.forEach(field => {
				let fieldValue = field.split(":");
				passports[count][fieldValue[0]] = fieldValue[1];
			});
		} else {
			count++;
			passports.push([]);
		}
	});

	let validPassports = 0;
	passports.forEach(passport => {
		if (checkIfValid(passport)) validPassports++;
	});
	return validPassports;
}

function checkIfValid(passport) {
	if ("byr" in passport && "iyr" in passport && "eyr" in passport && "hgt" in passport && "hcl" in passport && "ecl" in passport && "pid" in passport) {
		if (passport["byr"] < 1920 || passport["byr"] > 2002 || !passport["byr"].match(/^\d{4}$/)) return false;
		if (passport["iyr"] < 2010 || passport["iyr"] > 2020 || !passport["iyr"].match(/^\d{4}$/)) return false;
		if (passport["eyr"] < 2020 || passport["eyr"] > 2030 || !passport["eyr"].match(/^\d{4}$/)) return false;
		if (passport["hgt"].indexOf("cm") != -1) {
			let height = passport["hgt"].split(/cm/)[0];
			if (height < 150 || height > 193 || !height.match(/^\d{3}$/)) return false;
		} else if (passport["hgt"].indexOf("in") != -1) {
			let height = passport["hgt"].split(/in/)[0];
			if (height < 59 || height > 76 || !height.match(/^\d{2}$/)) return false;
		} else { return false; }
		if (!passport["hcl"].match(/^#[0-9a-f]{6}$/)) return false;
		if (!passport["ecl"].match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) return false;
		if (!passport["pid"].match(/^\d{9}$/)) return false;
	} else { return false; }
	return true;
}