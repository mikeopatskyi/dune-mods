"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an event emitter object that can be used to publish and subscribe to events.
 * @returns {object} - The event emitter object with `on`, `off`, and `emit` methods.
 */
const createEventEmitter = () => {
    const listeners = {};
    /**
     * Subscribes a listener function to an event.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {Function} listener - The listener function to be invoked when the event is published.
     */
    const on = (eventName, listener) => {
        if (!listeners[eventName]) {
            listeners[eventName] = [];
        }
        listeners[eventName].push(listener);
    };
    /**
     * Unsubscribes a listener function from an event.
     * @param {string} eventName - The name of the event to unsubscribe from.
     * @param {Function} listener - The listener function to be removed from the event listener array.
     */
    const off = (eventName, listener) => {
        if (!listeners[eventName]) {
            return;
        }
        const index = listeners[eventName].indexOf(listener);
        if (index !== -1) {
            listeners[eventName].splice(index, 1);
        }
    };
    /**
     * Publishes an event and invokes all subscribed listener functions with the specified arguments.
     * @param {string} eventName - The name of the event to be published.
     * @param {...*} args - The arguments to be passed to the listener functions.
     */
    const emit = (eventName, ...args) => {
        if (!listeners[eventName]) {
            return;
        }
        listeners[eventName].forEach((listener) => {
            listener.apply(null, args);
        });
    };
    return {
        on,
        off,
        emit,
    };
};
exports.default = createEventEmitter;
//# sourceMappingURL=event-emitter.fn.js.map