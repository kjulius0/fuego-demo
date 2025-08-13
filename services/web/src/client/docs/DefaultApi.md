# DefaultApi

All URIs are relative to *http://0.0.0.0:8888*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**gETHealth**](#gethealth) | **GET** /health | Health check endpoint|

# **gETHealth**
> HealthResponse gETHealth()

#### Controller:   `main.healthHandler`  #### Middlewares:  - `github.com/go-fuego/fuego.defaultLogger.middleware`  ---  Returns the health status of the API server

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from 'fuego-api-client';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let accept: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.gETHealth(
    accept
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accept** | [**string**] |  | (optional) defaults to undefined|


### Return type

**HealthResponse**

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

