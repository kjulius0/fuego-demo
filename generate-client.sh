#!/bin/bash

set -e

echo "Generating OpenAPI specification..."

# Generate OpenAPI spec from the already built binary
./tmp/main --openapi --format json > services/api-server/doc/openapi.json

echo "Generated OpenAPI spec at services/api-server/doc/openapi.json"

# Check if we're in a container with Node.js available
if command -v npx >/dev/null 2>&1 && [ -d "services/web" ]; then
    echo "Generating TypeScript client..."
    cd services/web
    npx openapi-generator-cli generate \
      -i ../api-server/doc/openapi.json \
      -g typescript-axios \
      -o ./src/client \
      --additional-properties=supportsES6=true,npmName=fuego-api-client,npmVersion=1.0.0 \
      --skip-validate-spec
    echo "Generated TypeScript client in services/web/src/client"
    cd ..
else
    echo "Node.js not available or not in development environment, skipping client generation"
fi