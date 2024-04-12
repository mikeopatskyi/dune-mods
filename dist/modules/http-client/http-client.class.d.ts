import { DuneHttpClient, DuneMiddleware, DuneRequestOptions } from '../../types';
import 'whatwg-fetch';
export default class HttpClient implements DuneHttpClient {
    private middleware;
    constructor();
    /**
     * Makes an HTTP request based on the provided options.
     * Supports request/response callbacks, middleware, and other customization options.
     * @param options - The options for the HTTP request.
     * @returns A promise that resolves to the response data.
     * @throws If an error occurs during the request, it is thrown.
     */
    request(options: DuneRequestOptions): Promise<any>;
    /**
     * Executes the HTTP request using the provided options.
     * Applies the middleware functions to the options.
     * @param options - The options for the HTTP request.
     * @returns A promise that resolves to the JSON response.
     */
    private executeRequest;
    /**
     * Adds a middleware function to the HTTP client instance.
     * Middleware functions are applied to requests in the order they are added.
     * @param middleware - The middleware function to be added.
     */
    use(middleware: DuneMiddleware): void;
}
