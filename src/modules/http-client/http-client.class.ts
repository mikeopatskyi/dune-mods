import { DuneHttpClient, DuneMiddleware, DuneRequestOptions } from '@core/types';

export default class HttpClient implements DuneHttpClient {
  private middleware: DuneMiddleware[];

  constructor() {
    this.middleware = [];
  }

  /**
   * Makes an HTTP request based on the provided options.
   * Supports request/response callbacks, middleware, and other customization options.
   * @param options - The options for the HTTP request.
   * @returns A promise that resolves to the response data.
   * @throws If an error occurs during the request, it is thrown.
   */
  public async request(options: DuneRequestOptions): Promise<any> {
    try {
      // Invoke the onStart callback if provided
      if (options.onStart) {
        options.onStart();
      }

      // Delay the request if a delay is specified
      if (options.delay) {
        await new Promise((resolve) =>
          setTimeout(() => resolve(this.executeRequest(options)), options.delay)
        );
      }

      // Parse the response data
      const response = await this.executeRequest(options);

      // Invoke the success callback if provided
      if (options?.success) {
        options.success(response);
      }

      // Invoke the onEnd callback if provided
      if (options.onEnd) {
        options.onEnd(response);
      }

      // Invoke the onSuccessEnd callback if provided
      if (options?.onSuccessEnd) {
        options.onSuccessEnd(response);
      }

      return response;
    } catch (error) {
      // Invoke rollback before error callback
      if (options?.rollback) {
        options.rollback();
      }

      // Invoke the error callback if provided
      if (options?.error && (!options?.rollback || typeof options?.rollback === 'undefined')) {
        options.error(error);
      }

      // Invoke the onEnd callback if provided even in case of an error
      if (options?.onEnd) {
        options.onEnd(error);
      }

      // Invoke the onFailureEnd callback if provided even in case of an error
      if (
        options?.onFailureEnd &&
        (!options?.rollback || typeof options?.rollback === 'undefined')
      ) {
        options.onFailureEnd(error);
      }

      // Rethrow the error to propagate it to the caller
      throw error;
    } finally {
      // Invoke the finally callback if provided
      if (options.finally) {
        options.finally();
      }
    }
  }

  /**
   * Executes the HTTP request using the provided options.
   * Applies the middleware functions to the options.
   * @param options - The options for the HTTP request.
   * @returns A promise that resolves to the JSON response.
   */
  private async executeRequest(options: DuneRequestOptions): Promise<any> {
    // Create a copy of the options to avoid mutating the original object
    let requestOptions: DuneRequestOptions = { ...options };

    // Apply middleware functions to the request options
    if (options.middleware) {
      // Reduce the array of middleware functions using the reduce method
      requestOptions = options.middleware.reduce(
        (opts, middleware) => middleware(opts),
        requestOptions
      );
    }

    // Destructure the request options to separate the individual properties
    const { method, url, headers, body } = requestOptions;

    // Create the request headers
    const requestHeaders: HeadersInit = {};
    if (headers) {
      headers.forEach((header) => {
        const { key, value } = header;
        if (Array.isArray(value)) {
          // Join the array of values with a comma as the separator
          requestHeaders[key] = value.join(',');
        } else {
          // Set the header value
          requestHeaders[key] = value;
        }
      });
    }

    // Make the HTTP request using the fetch API
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body,
    });

    // Parse the response body as JSON
    return response.json();
  }

  /**
   * Adds a middleware function to the HTTP client instance.
   * Middleware functions are applied to requests in the order they are added.
   * @param middleware - The middleware function to be added.
   */
  public use(middleware: DuneMiddleware): void {
    // Adds a middleware function to the array of middleware functions.
    // Middleware functions are applied to requests in the order they are added.
    // Middleware functions are functions that takes a `DuneRequestOptions` object
    // and returns a modified `DuneRequestOptions` object.
    this.middleware.push(middleware);
  }
}
