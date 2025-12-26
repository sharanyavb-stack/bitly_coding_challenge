const path = require('path');
const { readEncodesFromCsv } = require('../src/lib/read-encodes-from-csv');

describe('readEncodesFromCsv', () => {
	test('builds bitlink->url map and unique url list from sample CSV', () => {
		const p = path.resolve(__dirname, '../fixtures/encodes_sample.csv');
		const { bitlinkToUrl, longUrls } = readEncodesFromCsv(p);
		expect(bitlinkToUrl.get('bit.ly/abc123')).toBe('https://example.com/page');
		expect(bitlinkToUrl.get('bit.ly/def456')).toBe('https://example.org/');
		expect(longUrls.sort()).toEqual(['https://example.com/page', 'https://example.org/'].sort());
	});

	test('returns empty map/list for empty CSV', () => {
		const p = path.resolve(__dirname, '../fixtures/encodes_empty.csv');
		const { bitlinkToUrl, longUrls } = readEncodesFromCsv(p);
		expect(bitlinkToUrl instanceof Map).toBe(true);
		expect(bitlinkToUrl.size).toBe(0);
		expect(longUrls).toEqual([]);
	});

	test('throws on missing required headers', () => {
		const p = path.resolve(__dirname, '../fixtures/encodes_missing_headers.csv');
		expect(() => readEncodesFromCsv(p)).toThrow(/Invalid header/i);
	});

	test('skips malformed rows (fewer than 3 columns)', () => {
		const p = path.resolve(__dirname, '../fixtures/encodes_malformed_rows.csv');
		const { bitlinkToUrl, longUrls } = readEncodesFromCsv(p);
		// Only the valid row should be present; rows missing columns or with empty hash are skipped
		expect(bitlinkToUrl.size).toBe(1);
		expect(bitlinkToUrl.get('bit.ly/valid1')).toBe('https://valid.example/');
		expect(longUrls).toEqual(['https://valid.example/']);
	});
});


