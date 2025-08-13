package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-fuego/fuego"
	"github.com/rs/cors"
	"gopkg.in/yaml.v3"
)

type Options struct {
	Port int    `doc:"Port to listen on." short:"p" default:"8888"`
	Host string `doc:"Host to listen on." default:"0.0.0.0"`
}

type HealthResponse struct {
	Status string `json:"status" validate:"required" description:"Health status" example:"healthy"`
	Time   string `json:"time" validate:"required" description:"Current server time"`
}

type GreetingInput struct {
	Name string `json:"name" validate:"required,min=1,max=50" description:"Name to greet" example:"World"`
}

type GreetingResponse struct {
	Message   string `json:"message" description:"Greeting message"`
	Timestamp string `json:"timestamp" description:"When the greeting was generated"`
}

type UserResponse struct {
	ID       int    `json:"id" description:"User ID"`
	Name     string `json:"name" description:"User name"`
	Email    string `json:"email" description:"User email"`
	JoinDate string `json:"join_date" description:"When the user joined"`
}

type AnimalRequest struct {
	Secret int `json:"secret" validate:"required" description:"Secret number to access animals" example:"22"`
}

type AnimalResponse struct {
	ID      int    `json:"id" description:"Random animal ID"`
	Name    string `json:"name" description:"Animal name"`
	Type    string `json:"type" description:"Animal type"`
	Secret  bool   `json:"secret" description:"Whether secret was correct"`
	Habitat string `json:"habitat" description:"Animal habitat"`
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Accessing Secure Route: %s %s from %s", r.Method, r.URL.Path, r.RemoteAddr)
		next.ServeHTTP(w, r)
	})
}

func healthHandler(c fuego.ContextNoBody) (HealthResponse, error) {
	return HealthResponse{
		Status: "healthy",
		Time:   time.Now().Format(time.RFC3339),
	}, nil
}

func greetingHandler(c fuego.ContextWithBody[GreetingInput]) (GreetingResponse, error) {
	input, err := c.Body()
	if err != nil {
		return GreetingResponse{}, err
	}

	return GreetingResponse{
		Message:   fmt.Sprintf("Hello, %s! Welcome to our API.", input.Name),
		Timestamp: time.Now().Format(time.RFC3339),
	}, nil
}

func userHandler(c fuego.ContextNoBody) (UserResponse, error) {
	idStr := c.PathParam("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return UserResponse{}, fuego.BadRequestError{Detail: "Invalid user ID"}
	}

	users := map[int]struct {
		name  string
		email string
	}{
		123: {"John Doe", "john@example.com"},
		456: {"Jane Smith", "jane@example.com"},
		789: {"Bob Johnson", "bob@example.com"},
	}

	user, exists := users[id]
	if !exists {
		return UserResponse{}, fuego.NotFoundError{Detail: "User not found"}
	}

	return UserResponse{
		ID:       id,
		Name:     user.name,
		Email:    user.email,
		JoinDate: "2024-01-15T10:30:00Z",
	}, nil
}

// animalHandler returns a random animal if the correct secret is provided
func animalHandler(c fuego.ContextWithBody[AnimalRequest]) (AnimalResponse, error) {
	input, err := c.Body()
	if err != nil {
		return AnimalResponse{}, err
	}

	animals := []struct {
		name    string
		type_   string
		habitat string
	}{
		{"Leo", "Lion", "Savanna"},
		{"Ella", "Elephant", "Grassland"},
		{"Gigi", "Giraffe", "Savanna"},
		{"Pablo", "Penguin", "Arctic"},
		{"Koko", "Koala", "Forest"},
		{"Ollie", "Owl", "Forest"},
		{"Finn", "Fish", "Ocean"},
		{"Ruby", "Rabbit", "Meadow"},
		{"Max", "Monkey", "Jungle"},
		{"Luna", "Llama", "Mountain"},
		{"Ziggy", "Zebra", "Savanna"},
		{"Penny", "Penguin", "Arctic"},
	}

	// Check if secret is correct (must be 22)
	if input.Secret != 22 {
		return AnimalResponse{
			ID:      0,
			Name:    "Access Denied",
			Type:    "Unknown",
			Secret:  false,
			Habitat: "Unknown",
		}, fuego.BadRequestError{Detail: "Invalid secret number"}
	}

	// Generate random animal from list
	animalIndex := rand.Intn(len(animals))
	animal := animals[animalIndex]
	
	return AnimalResponse{
		ID:      animalIndex + 1,
		Name:    animal.name,
		Type:    animal.type_,
		Secret:  true,
		Habitat: animal.habitat,
	}, nil
}

func createServer() *fuego.Server {
	// Create CORS options
	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	s := fuego.NewServer(
		fuego.WithGlobalMiddlewares(corsOptions.Handler),
	)

	fuego.Get(s, "/health", healthHandler,
		fuego.OptionSummary("Health check endpoint"),
		fuego.OptionDescription("Returns the health status of the API server"),
	)

	apiGroup := fuego.Group(s, "/api",
		fuego.OptionMiddleware(authMiddleware),
	)

	fuego.Post(apiGroup, "/greeting", greetingHandler,
		fuego.OptionSummary("Generate a greeting"),
		fuego.OptionDescription("Takes a name and returns a personalized greeting message"),
	)

	fuego.Get(apiGroup, "/user/{id}", userHandler,
		fuego.OptionSummary("Get user information"),
		fuego.OptionDescription("Retrieve user information by user ID"),
	)

	fuego.Post(apiGroup, "/animal", animalHandler,
		fuego.OptionSummary("Get random animal"),
		fuego.OptionDescription("Returns a random animal if the correct secret number (22) is provided"),
	)

	return s
}

func main() {
	var opts Options
	var openapi bool
	var format string

	flag.IntVar(&opts.Port, "port", 8888, "Port to listen on")
	flag.IntVar(&opts.Port, "p", 8888, "Port to listen on")
	flag.StringVar(&opts.Host, "host", "0.0.0.0", "Host to listen on")
	flag.BoolVar(&openapi, "openapi", false, "Print the OpenAPI specification")
	flag.StringVar(&format, "format", "yaml", "Output format for OpenAPI spec (yaml|json)")
	flag.Parse()

	if openapi {
		generateOpenAPISpec(format)
		os.Exit(0)
	}

	startServer(&opts)
}

func startServer(opts *Options) {
	s := createServer()

	addr := fmt.Sprintf("%s:%d", opts.Host, opts.Port)
	log.Printf("Starting server at http://%s", addr)
	log.Printf("OpenAPI spec available at: http://%s/swagger/openapi.json", addr)
	log.Printf("Documentation available at: http://%s/swagger/index.html", addr)

	s.Addr = addr
	s.Run()
}

func generateOpenAPISpec(format string) {
	s := createServer()
	spec := s.Engine.OutputOpenAPISpec()

	var data []byte
	var err error
	
	switch format {
	case "json":
		data, err = json.MarshalIndent(spec, "", "  ")
	case "yaml":
		data, err = yaml.Marshal(spec)
	default:
		log.Fatalf("Unsupported format: %s. Use 'yaml' or 'json'", format)
	}
	
	if err != nil {
		log.Fatalf("Failed to marshal OpenAPI spec: %v", err)
	}

	fmt.Print(string(data))
}
