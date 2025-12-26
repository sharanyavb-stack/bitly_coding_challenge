const fs = require('fs');
const { normalizeBitlink } = require('../utils/normalize-bitlink');

function readEncodesFromCsv(filePath) {
	const text = fs.readFileSync(filePath, 'utf8').trim();
	const lines = text.split(/\r?\n/);
	if (lines.length <= 1) return { bitlinkToUrl: new Map(), longUrls: [] };

	const header = lines[0].split(',');
	const idxLong = header.findIndex((h) => h.trim().toLowerCase() === 'long_url');
	const idxDomain = header.findIndex((h) => ['short_domain', 'domain'].includes(h.trim().toLowerCase()));
	const idxHash = header.findIndex((h) => h.trim().toLowerCase() === 'hash');

	if (idxLong === -1 || idxDomain === -1 || idxHash === -1) {
		throw new Error('Invalid header. Expecting long_url, short_domain|domain, hash');
	}

	const bitlinkToUrl = new Map();
	const urls = [];

	for (let i = 1; i < lines.length; i++) {
		const parts = lines[i].split(',');
		if (parts.length < 3) continue;

		const longUrl = (parts[idxLong] || '').trim();
		const domain = (parts[idxDomain] || '').trim();
		const hash = (parts[idxHash] || '').trim();
		if (!longUrl || !domain || !hash) continue;

		const key = normalizeBitlink(`${domain}/${hash}`);
		if (!key) continue;
		bitlinkToUrl.set(key, longUrl);
		urls.push(longUrl);
	}
	return { bitlinkToUrl, longUrls: Array.from(new Set(urls)) };
}

module.exports = { readEncodesFromCsv };


