const path = require('path');
const { readDecodesArray } = require('../src/lib/read-decodes');

describe('readDecodesArray', () => {
	test('reads JSON array of events', () => {
		const p = path.resolve(__dirname, '../fixtures/decodes_sample.json');
		const events = readDecodesArray(p);
		expect(Array.isArray(events)).toBe(true);
		expect(events.length).toBeGreaterThan(0);
		expect(events[0]).toHaveProperty('bitlink');
		expect(events[0]).toHaveProperty('timestamp');
	});
    test('reads JSON array of events for empty file', () => {
        const p = path.resolve(__dirname, '../fixtures/decodes_empty.json');
        const events = readDecodesArray(p);
        expect(Array.isArray(events)).toBe(true);
        expect(events.length).toBe(0);
    });
});


