FROM node:18-alpine

WORKDIR /app

# Install production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source and data (expects data/encodes.csv and data/decodes.json to exist)
COPY src ./src
COPY data ./data

# Default entry allows overriding year at runtime:
# docker run --rm app-image --year=2020
ENTRYPOINT ["node", "src/index.js"]
CMD ["--year=2021"]


