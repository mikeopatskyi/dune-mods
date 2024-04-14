import { DuneHttpClient, DuneMiddleware, DuneRequestOptions } from '@core/types';
import 'whatwg-fetch';

export default class HttpClient implements DuneHttpClient {
  private middleware: DuneMiddleware[];
  private intervalId: number | null;

  constructor() {
    this.middleware = [];
    this.intervalId = null;
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

      // Invoke the onEnd callback if provided
      options?.onEnd && options.onEnd(response);

      // Invoke the onSuccess callback if provided
      options?.onSuccess && options.onSuccess(response);

      return response;
    } catch (error) {
      // Invoke the onEnd callback if provided even in case of an error
      options?.onEnd && options.onEnd(error);

      // Invoke the onFailure callback if provided even in case of an error
      options?.onFailure && options.onFailure(error);

      // Rethrow the error to propagate it to the caller
      throw error;
    } finally {
      // Invoke the finally callback if provided
      options?.finally && options.finally();
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
   * Starts fetching at regular intervals based on the provided options.
   * @param options - The options for interval-based fetching.
   */
  public startFetchingInterval(options: DuneRequestOptions & { interval: number }): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.request(options);
    }, options.interval);
  }

  /**
   * Stops interval-based fetching.
   */
  public stopFetchingInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
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
