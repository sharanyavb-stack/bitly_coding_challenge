function normalizeBitlink(value) {
	if (!value || typeof value !== 'string') return undefined;
	let s = value.trim();
	s = s.replace(/^https?:\/\//i, '');
	s = s.replace(/\/+$/, '');
	return s;
}

module.exports = { normalizeBitlink };


