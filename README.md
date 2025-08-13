# Fuego API with React Frontend

This project demonstrates a Go API built with Fuego framework and a React frontend client, both containerized with Docker.

## Project Structure

```
.
├── services/
│   ├── api-server/          # Go API server
│   │   ├── main.go
│   │   ├── go.mod
│   │   ├── Dockerfile       # Production
│   │   └── Dockerfile.dev   # Development
│   └── web/                 # React frontend
│       ├── src/
│       │   ├── components/
│       │   └── client/      # Generated OpenAPI client
│       ├── package.json
│       ├── Dockerfile       # Production
│       └── Dockerfile.dev   # Development
├── docker-compose.yml       # Production
├── docker-compose.dev.yml   # Development with hot reload
├── .air.toml               # Air configuration for hot reload
└── generate-client.sh      # OpenAPI client generation script
```

## Development Workflow

### 1. Start Development Environment

```bash
# Start both services with hot reload
docker-compose -f docker-compose.dev.yml up --build
```

This will start:
- **Backend** (Go API): http://localhost:8888
- **Frontend** (React): http://localhost:3000

### 2. Generate OpenAPI Client

```bash
# Generate TypeScript client from live API
docker-compose -f docker-compose.dev.yml exec frontend npm run generate-client
```

This command:
1. Fetches OpenAPI spec from running Go API server
2. Creates TypeScript client code in `services/web/src/client/`
3. Provides full type safety for React components

### 3. Development Features

- **Go Hot Reload**: Air watches Go files and restarts server on changes
- **React Hot Reload**: Vite provides instant frontend updates
- **Volume Mounting**: Source code is mounted, preserving changes
- **CORS Enabled**: API configured to allow frontend requests

## API Endpoints

- `GET /health` - Health check
- `POST /api/greeting` - Send greeting (requires JSON body with `name`)
- `GET /api/user/{id}` - Get user by ID (try 123, 456, or 789)
- `POST /api/animal` - Get random animal (requires JSON body with `secret: 22`)
- `GET /swagger/openapi.json` - OpenAPI specification
- `GET /swagger/index.html` - Swagger UI documentation

## Production Deployment

```bash
# Build and start production stack
docker-compose up --build -d
```

Production setup:
- **Backend**: Optimized Go binary in minimal Alpine container
- **Frontend**: Static build served by Nginx with compression and caching
- **Networking**: Services communicate via Docker network

## Manual API Client Generation

```bash
# Generate OpenAPI spec as JSON
cd services/api-server
go run main.go --openapi --format json > doc/openapi.json

# Generate TypeScript client
cd ../web
npx openapi-generator-cli generate \
  -i ../api-server/doc/openapi.json \
  -g typescript-axios \
  -o ./src/client
```

## Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up --build

# Production
docker-compose up --build -d

# Generate client only
./generate-client.sh

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Clean up
docker-compose down
docker-compose -f docker-compose.dev.yml down
```
