const { normalizeBitlink } = require('../src/utils/normalize-bitlink');

describe('normalizeBitlink', () => {
	test('removes http/https scheme and trailing slashes', () => {
		expect(normalizeBitlink('https://bit.ly/abc123/')).toBe('bit.ly/abc123');
		expect(normalizeBitlink('http://bit.ly/abc123///')).toBe('bit.ly/abc123');
		expect(normalizeBitlink('bit.ly/abc123')).toBe('bit.ly/abc123');
	});

	test('returns undefined for non-string input', () => {
		expect(normalizeBitlink(null)).toBeUndefined();
		expect(normalizeBitlink(undefined)).toBeUndefined();
		expect(normalizeBitlink(123)).toBeUndefined();
	});
});


