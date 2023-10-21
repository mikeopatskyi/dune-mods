import { DuneHttpClient, DuneMiddleware, DuneRequestOptions } from '@core/types';

export default class HttpClient implements DuneHttpClient {
  private middleware: DuneMiddleware[];

  constructor() {
    this.middleware = [];
  }

  public request(options: DuneRequestOptions): Promise<any> {
    if (options.onStart) {
      options.onStart();
    }

    if (options.delay) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(this.executeRequest(options)), options.delay)
      );
    }

    return this.executeRequest(options);
  }

  private executeRequest(options: DuneRequestOptions): Promise<any> {
    let requestOptions: DuneRequestOptions = { ...options };

    if (options.middleware) {
      requestOptions = options.middleware.reduce(
        (opts, middleware) => middleware(opts),
        requestOptions
      );
    }

    const { method, url, headers, body } = requestOptions;

    const requestHeaders: HeadersInit = {};
    if (headers) {
      headers.forEach((header) => {
        const { key, value } = header;
        if (Array.isArray(value)) {
          requestHeaders[key] = value.join(',');
        } else {
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

  public use(middleware: DuneMiddleware): void {
    this.middleware.push(middleware);
  }
}
