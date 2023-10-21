import { DuneEventEmitter } from '../../types';
/**
 * Creates an event emitter object that can be used to publish and subscribe to events.
 * @returns {object} - The event emitter object with `on`, `off`, and `emit` methods.
 */
declare const createEventEmitter: () => DuneEventEmitter;
export default createEventEmitter;
