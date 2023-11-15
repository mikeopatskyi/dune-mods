# createState

Creates a state object that provides functionality for managing application state.

## Table of Contents

- [createState](#createstate)
  - [Parameters](#parameters)
    - [eventEmitter](#eventemitter)
  - [Returns](#returns)
- [setState](#setstate)
  - [Parameters](#parameters-1)
    - [newState](#newstate)
- [getState](#getstate)
  - [Returns](#returns-1)
- [subscribe](#subscribe)
  - [Parameters](#parameters-2)
    - [callback](#callback)
- [unsubscribe](#unsubscribe)
  - [Parameters](#parameters-3)
    - [callback](#callback-1)
- [clearState](#clearstate)

## createState

Creates a state object that provides functionality for managing application state.

### Parameters

#### eventEmitter

- Type: DuneEventEmitter
- Optional: true

### Returns

- Type: object
- The state object with `setState`, `getState`, `subscribe`, `unsubscribe`, and `clearState` methods.

## setState

Merges the new state with the existing state, updates the state property, and emits a 'stateChanged' event with the updated state as an argument.

### Parameters

#### newState

- Type: object
- The new state object.

## getState

Retrieves the current state object.

### Returns

- Type: object
- The current state object.

## subscribe

Adds a listener for the 'stateChanged' event and calls the specified callback function.

### Parameters

#### callback

- Type: Function
- The function to be called when the state changes. The function will receive the updated state as an argument.

## unsubscribe

Removes a listener for the 'stateChanged' event.

### Parameters

#### callback

- Type: Function
- The callback function to remove as a listener.

## clearState

Clears the state object and emits a 'stateCleared' event.
