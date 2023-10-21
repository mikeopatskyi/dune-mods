import { DuneHttpClientMethods } from '@core/types';

const httpClientMethods: DuneHttpClientMethods = {
  get: 'GET',
  head: 'HEAD',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  connect: 'CONNECT',
  options: 'OPTIONS',
  trace: 'TRACE',
  patch: 'PATCH',
};

export default httpClientMethods;
