"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpClient {
    middleware;
    constructor() {
        this.middleware = [];
    }
    request(options) {
        if (options.onStart) {
            options.onStart();
        }
        if (options.delay) {
            return new Promise((resolve) => setTimeout(() => resolve(this.executeRequest(options)), options.delay));
        }
        return this.executeRequest(options);
    }
    executeRequest(options) {
        let requestOptions = { ...options };
        if (options.middleware) {
            requestOptions = options.middleware.reduce((opts, middleware) => middleware(opts), requestOptions);
        }
        const { method, url, headers, body } = requestOptions;
        const requestHeaders = {};
        if (headers) {
            headers.forEach((header) => {
                const { key, value } = header;
                if (Array.isArray(value)) {
                    requestHeaders[key] = value.join(',');
                }
                else {
                    requestHeaders[key] = value;
                }
            });
        }
        return fetch(url, {
            method,
            headers: requestHeaders,
            body,
        }).then((response) => response.json());
    }
    use(middleware) {
        this.middleware.push(middleware);
    }
}
exports.default = HttpClient;
//# sourceMappingURL=http-client.class.js.map