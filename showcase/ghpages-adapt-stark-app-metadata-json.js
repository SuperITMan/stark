let fs = require("fs");

const version = require("../package.json").version;
const environment = "production";
const buildTimestamp = new Date().getTime();

let replacements = [
    { searchValue: /"version": ".*"/g, replaceValue: `"version": "${version}"` },
    { searchValue: /"environment": ".*"/g, replaceValue: `"environment": "${environment}"` },
    { searchValue: /"buildTimestamp": ".*"/g, replaceValue: `"buildTimestamp": "${buildTimestamp}"` }
];

replaceValuesInFile("src/stark-app-metadata.json", replacements);

function replaceValuesInFile(fileName, valueReplacements) {
	fs.readFile(fileName, "utf8", function(err, data) {
		if (err) {
			return console.error("Error while reading file => " + err);
		}

		let result = data;

		for (const replacement of valueReplacements) {
			result = result.replace(replacement.searchValue, replacement.replaceValue);
		}

		fs.writeFile(fileName, result, "utf8", function(err) {
			if (err) {
				return console.error(err);
			} else {
				return console.log(`${fileName} updated successfully`);
			}
		});
	});
}
