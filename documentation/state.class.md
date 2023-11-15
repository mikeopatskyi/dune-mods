# createState

Creates a state object that provides functionality for managing application state.

## Parameters

- eventEmitter (optional): DuneEventEmitter - The event emitter to use for managing state change events. If not provided, a new event emitter will be created using `createEventEmitter()`.

## Returns

object - The state object with the following methods:

- `setState` (newState: object): void - Merges the new state with the existing state, updates the state property, and emits a 'stateChanged' event with the updated state as an argument.
- `getState` (): object - Retrieves the current state object.
- `subscribe` (callback: (state: object) => void): void - Adds a listener for the 'stateChanged' event and calls the specified callback function. The function will receive the updated state as an argument.
- `unsubscribe` (callback: (state: object) => void): void - Removes a listener for the 'stateChanged' event.
- `clearState` (): void - Clears the state object and emits a 'stateCleared' event.
- `_eventEmitter` - The underlying event emitter used for managing state change events.

## Example

```javascript
import createEventEmitter from '@event-emitter/event-emitter.fn';
import { DuneEventEmitter, DuneState } from '@core/types';

const createState = (eventEmitter?: DuneEventEmitter): DuneState => {
  // Implementation details...

  return {
    setState,
    getState,
    subscribe,
    unsubscribe,
    clearState,
    _eventEmitter,
  };
};

export default createState;
```
