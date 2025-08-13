## fuego-api-client@1.0.0

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition will be automatically resolved via `package.json`. ([Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html))

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Publishing

First build the package then run `npm publish`

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install fuego-api-client@1.0.0 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Documentation for API Endpoints

All URIs are relative to *http://0.0.0.0:8888*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*ApiApi* | [**gETApiUserId**](docs/ApiApi.md#getapiuserid) | **GET** /api/user/{id} | Get user information
*ApiApi* | [**pOSTApiAnimal**](docs/ApiApi.md#postapianimal) | **POST** /api/animal | Get random animal
*ApiApi* | [**pOSTApiGreeting**](docs/ApiApi.md#postapigreeting) | **POST** /api/greeting | Generate a greeting
*DefaultApi* | [**gETHealth**](docs/DefaultApi.md#gethealth) | **GET** /health | Health check endpoint


### Documentation For Models

 - [AnimalRequest](docs/AnimalRequest.md)
 - [AnimalResponse](docs/AnimalResponse.md)
 - [GreetingInput](docs/GreetingInput.md)
 - [GreetingResponse](docs/GreetingResponse.md)
 - [HTTPError](docs/HTTPError.md)
 - [HTTPErrorErrorsInner](docs/HTTPErrorErrorsInner.md)
 - [HealthResponse](docs/HealthResponse.md)
 - [UserResponse](docs/UserResponse.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization

Endpoints do not require authorization.

