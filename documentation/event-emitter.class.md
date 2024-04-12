## Event Emitter (Class implementation)

The `event-emitter` module provides a lightweight event emitter implementation that enables you to easily manage and communicate events within your application.

## Table of Contents

- [EventEmitter Class (class implementation)](#event-emitter--event-emitter-class)
  - [`eventEmitter.on(event, listener)`](#event-emitter--event-emitter-class)
  - [`eventEmitter.off(event, listener)`](#event-emitter--event-emitter-class)
  - [`eventEmitter.emit(event, data)`](#event-emitter--event-emitter-class)

**Methods**

- `on(eventName: string, listener: Function): void`: Subscribe a listener function to an event.
  - `eventName`: The name of the event to subscribe to.
  - `listener`: The listener function to be invoked when the event is published.
- `off(eventName: string, listener: Function): void`: Unsubscribe a listener function from an event.
  - `eventName`: The name of the event to unsubscribe from.
  - `listener`: The listener function to be removed from the event listener array.
- `emit(eventName: string, ...args: any[]): void`: Publish an event and invoke all subscribed listener functions with the specified arguments.
  - `eventName`: The name of the event to be published.
  - `...args`: The arguments to be passed to the listener functions.

**Example**

```javascript
import { EventEmitter } from 'dune-mods';

// Create an instance of the EventEmitter
const eventEmitter = new EventEmitter();

// Subscribe to an event
const myListener = (arg1, arg2) => {
  console.log('Event emitted with arguments:', arg1, arg2);
};
eventEmitter.on('myEvent', myListener);

// Emit an event
eventEmitter.emit('myEvent', 'Hello', 'World'); // Output: Event emitted with arguments: Hello World

// Unsubscribe from an event
eventEmitter.off('myEvent', myListener);

// Attempting to emit the event again will have no effect
eventEmitter.emit('myEvent', 'Hello', 'World');
```
