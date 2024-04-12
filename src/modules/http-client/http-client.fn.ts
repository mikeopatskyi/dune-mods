import { DuneRequestOptions, DuneHttpClient } from '@core/types';
import 'whatwg-fetch';

/**
 * Factory function that creates a DuneHttpClient instance.
 *
 * @returns A DuneHttpClient instance.
 */
const createHttpClient = (): DuneHttpClient => {
  /**
   * Asynchronously makes an HTTP request using the provided options.
   *
   * @param options - The options for the request, including the method, URL, headers, body, and callbacks.
   * @returns A Promise that resolves to the response data, or rejects with an error.
   */
  const request = async (
    options: DuneRequestOptions & {
      success?: (response: any) => void; // Callback function to be invoked with the response data on success
      error?: (error: any) => void; // Callback function to be invoked with the error on failure
      finally?: () => void; // Callback function to be invoked regardless of the request outcome
      rollback?: () => void; // Callback function to be invoked in case of an error before invoking the error callback
    }
  ): Promise<any> => {
    // Invoke the onStart callback if provided
    options.onStart && options.onStart();

    // Delay the request if a delay is specified in the options
    if (options.delay) {
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }

    // Create a copy of the options to avoid mutating the original object
    let requestOptions: DuneRequestOptions = { ...options };

    // Apply middleware to the request options
    if (options.middleware) {
      requestOptions = options.middleware.reduce(
        (opts, middleware) => middleware(opts),
        requestOptions
      );
    }

    // Destructure the request options to separate the individual properties
    const { method, url, headers, body, params } = requestOptions;

    // Append query parameters to the URL if they are provided in the options
    let fullUrl = url;

    if (params) {
      // Generate the query string from the provided parameters
      const queryString = Object.keys(params)
        .map((key) => {
          const value = params![key];
          return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
        })
        .join('&');

      // Append the query string to the URL if it is not empty
      if (queryString) {
        fullUrl += (url.includes('?') ? '&' : '?') + queryString;
      }
    }

    const requestHeaders: HeadersInit = {};

    // Convert the headers array into a Headers object
    if (headers && headers?.length > 0) {
      headers.forEach((header) => {
        const { key, value } = header;
        if (Array.isArray(value)) {
          requestHeaders[key] = value.join(','); // Concatenate multiple values into a comma-separated string
        } else {
          requestHeaders[key] = value;
        }
      });
    }

    try {
      // Send the HTTP request
      const response = await fetch(fullUrl, {
        method,
        headers: requestHeaders,
        body,
      });

      // Parse the response data
      const data = await response.json();

      // Invoke the success callback if provided
      options?.success && options.success(data);

      // Invoke the onEnd callback if provided
      options.onEnd && options.onEnd(data);

      // Invoke the onSuccessEnd callback if provided
      options?.onSuccessEnd && options.onSuccessEnd(data);

      return data;
    } catch (error) {
      // Invoke rollback before error callback
      options?.rollback && options.rollback();

      // Invoke the error callback if provided
      options?.error &&
        (!options?.rollback || typeof options?.rollback === 'undefined') &&
        options.error(error);

      // Invoke the onEnd callback if provided even in case of an error
      options?.onEnd && options.onEnd(error);

      // Invoke the onFailureEnd callback if provided even in case of an error
      options?.onFailureEnd &&
        (!options?.rollback || typeof options?.rollback === 'undefined') &&
        options.onFailureEnd(error);

      // Rethrow the error to propagate it to the caller
      throw error;
    } finally {
      // Invoke the finally callback if provided
      options.finally && options.finally();
    }
  };

  // Return the request function as the request method of the DuneHttpClient
  return { request };
};

export default createHttpClient;
