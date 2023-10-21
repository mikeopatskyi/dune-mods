"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    listeners;
    /**
     * Initializes a new instance of the EventEmitter class.
     */
    constructor() {
        // An object to store the event listeners.
        this.listeners = {};
    }
    /**
     * Subscribes a listener function to an event.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {Function} listener - The listener function to be invoked when the event is published.
     */
    on(eventName, listener) {
        // Check if there is an existing event listener array for the specified event, if not create one.
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        // Add the listener function to the event listener array.
        this.listeners[eventName].push(listener);
    }
    /**
     * Unsubscribes a listener function from an event.
     * @param {string} eventName - The name of the event to unsubscribe from.
     * @param {Function} listener - The listener function to be removed from the event listener array.
     */
    off(eventName, listener) {
        // Check if there is an existing event listener array for the specified event, if not return.
        if (!this.listeners[eventName]) {
            return;
        }
        // Find the index of the listener function in the event listener array.
        const index = this.listeners[eventName].indexOf(listener);
        // If the listener function is found in the event listener array, remove it.
        if (index !== -1) {
            this.listeners[eventName].splice(index, 1);
        }
    }
    /**
     * Publishes an event and invokes all subscribed listener functions with the specified arguments.
     * @param {string} eventName - The name of the event to be published.
     * @param {...*} args - The arguments to be passed to the listener functions.
     */
    emit(eventName, ...args) {
        // Check if there is an existing event listener array for the specified event, if not return.
        if (!this.listeners[eventName]) {
            return;
        }
        // Invoke all the listener functions in the event listener array with the specified arguments.
        this.listeners[eventName].forEach((listener) => {
            listener.apply(null, args);
        });
    }
}
exports.default = EventEmitter;
//# sourceMappingURL=event-emitter.class.js.map