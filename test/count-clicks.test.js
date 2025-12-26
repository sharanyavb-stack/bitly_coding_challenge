const path = require('path');
const { readEncodesFromCsv } = require('../src/lib/read-encodes-from-csv');
const { readDecodesArray } = require('../src/lib/read-decodes');
const { countClicksForYear } = require('../src/lib/count-clicks');

describe('countClicksForYear', () => {
	test('counts clicks per long URL including zeros using fixtures', () => {
		const encPath = path.resolve(__dirname, '../fixtures/encodes_sample.csv');
		const decPath = path.resolve(__dirname, '../fixtures/decodes_sample.json');
		const { bitlinkToUrl, longUrls } = readEncodesFromCsv(encPath);
		const events = readDecodesArray(decPath);
		const result = countClicksForYear(events, bitlinkToUrl, 2021);
		expect(result).toContainEqual({ 'https://example.com/page': 2 });
		expect(result).toContainEqual({ 'https://example.org/': 0 });
		expect(result.length).toBe(longUrls.length);
	});

	test('sorting by count desc', () => {
		const map = new Map([
			['bit.ly/a', 'u1'],
			['bit.ly/b', 'u2']
		]);
		const events = [
			{ bitlink: 'bit.ly/a', timestamp: '2021-01-01T00:00:00Z' },
			{ bitlink: 'bit.ly/a', timestamp: '2021-06-01T00:00:00Z' },
			{ bitlink: 'bit.ly/b', timestamp: '2021-07-01T00:00:00Z' }
		];
		const result = countClicksForYear(events, map, 2021);
		expect(result[0]).toEqual({ u1: 2 });
		expect(result[1]).toEqual({ u2: 1 });
	});

	test('ignores decodes with unseen bitlinks (guard at line 15)', () => {
		const map = new Map([['bit.ly/a', 'u1']]);
		const events = [{ bitlink: 'bit.ly/unknown', timestamp: '2021-03-01T00:00:00Z' }];
		const result = countClicksForYear(events, map, 2021);
		// Only known URLs should appear; unknown bitlink should be ignored
		expect(result).toEqual([{ u1: 0 }]);
	});
});


