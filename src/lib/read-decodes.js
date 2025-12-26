const fs = require('fs');

function readDecodesArray(filePath) {
	const text = fs.readFileSync(filePath, 'utf8').trim();
	if (!text) return [];
	const arr = JSON.parse(text);
	return Array.isArray(arr) ? arr : [];
}

module.exports = { readDecodesArray };


