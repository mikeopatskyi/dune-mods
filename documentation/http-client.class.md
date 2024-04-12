# Dune HTTP Client Class

The `HttpClient` class is a versatile HTTP client implemented in TypeScript, providing a convenient way to make HTTP requests with support for middleware and various customization options.

## Installation

To use the `HttpClient` class in your project, import it as follows:

```typescript
import {
  HttpClient,
  httpClientMethods,
  DuneHttpClient,
  DuneMiddleware,
  DuneRequestOptions,
} from 'dune-mods';

const httpClient: DuneHttpClient = new HttpClient();
```

## Usage

### Creating an Instance

To create an instance of the `HttpClient` class, instantiate it using the `new` keyword:

```typescript
const httpClient: DuneHttpClient = new HttpClient();
```

### Making Requests

The `HttpClient` class provides a `request` method for making HTTP requests. It takes a `DuneRequestOptions` object as its parameter.

```typescript
const requestOptions: DuneRequestOptions = {
  method: httpClientMethods.get,
  url: 'https://api.example.com/data',
  headers: [{ key: 'Authorization', value: 'Bearer token' }],
  // ... other options
};

try {
  const responseData = await httpClient.request(requestOptions);
  // Handle the response data
} catch (error) {
  // Handle the error
}
```

### Adding Middleware

Middleware functions can be added to the `HttpClient` instance using the `use` method. Middleware functions are applied in the order they are added.

```typescript
const customMiddleware: DuneMiddleware = (opts) => {
  // Modify opts based on requirements
  return opts;
};

httpClient.use(customMiddleware);
```

### Customizing Behavior

The `HttpClient` class allows you to customize its behavior by extending it and overriding specific methods.

```typescript
class CustomHttpClient extends HttpClient {
  // Override methods as needed
}
```

## Class Methods

#### `request(options: DuneRequestOptions): Promise<any>`

Makes an HTTP request based on the provided `DuneRequestOptions`. Supports request/response callbacks, middleware, and other customization options.

#### `use(middleware: DuneMiddleware): void`

Adds a middleware function to the HTTP client instance. Middleware functions are applied to requests in the order they are added.
