export declare class EventEmitter<T> {
    private listeners;
    /**
     * Initializes a new instance of the EventEmitter class.
     */
    constructor();
    /**
     * Subscribes a listener function to an event.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {Function} listener - The listener function to be invoked when the event is published.
     */
    on(eventName: string, listener: Function): void;
    /**
     * Unsubscribes a listener function from an event.
     * @param {string} eventName - The name of the event to unsubscribe from.
     * @param {Function} listener - The listener function to be removed from the event listener array.
     */
    off(eventName: string, listener: Function): void;
    /**
     * Publishes an event and invokes all subscribed listener functions with the specified arguments.
     * @param {string} eventName - The name of the event to be published.
     * @param {...*} args - The arguments to be passed to the listener functions.
     */
    emit(eventName: string, ...args: any[]): void;
    /**
     * Subscribes a callback function to the EventEmitter.
     * @param {Function} callback - The callback function to be invoked when the event is published.
     * @returns {Function} - An unsubscribe function that removes the callback from the event listeners.
     */
    subscribe(callback: (data: T) => void): () => void;
}
