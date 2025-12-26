const path = require('path');
const logger = require('./lib/logger');
const { readEncodesFromCsv } = require('./lib/read-encodes-from-csv');
const { readDecodesArray } = require('./lib/read-decodes.js');
const { countClicksForYear } = require('./lib/count-clicks');

function main() {
	const encodesCsvPath = path.resolve(__dirname, '../data/encodes.csv');
	const decodesJsonPath = path.resolve(__dirname, '../data/decodes.json');

	let year = 2021;
	const argv = process.argv.slice(2);
	if (argv.length > 0) {
		for (let i = 0; i < argv.length; i++) {
			const arg = argv[i];
			if (arg.startsWith('--year=')) {
				const value = Number(arg.split('=')[1]);
				if (value && /^[0-9]{4}$/.test(String(value))) {
					year = value;
					break;
				} else {
					logger.error('Invalid --year value. Provide a 4-digit year, e.g., --year=2021');
					process.exitCode = 2;
					return;
				}
			} else {
				logger.error('Invalid argument. Provide a 4-digit year, e.g., --year=2021');
				process.exitCode = 2;
				return;
			}
		}
	}

	try {
		const { bitlinkToUrl } = readEncodesFromCsv(encodesCsvPath);
		const decodes = readDecodesArray(decodesJsonPath);
		const result = countClicksForYear(decodes, bitlinkToUrl, year);
		console.log(JSON.stringify(result, null, 2));
	} catch (err) {
		logger.error('Failed to compute counts', { message: err && err.message });
		process.exitCode = 1;
	}
}

if (require.main === module) {
	main();
}
