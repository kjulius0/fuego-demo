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

### 2. Automatic Client Generation

The TypeScript client is **automatically generated** when the API changes:

- Frontend continuously polls the Go API's OpenAPI spec
- When schema changes are detected, the client regenerates automatically
- No manual intervention needed - just change your Go code!

**Manual generation** (if needed):
```bash
docker-compose -f docker-compose.dev.yml exec frontend npm run generate-client
```

### 3. Development Features

- **Go Hot Reload**: Air watches Go files and restarts server on changes
- **React Hot Reload**: Vite provides instant frontend updates  
- **Automatic API Client**: Frontend polls for API changes and regenerates TypeScript client
- **Full Type Safety**: Generated client provides complete TypeScript definitions
- **Volume Mounting**: Source code is mounted, preserving changes
- **CORS Enabled**: API configured to allow frontend requests

## API Endpoints

- `GET /health` - Health check
- `POST /api/greeting` - Send greeting (requires JSON body with `name`)
- `GET /api/user/{id}` - Get user by ID (try 123, 456, or 789)
- `POST /api/animal` - Get random animal with habitat (requires JSON body with `secret: 22`)
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

## Development Workflow

### Fully Automatic Development

The development workflow is **completely automated**:

1. **Edit Go API code** (`services/api-server/main.go`)
2. **Air detects changes** → Rebuilds and restarts Go server  
3. **Frontend polling detects** OpenAPI spec changes
4. **TypeScript client regenerates** automatically with new types
5. **Use new types** in React components with full IntelliSense

### Example: Adding a New Field

```go
// Add field to Go struct
type AnimalResponse struct {
    // ... existing fields
    Habitat string `json:"habitat" description:"Animal habitat"`
}
```

**Result**: TypeScript interface automatically updates:
```typescript
export interface AnimalResponse {
    // ... existing fields  
    habitat?: string;
}
```

No manual steps required! 🔥

## Manual API Client Generation

```bash
# Generate from live API (recommended)
docker-compose -f docker-compose.dev.yml exec frontend npm run generate-client

# Generate from Go code directly  
cd services/api-server
go run main.go --openapi --format json
```

## Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up --build

# Production
docker-compose up --build -d

# Manual client generation (auto-generation is default)
docker-compose -f docker-compose.dev.yml exec frontend npm run generate-client

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Clean up
docker-compose down
docker-compose -f docker-compose.dev.yml down
```
