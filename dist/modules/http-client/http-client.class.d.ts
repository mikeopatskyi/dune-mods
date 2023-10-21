import { DuneHttpClient, DuneMiddleware, DuneRequestOptions } from '../../types';
export default class HttpClient implements DuneHttpClient {
    private middleware;
    constructor();
    request(options: DuneRequestOptions): Promise<any>;
    private executeRequest;
    use(middleware: DuneMiddleware): void;
}
