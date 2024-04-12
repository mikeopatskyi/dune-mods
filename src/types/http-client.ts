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
  onStart?: () => void;
  onEnd?: (data?: any) => void;
  onSuccessEnd?: (data?: any) => void;
  onFailureEnd?: (error?: any) => void;
  success?: (response: any) => void;
  error?: (error: any) => void;
  finally?: () => void;
  rollback?: () => void;
  middleware?: DuneMiddleware[];
  params?: { [key: string]: string | number | boolean };
}

export interface DuneMiddleware {
  (options: DuneRequestOptions): DuneRequestOptions;
}

export interface DuneHttpClient {
  request: (options: DuneRequestOptions) => Promise<any>;
  startFetchingInterval: (options: DuneRequestOptions & { interval: number }) => void;
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
