# HTTPError

HTTPError schema

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**detail** | **string** | Human readable error message | [optional] [default to undefined]
**errors** | [**Array&lt;HTTPErrorErrorsInner&gt;**](HTTPErrorErrorsInner.md) |  | [optional] [default to undefined]
**instance** | **string** |  | [optional] [default to undefined]
**status** | **number** | HTTP status code | [optional] [default to undefined]
**title** | **string** | Short title of the error | [optional] [default to undefined]
**type** | **string** | URL of the error type. Can be used to lookup the error in a documentation | [optional] [default to undefined]

## Example

```typescript
import { HTTPError } from 'fuego-api-client';

const instance: HTTPError = {
    detail,
    errors,
    instance,
    status,
    title,
    type,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
