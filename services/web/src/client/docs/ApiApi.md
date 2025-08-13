# ApiApi

All URIs are relative to *http://0.0.0.0:8888*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**gETApiUserId**](#getapiuserid) | **GET** /api/user/{id} | Get user information|
|[**pOSTApiAnimal**](#postapianimal) | **POST** /api/animal | Get random animal|
|[**pOSTApiGreeting**](#postapigreeting) | **POST** /api/greeting | Generate a greeting|

# **gETApiUserId**
> UserResponse gETApiUserId()

#### Controller:   `main.userHandler`  #### Middlewares:  - `github.com/go-fuego/fuego.defaultLogger.middleware` - `main.authMiddleware`  ---  Retrieve user information by user ID

### Example

```typescript
import {
    ApiApi,
    Configuration
} from 'fuego-api-client';

const configuration = new Configuration();
const apiInstance = new ApiApi(configuration);

let id: string; // (default to undefined)
let accept: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.gETApiUserId(
    id,
    accept
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **accept** | [**string**] |  | (optional) defaults to undefined|


### Return type

**UserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/xml


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request _(validation or deserialization error)_ |  -  |
|**500** | Internal Server Error _(panics)_ |  -  |
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pOSTApiAnimal**
> AnimalResponse pOSTApiAnimal(animalRequest)

#### Controller:   `main.animalHandler`  #### Middlewares:  - `github.com/go-fuego/fuego.defaultLogger.middleware` - `main.authMiddleware`  ---  Returns a random animal if the correct secret number (22) is provided

### Example

```typescript
import {
    ApiApi,
    Configuration,
    AnimalRequest
} from 'fuego-api-client';

const configuration = new Configuration();
const apiInstance = new ApiApi(configuration);

let animalRequest: AnimalRequest; //Request body for main.AnimalRequest
let accept: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.pOSTApiAnimal(
    animalRequest,
    accept
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **animalRequest** | **AnimalRequest**| Request body for main.AnimalRequest | |
| **accept** | [**string**] |  | (optional) defaults to undefined|


### Return type

**AnimalResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/xml


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request _(validation or deserialization error)_ |  -  |
|**500** | Internal Server Error _(panics)_ |  -  |
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pOSTApiGreeting**
> GreetingResponse pOSTApiGreeting(greetingInput)

#### Controller:   `main.greetingHandler`  #### Middlewares:  - `github.com/go-fuego/fuego.defaultLogger.middleware` - `main.authMiddleware`  ---  Takes a name and returns a personalized greeting message

### Example

```typescript
import {
    ApiApi,
    Configuration,
    GreetingInput
} from 'fuego-api-client';

const configuration = new Configuration();
const apiInstance = new ApiApi(configuration);

let greetingInput: GreetingInput; //Request body for main.GreetingInput
let accept: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.pOSTApiGreeting(
    greetingInput,
    accept
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **greetingInput** | **GreetingInput**| Request body for main.GreetingInput | |
| **accept** | [**string**] |  | (optional) defaults to undefined|


### Return type

**GreetingResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/xml


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request _(validation or deserialization error)_ |  -  |
|**500** | Internal Server Error _(panics)_ |  -  |
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

