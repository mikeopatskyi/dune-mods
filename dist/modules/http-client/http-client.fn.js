"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createHttpClient = () => {
    const request = async (options) => {
        if (options.onStart) {
            options.onStart();
        }
        if (options.delay) {
            await new Promise((resolve) => setTimeout(resolve, options.delay));
        }
        let requestOptions = { ...options };
        if (options.middleware) {
            requestOptions = options.middleware.reduce((opts, middleware) => middleware(opts), requestOptions);
        }
        const { method, url, headers, body } = requestOptions;
        // Append query parameters to the URL if they are provided in the options
        let fullUrl = url;
        if (options.params) {
            const queryString = Object.keys(options.params)
                .map((key) => {
                const value = options.params[key];
                return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
            })
                .join('&');
            if (queryString) {
                fullUrl += (url.includes('?') ? '&' : '?') + queryString;
            }
        }
        const requestHeaders = {};
        if (headers && headers?.length > 0) {
            headers.forEach((header) => {
                const { key, value } = header;
                if (Array.isArray(value)) {
                    requestHeaders[key] = value.join(','); // Concatenate multiple values into a comma-separated string
                }
                else {
                    requestHeaders[key] = value;
                }
            });
        }
        try {
            const response = await fetch(fullUrl, {
                method,
                headers: requestHeaders,
                body,
            });
            const data = await response.json();
            // Invoke the onEnd callback if provided
            if (options.onEnd) {
                options.onEnd(data);
            }
            // Invoke the onSuccessEnd callback if provided
            if (options.onSuccessEnd) {
                options.onSuccessEnd(data);
            }
            return data;
        }
        catch (error) {
            // Invoke the onEnd callback if provided even in case of an error
            if (options.onEnd) {
                options.onEnd(error);
            }
            // Invoke the onFailureEnd callback if provided even in case of an error
            if (options.onFailureEnd) {
                options.onFailureEnd(error);
            }
            throw error; // Rethrow the error to propagate it to the caller
        }
    };
    return { request };
};
exports.default = createHttpClient;
//# sourceMappingURL=http-client.fn.js.map