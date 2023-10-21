import EventEmitter from '../event-emitter/event-emitter.class';
/**
 * The State class is a class that extends the EventEmitter class and provides functionality for managing application state.
 */
export default class State extends EventEmitter {
    private state;
    private emitter;
    constructor();
    /**
     * Merges the new state with the existing state using the spread operator,
     * updates the state property and emits a 'stateChanged' event with the updated state as an argument.
     * @param {object} newState - The new state object.
     */
    setState(newState: object): void;
    /**
     * Retrieves the current state object.
     * @returns {object} - The current state object.
     */
    getState(): object;
    /**
     * Add a listener for the 'stateChanged' event and call the specified callback function.
     * @param {Function} callback - The function to be called when the state changes.
     * The function will receive the updated state as an argument.
     */
    subscribe(callback: (state: object) => void): void;
    /**
     * Remove a listener for the 'stateChanged' event.
     *
     * @param {Function} callback - The callback function to remove as a listener.
     */
    unsubscribe(callback: (state: object) => void): void;
    /**
     * Clears the state object and emits a 'stateCleared' event.
     * @returns {void}
     */
    clearState(): void;
}
