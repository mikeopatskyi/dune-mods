export interface DuneHeader {
    key: string;
    value: string | string[];
}
export interface DuneRequestOptions {
    method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
    url: string;
    headers?: DuneHeader[];
    body?: any;
    delay?: number;
    middleware?: DuneMiddleware[];
    params?: {
        [key: string]: string | number | boolean;
    };
    onStart?: () => void;
    onEnd?: (data?: any) => void;
    onSuccess?: (data?: any) => void;
    onFailure?: (error?: any) => void;
    finally?: (error?: any) => void;
}
export interface DuneMiddleware {
    (options: DuneRequestOptions): DuneRequestOptions;
}
export interface DuneHttpClient {
    request: (options: DuneRequestOptions) => Promise<any>;
    startFetchingInterval: (options: DuneRequestOptions & {
        interval: number;
    }) => void;
    stopFetchingInterval: () => void;
}
export interface DuneHttpClientMethods {
    get: 'GET';
    head: 'HEAD';
    post: 'POST';
    put: 'PUT';
    delete: 'DELETE';
    connect: 'CONNECT';
    options: 'OPTIONS';
    trace: 'TRACE';
    patch: 'PATCH';
}
