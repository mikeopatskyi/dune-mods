import createEventEmitter from '@event-emitter/event-emitter.fn';
import { DuneEventEmitter, DuneState } from '@core/types';

/**
 * Creates a state object that provides functionality for managing application state.
 * @returns {object} - The state object with `setState`, `subscribe`, `unsubscribe`, and `clearState` methods.
 */
const createState = (eventEmitter?: DuneEventEmitter): DuneState => {
  let state: object = {};
  // const emitter: DuneEventEmitter = createEventEmitter();
  const emitter: DuneEventEmitter = eventEmitter || createEventEmitter();
  const _eventEmitter = emitter;

  /**
   * Merges the new state with the existing state, updates the state property,
   * and emits a 'stateChanged' event with the updated state as an argument.
   * @param {object} newState - The new state object.
   */
  const setState = (newState: object): void => {
    state = { ...state, ...newState };
    emitter.emit('stateChanged', state);
  };

  /**
   * Retrieves the current state object.
   * @returns {object} - The current state object.
   */
  const getState = (): object => {
    return state;
  };

  /**
   * Adds a listener for the 'stateChanged' event and calls the specified callback function.
   * @param {Function} callback - The function to be called when the state changes.
   * The function will receive the updated state as an argument.
   */
  const subscribe = (callback: (state: object) => void): void => {
    emitter.on('stateChanged', callback);
  };

  /**
   * Removes a listener for the 'stateChanged' event.
   * @param {Function} callback - The callback function to remove as a listener.
   */
  const unsubscribe = (callback: (state: object) => void): void => {
    emitter.off('stateChanged', callback);
  };

  /**
   * Clears the state object and emits a 'stateCleared' event.
   */
  const clearState = (): void => {
    state = {};
    emitter.emit('stateCleared');
  };

  return {
    setState,
    getState,
    subscribe,
    unsubscribe,
    clearState,
    _eventEmitter,
  };
};

export default createState;
