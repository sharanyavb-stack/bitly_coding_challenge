## Bitly Backend Coding Challenge (Node.js)

Compute click counts per long URL for a given year using:
- `data/encodes.csv`: mapping of long URLs to bitlink components (`domain`, and `hash`)
- `data/decodes.json`: click events with `bitlink` and `timestamp`

Outputs a JSON array of objects, each `{ "LONG_URL": count }`, sorted by count descending.

### Requirements
- Node.js 18+ (tested with Node 23)

### Install
```bash
npm install
```

### Data
Place the provided files into `data/`:
- `data/encodes.csv`
- `data/decodes.json`

Headers expected in `encodes.csv`:
- `long_url` (string)
- `domain` (string)
- `hash` (string)

### Run
- Default (year 2021):
```bash
npm start
```

Other input combinations:
- No year (defaults to 2021):
```bash
node src/index.js
```
- Different year:
```bash
node src/index.js --year=2020
```
- Save output JSON to a file (any year):
```bash
node src/index.js --year=2021 > result.json
```

### Docker (optional)
Build:
```bash
docker build -t bitly-clicks .
```

Run (defaults to 2021):
```bash
docker run --rm bitly-clicks
```

Run with a different year:
```bash
docker run --rm bitly-clicks --year=2020
```

Write output to a file:
```bash
docker run --rm bitly-clicks --year=2021 > result.json
```


The program prints the result array to stdout, for example:
```json
[{"https://youtube.com/":557},{"https://twitter.com/":512}]
```


### Logging
- Informational and error logs go to stderr via `src/lib/logger.js`, keeping stdout reserved for the JSON result.
- Unexpected/malformed rows in CSV are skipped; missing `encode` for a `bitlink` in decodes is ignored.

### Tests
```bash
npm test
```
Unit tests cover utilities and modules:
- `test/normalize-bitlink.test.js`
- `test/read-encodes-from-csv.test.js`
- `test/read-decodes.test.js`
- `test/count-clicks.test.js`

Fixtures:
- `fixtures/encodes_sample.csv`, `fixtures/encodes_empty.csv`, `fixtures/encodes_missing_headers.csv`, `fixtures/encodes_malformed_rows.csv`
- `fixtures/decodes_sample.json`, `fixtures/decodes_empty.json`

### Design Notes
- Simplicity first: file-based (CSV/JSON) with small, focused modules.
- Filenames use kebab-case for consistency:
  - `src/utils/normalize-bitlink.js`
  - `src/lib/read-encodes-from-csv.js`
  - `src/lib/read-decodes.js`
  - `src/lib/count-clicks.js`
  - `src/lib/logger.js`
- Normalization of bitlinks:
  - strip leading `http://` or `https://`
  - remove trailing slashes
  - preserve case (bitlink hash is treated as case-sensitive)
- Only decodes in the specified year are counted.
- All `encodes` URLs are included with zero if they have no clicks for that year.
- Sorting is by count descending;

### Acceptance Criteria Checklist
- Count clicks only if they occurred in 2021 (or the year passed via `--year=YYYY`).
- Output is a sorted array of `{ "LONG_URL": count }` objects to stdout.
- Logs relevant actions/unexpected conditions to stderr.
- Includes unit tests and this README with instructions.


