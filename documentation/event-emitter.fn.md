## Event Emitter (Functional implementation)

The `event-emitter` module provides a lightweight event emitter implementation that enables you to easily manage and communicate events within your application.

## Table of Contents

- [Event Emitter](#event-emitter-module)

  - [Create Event Emitter (functional implementation)](#event-emitter--create-event-emitter)
    - [`eventEmitter.on(event, listener)`](#event-emitter--create-event-emitter)
    - [`eventEmitter.off(event, listener)`](#event-emitter--create-event-emitter)
    - [`eventEmitter.emit(event, data)`](#event-emitter--create-event-emitter)

#### `createEventEmitter()`

Creates an instance of the event emitter.

**Returns**

An object with the following methods for event management:

- `on(eventName: string, listener: Function): void`: Subscribe a listener function to a specific event.

- `off(eventName: string, listener: Function): void`: Unsubscribe a previously registered listener function from an event.

- `emit(eventName: string, ...args: any[]): void`: Emit an event with the specified arguments, invoking all subscribed listener functions.

**Example**

```javascript
import { createEventEmitter } from 'dune';

// Create an event emitter instance
const eventEmitter = createEventEmitter();

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

**Advanced Example**

```javascript
import { createEventEmitter } from 'dune';

// Create an event emitter instance
const eventEmitter = createEventEmitter();

// Subscribe to multiple events
const event1Listener = () => console.log('Event 1 triggered');
const event2Listener = (data) => console.log('Event 2 triggered with data:', data);

eventEmitter.on('event1', event1Listener);
eventEmitter.on('event2', event2Listener);

// Emit events with data
eventEmitter.emit('event1'); // Output: Event 1 triggered
eventEmitter.emit('event2', { message: 'Hello, Event 2!' }); // Output: Event 2 triggered with data: { message: 'Hello, Event 2!' }

// Unsubscribe from events
eventEmitter.off('event1', event1Listener);
eventEmitter.off('event2', event2Listener);

// Attempting to emit events after unsubscribing will have no effect
eventEmitter.emit('event1');
eventEmitter.emit('event2', { message: 'Will not trigger' });
```
