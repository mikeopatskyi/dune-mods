"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_emitter_class_1 = __importDefault(require("../event-emitter/event-emitter.class"));
/**
 * The State class is a class that extends the EventEmitter class and provides functionality for managing application state.
 */
class State extends event_emitter_class_1.default {
    state;
    emitter;
    constructor() {
        // Initialize state object and event emitter
        super();
        this.state = {};
        this.emitter = new event_emitter_class_1.default();
    }
    /**
     * Merges the new state with the existing state using the spread operator,
     * updates the state property and emits a 'stateChanged' event with the updated state as an argument.
     * @param {object} newState - The new state object.
     */
    setState(newState) {
        // Merge new state with existing state using the spread operator
        this.state = { ...this.state, ...newState };
        // Emit a 'stateChanged' event and pass the updated state as an argument
        this.emitter.emit('stateChanged', this.state);
    }
    /**
     * Retrieves the current state object.
     * @returns {object} - The current state object.
     */
    getState() {
        return this.state;
    }
    /**
     * Add a listener for the 'stateChanged' event and call the specified callback function.
     * @param {Function} callback - The function to be called when the state changes.
     * The function will receive the updated state as an argument.
     */
    subscribe(callback) {
        // Add a listener for the 'stateChanged' event and call the specified callback function
        this.emitter.on('stateChanged', callback);
    }
    /**
     * Remove a listener for the 'stateChanged' event.
     *
     * @param {Function} callback - The callback function to remove as a listener.
     */
    unsubscribe(callback) {
        // Remove the specified listener for the 'stateChanged' event
        this.emitter.off('stateChanged', callback);
    }
    /**
     * Clears the state object and emits a 'stateCleared' event.
     * @returns {void}
     */
    clearState() {
        // Clear the state object
        this.state = {};
        // Emit a 'stateChanged' event after clearing the state object
        this.emitter.emit('stateChanged', this.state);
    }
}
exports.default = State;
//# sourceMappingURL=state.class.js.map