const { normalizeBitlink } = require('../utils/normalize-bitlink');

function countClicksForYear(decodes, bitlinkToUrl, year) {
	const longUrls = Array.from(new Set(bitlinkToUrl.values()));
	const counts = new Map(longUrls.map((u) => [u, 0]));
	
	for (const evt of decodes) {
		const ts = evt && evt.timestamp;
		const bitlinkRaw = evt && evt.bitlink;
		if (!ts || !bitlinkRaw) continue;
		const evtYear = new Date(ts).getUTCFullYear();
		if (evtYear !== Number(year)) continue;
		const key = normalizeBitlink(bitlinkRaw);
		
		const longUrl = bitlinkToUrl.get(key);

		if (!longUrl) continue;
		counts.set(longUrl, (counts.get(longUrl) || 0) + 1);
	}

	return Array.from(counts.entries())
		.map(([url, count]) => ({ url, count }))
		.sort((a, b) => b.count - a.count)
		.map(({ url, count }) => ({ [url]: count }));
}

module.exports = { countClicksForYear };


