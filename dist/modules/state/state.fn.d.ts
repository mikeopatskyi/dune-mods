import { DuneEventEmitter, DuneState } from '../../types';
/**
 * Creates a state object that provides functionality for managing application state.
 * @returns {object} - The state object with `setState`, `subscribe`, `unsubscribe`, and `clearState` methods.
 */
declare const createState: (eventEmitter?: DuneEventEmitter) => DuneState;
export default createState;
