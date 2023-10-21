"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    listeners = {};
    /**
     * Initializes a new instance of the EventEmitter class.
     */
    constructor() { }
    /**
     * Subscribes a listener function to an event.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {Function} listener - The listener function to be invoked when the event is published.
     */
    on(eventName, listener) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
    }
    /**
     * Unsubscribes a listener function from an event.
     * @param {string} eventName - The name of the event to unsubscribe from.
     * @param {Function} listener - The listener function to be removed from the event listener array.
     */
    off(eventName, listener) {
        if (this.listeners[eventName]) {
            const index = this.listeners[eventName].indexOf(listener);
            if (index !== -1) {
                this.listeners[eventName].splice(index, 1);
            }
        }
    }
    /**
     * Publishes an event and invokes all subscribed listener functions with the specified arguments.
     * @param {string} eventName - The name of the event to be published.
     * @param {...*} args - The arguments to be passed to the listener functions.
     */
    emit(eventName, ...args) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((listener) => {
                listener.apply(null, args);
            });
        }
    }
    /**
     * Subscribes a callback function to the EventEmitter.
     * @param {Function} callback - The callback function to be invoked when the event is published.
     * @returns {Function} - An unsubscribe function that removes the callback from the event listeners.
     */
    subscribe(callback) {
        const eventName = 'valueChanges'; // Use a fixed event name for valueChanges
        this.on(eventName, callback);
        return () => {
            this.off(eventName, callback);
        };
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event-emitter.js.map