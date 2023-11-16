# Dune HTTP Client

The Dune HTTP Client is a lightweight and flexible HTTP client designed for use in JavaScript and TypeScript projects. It provides a simple interface for making HTTP requests with support for middleware, request/response callbacks, and other customization options.

## Installation

To use the Dune HTTP Client in your project, you can import it as follows:

```typescript
import { createHttpClient, DuneRequestOptions, DuneHttpClient } from 'dune';

const httpClient: DuneHttpClient = createHttpClient();
```

## Creating an HTTP Client

To create an instance of the Dune HTTP Client, use the createHttpClient function. This function returns an object with a request method that can be used to make HTTP requests.

```typescript
const httpClient: DuneHttpClient = createHttpClient();
```

## Making a Request

To make an HTTP request, use the request method provided by the Dune HTTP Client. It takes a DuneRequestOptions object as its parameter.

```typescript
const requestOptions: DuneRequestOptions = {
  method: 'GET',
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

## Request Options

The DuneRequestOptions object allows you to customize various aspects of the HTTP request. Some of the options include:

- `method`: The HTTP method (e.g., GET, POST, PUT).
- `url`: The URL for the request.
- `headers`: An array of headers to include in the request.
- `body`: The request body (for methods like POST or PUT).
- `params`: Query parameters to append to the URL.
- `onStart`: Callback function invoked before the request is sent.
- `onEnd`: Callback function invoked after the request completes (either successfully or with an error).
- `onSuccessEnd`: Callback function invoked after a successful request.
- `onFailureEnd`: Callback function invoked after a failed request.

## Middleware

The Dune HTTP Client supports middleware functions that can modify the request options before the request is sent. Middleware functions are applied in the order they are provided.

```typescript
const requestOptionsWithMiddleware: DuneRequestOptions = {
  // ... other options
  middleware: [
    (opts) => {
      // Modify opts based on requirements
      return opts;
    },
    // Add more middleware as needed
  ],
};
```

This provides a powerful way to customize and extend the behavior of the HTTP client.
