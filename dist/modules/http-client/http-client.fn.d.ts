import { DuneHttpClient } from '../../types';
import 'whatwg-fetch';
/**
 * Factory function that creates a DuneHttpClient instance.
 *
 * @returns A DuneHttpClient instance.
 */
declare const createHttpClient: () => DuneHttpClient;
export default createHttpClient;
