"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_emitter_fn_1 = __importDefault(require("../event-emitter/event-emitter.fn"));
/**
 * Creates a state object that provides functionality for managing application state.
 * @returns {object} - The state object with `setState`, `subscribe`, `unsubscribe`, and `clearState` methods.
 */
const createState = (eventEmitter) => {
    let state = {};
    // const emitter: DuneEventEmitter = createEventEmitter();
    const emitter = eventEmitter || (0, event_emitter_fn_1.default)();
    const _eventEmitter = emitter;
    /**
     * Merges the new state with the existing state, updates the state property,
     * and emits a 'stateChanged' event with the updated state as an argument.
     * @param {object} newState - The new state object.
     */
    const setState = (newState) => {
        state = { ...state, ...newState };
        emitter.emit('stateChanged', state);
    };
    /**
     * Retrieves the current state object.
     * @returns {object} - The current state object.
     */
    const getState = () => {
        return state;
    };
    /**
     * Adds a listener for the 'stateChanged' event and calls the specified callback function.
     * @param {Function} callback - The function to be called when the state changes.
     * The function will receive the updated state as an argument.
     */
    const subscribe = (callback) => {
        emitter.on('stateChanged', callback);
    };
    /**
     * Removes a listener for the 'stateChanged' event.
     * @param {Function} callback - The callback function to remove as a listener.
     */
    const unsubscribe = (callback) => {
        emitter.off('stateChanged', callback);
    };
    /**
     * Clears the state object and emits a 'stateCleared' event.
     */
    const clearState = () => {
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
exports.default = createState;
//# sourceMappingURL=state.fn.js.map