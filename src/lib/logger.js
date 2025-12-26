
function format(level, message, meta) {
	const timestamp = new Date().toISOString();
	const base = `[${timestamp}] [${level}] ${message}\n`;
	if (meta === undefined) return base;
	try {
		return `${base} ${typeof meta === 'string' ? meta : JSON.stringify(meta)}`;
	} catch {
		return base;
	}
}

module.exports = {
	info(message, meta) {
		console.error(format('INFO', message, meta));
	},
	warn(message, meta) {
		console.error(format('WARN', message, meta));
	},
	error(message, meta) {
		console.error(format('ERROR', message, meta));
	}
};


