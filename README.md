# Documentation

## Introduction

Welcome to the documentation for the `Dune` JavaScript utility package. `Dune` is designed to simplify common tasks in web development, offering modules for DOM manipulation, event handling, application state management, and HTTP requests. This documentation will guide you through the features and usage of each module.

## Table of Contents

- [DOM Manipulation](#dom-manipulation)

  - [Retrieves a collection of DOM elements that match the specified selector](#dom-nodes)
    - [`dom.nodes(selector)`](#dom-nodes)
  - [Iterates over a NodeList or array of DOM elements and applies a callback](#dom-eachNode)
    - [`dom.eachNode(elements, callback)`](#dom-eachNode)
  - [Attaches an event listener to one or more DOM elements based on the given selector](#dom-on)
    - [`dom.on(event, selector, handler)`](#dom-on)
  - [Binds an event listener to the specified DOM element(s) based on the given selector](#dom-bind)
    - [`dom.bind(event, selector, handler)`](#dom-bind)
  - [Adds a CSS class to the specified DOM element(s)](#dom-addClassName)
    - [`dom.addClassName(element, className)`](#dom-addClassName)
  - [Removes a CSS class from the specified DOM element(s)](#dom-removeClassName)
    - [`dom.removeClassName(element, className)`](#dom-removeClassName)
  - [Toggles a CSS class on the specified DOM element(s)](#dom-toggleClassName)
    - [`dom.toggleClassName(element, className)`](#dom-toggleClassName)
  - [Adds an attribute to the specified DOM element(s)](#dom-addAttr)
    - [`dom.addAttr(element, attrName, attrValue)`](#dom-addAttr)
  - [Removes an attribute from the specified DOM element(s)](#dom-removeAttr)
    - [`dom.removeAttr(element, attrName)`](#dom-removeAttr)
  - [Toggles an attribute on the specified DOM element(s)](#dom-toggleAttr)
    - [`dom.toggleAttr(element, attrName)`](#dom-toggleAttr)

- [CSS Manipulation](#css-manipulation)

  - [Create StyleSheet](#create-stylesheet)
    - [`styleSheet.create.sheet(id?)`](#styleSheet-create-sheet)
  - [Find StyleSheet](#find-stylesheet)
    - [`styleSheet.find.sheet(id)`](#styleSheet-find-sheet)
  - [Delete CSS Rules](#delete-css-rules)
    - [`styleSheet.delete.rules(styleSheet, indices)`](#styleSheet-delete-rules)
  - [Generate CSS Rule Text](#generate-css-rule-text)
    - [`styleSheet.generateCSSRuleText(obj, transform)`](#styleSheet-generate-css-rule-text)
  - [Insert CSS Rule Text](#insert-css-rule-text)
    - [`styleSheet.insertCSSRuleText(ruleText, id)`](#stylesheet-insertcssruletext)
  - [Insert CSS Variables](#insert-css-variables)
    - [`styleSheet.insertCSSVariables(variables, transform?, id?)`](#styleSheet-insert-css-variables)
  - [Update CSS Variables](#update-css-variables)
    - [`styleSheet.updateCSSVariables(variables, transform?, id?)`](#styleSheet-update-css-variables)
  - [Delete CSS Variables](#delete-css-variables)
    - [`styleSheet.delete.variables(variableNames, id?)`](#styleSheet-delete-variables)

- [Event Emitter](#event-emitter-module)

  - [Create Event Emitter (functional implementation)](#event-emitter--create-event-emitter)
    - [`eventEmitter.on(event, listener)`](#event-emitter--create-event-emitter)
    - [`eventEmitter.emit(event, data)`](#event-emitter--create-event-emitter)
    - [`eventEmitter.off(event, listener)`](#event-emitter--create-event-emitter)
  - [EventEmitter Class (class implementation)](#event-emitter--event-emitter-class)
    - [`eventEmitter.on(event, listener)`](#event-emitter--event-emitter-class)
    - [`eventEmitter.emit(event, data)`](#event-emitter--event-emitter-class)
    - [`eventEmitter.off(event, listener)`](#event-emitter--event-emitter-class)

- [State Management](#state-management)

  - [`state.createState(initialState)`](#statecreatestateinitialstate)
  - [`state.getState()`](#stategetstate)
  - [`state.setState(newState)`](#statesetstatenewstate)

- [HTTP Client](#http-client)
  - [`httpClient.get(url, options)`](#httpclientgeturl-options)
  - [`httpClient.post(url, data, options)`](#httpclientposturl-data-options)
  - [`httpClient.put(url, data, options)`](#httpclientputurl-data-options)
  - [`httpClient.delete(url, options)`](#httpclientdeleteurl-options)

---

## DOM Manipulation:

The `dom` module within the `Dune` utility package offers a comprehensive set of functions for manipulating the Document Object Model (DOM) of your web pages. These functions simplify common tasks such as selecting elements, iterating over elements, adding and removing classes, managing attributes, and binding event listeners. This section provides an overview of the available DOM manipulation functions and their usage.

<span id="dom-nodes"></span>

### nodes(selector: string | Element | NodeList): NodeListOf<Element> & DuneDomElement

Retrieves elements matching the selector and extends the NodeList with additional methods.

#### Parameters

- `selector` (string | Element | NodeList): Selector string, Element, or NodeList to query for elements.

#### Returns

- `NodeListOf<Element> & DuneDomElement`: NodeList with extended methods.

#### Example

```javascript
import { dom } from 'dune';

dom.nodes('.my-selector').each((element, index) => {
  console.log(`Element ${index}:`, element);
});
```

<span id="dom-eachNode"></span>

### eachNode(elements: NodeListOf<Element> | Node[], callback: (element: Element, index: number) => void): void

Iterates over a NodeList or array of elements and applies a callback function to each element.

#### Parameters

- `elements` (NodeListOf<Element> | Node[]): NodeList or array of elements to iterate over.
- `callback` ((element: Element, index: number) => void): Callback function to be executed for each element.

#### Example

```javascript
import { dom } from 'dune';

const elements = document.querySelectorAll('.my-selector');
dom.eachNode(elements, (element, index) => {
  console.log(`Element ${index}:`, element);
});
```

<span id="dom-on"></span>

### on(event: string, selector: string | Element | NodeList | Document | Window | null | undefined, handler: EventListenerOrEventListenerObject): void

Attaches an event listener to the target element(s) based on the selector.

#### Parameters

- `event` (string): The event type to listen for (e.g., 'click', 'keyup', 'mouseenter').
- `selector` (string | Element | NodeList | Document | Window): The selector string, Element, NodeList, Document, Window, null or undefined to match the target element(s).
- `handler` (EventListenerOrEventListenerObject): The event listener function or object to be executed when the event occurs.

#### Example

```javascript
import { dom } from 'dune';

// Example #1
const button = document.querySelector('#my-button');
dom.on('click', button, (event) => {
  console.log('Button clicked!', event);
});

// Example #2
const buttons = document.querySelector('.button');
dom.on('click', buttons, (event) => {
  console.log('Button clicked!', event);
});

// Example #3
dom.on('click', '.button', (event) => {
  console.log('Button clicked!', event);
});

// Example #4
dom.on('DOMContentLoaded', document, (event) => {
  console.log('Button clicked!', event);
});

// Example #5
dom.on('load', window, (event) => {
  console.log('Button clicked!', event);
});
```

<span id="dom-bind"></span>

### bind(event: string, selector: string | Element | NodeList | Document | Window | null | undefined, handler: EventListenerOrEventListenerObject): void

Binds an event listener to the specified element(s).

#### Parameters

- `event` (string): Event name to bind.
- `element` (string | Element | NodeList | Document | Window): The selector string, Element, NodeList, Document, Window, null or undefined to match the target element(s).
- `handler` (EventListenerOrEventListenerObject): Event listener or event handler function.

#### Example

```javascript
import { dom } from 'dune';

// Example #1
const button = document.querySelector('#my-button');
dom.bind('click', button, (event) => {
  console.log('Button clicked!', event);
});

// Example #2
const buttons = document.querySelector('.button');
dom.bind('click', buttons, (event) => {
  console.log('Button clicked!', event);
});

// Example #3
dom.bind('click', '.button', (event) => {
  console.log('Button clicked!', event);
});

// Example #4
dom.bind('DOMContentLoaded', document, (event) => {
  console.log('Button clicked!', event);
});

// Example #5
dom.bind('load', window, (event) => {
  console.log('Button clicked!', event);
});
```

<span id="dom-addClassName"></span>

### addClassName(element: string | Element | NodeList | null | undefined, className: string): void

Adds a CSS class to the specified element(s).

#### Parameters

- `element` (string | Element | NodeList): Selector string, Element, or NodeList to which the class should be added.
- `className` (string): CSS class to add.

#### Example

```javascript
import { dom } from 'dune';

const button = document.querySelector('#my-button');
dom.addClassName(button, 'active');
```

<span id="dom-removeClassName"></span>

### removeClassName(element: string | Element | NodeList | null | undefined, className: string): void

Removes a CSS class from the specified element(s).

#### Parameters

- `element` (string | Element | NodeList): Selector string, Element, or NodeList from which the class should be removed.
- `className` (string): CSS class to remove.

#### Example

```javascript
import { dom } from 'dune';

const button = document.querySelector('#my-button');
dom.removeClassName(button, 'active');
```

<span id="dom-toggleClassName"></span>

### toggleClassName(element: string | Element | NodeList | null | undefined, className: string): void

Toggles a CSS class on the specified element(s).

#### Parameters

- `element` (string | Element | NodeList): Selector string, Element, or NodeList on which the class should be toggled.
- `className` (string): CSS class to toggle.

#### Example

```javascript
import { dom } from 'dune';

const button = document.querySelector('#my-button');
dom.toggleClassName(button, 'active');
```

<span id="dom-addAttr"></span>

### addAttr(element: string | Element | NodeList | null | undefined, attrName: string, attrValue: string): void

Adds an attribute to the specified element(s).

#### Parameters

- `element` (string | Element | NodeList): Selector string, Element, or NodeList to which the attribute should be added.
- `attrName` (string): Attribute name to add.
- `attrValue` (string): Attribute value.

#### Example

```javascript
import { dom } from 'dune';

const input = document.querySelector('#my-input');
dom.addAttr(input, 'placeholder', 'Enter your name');
```

<span id="dom-removeAttr"></span>

### removeAttr(element: string | Element | NodeList | null | undefined, attrName: string): void

Removes an attribute from the specified element(s).

#### Parameters

- `element` (string | Element | NodeList): Selector string, Element, or NodeList from which the attribute should be removed.
- `attrName` (string): Attribute name to remove.

#### Example

```javascript
import { dom } from 'dune';

const input = document.querySelector('#my-input');
dom.removeAttr(input, 'placeholder');
```

<span id="dom-toggleAttr"></span>

### toggleAttr(element: string | Element | NodeList | null | undefined, attrName: string): void

Toggles an attribute on the specified element(s).

#### Parameters

- `element` (string | Element | NodeList): Selector string, Element, or NodeList on which the attribute should be toggled.
- `attrName` (string): Attribute name to toggle.

#### Example

```javascript
import { dom } from 'dune';

const checkbox = document.querySelector('#my-checkbox');
dom.toggleAttr(checkbox, 'checked');
```

---

## CSS Manipulation

The `styleSheet` module provides functions for creating, managing, and manipulating CSS styles dynamically. This documentation will guide you through the features and usage of the `styleSheet` module.

<span id="styleSheet-create-sheet"></span>

### Create StyleSheet

#### `styleSheet.create.sheet(id?)`

Creates a `<style>` element and appends it to the document's `<head>` if a stylesheet with the specified ID doesn't exist.

**Parameters:**

- `id` (string, optional): The ID of the `<style>` element to be created. Default value is `'theme-style'`.

**Example:**

```javascript
import { styleSheet } from 'dune';

styleSheet.create.sheet('custom-style');
```

<span id="styleSheet-find-sheet"></span>

### Find StyleSheet

#### `styleSheet.find.sheet(id)`

Searches for a stylesheet with the specified ID among the document's style sheets.

**Parameters:**

- `id` (string): The ID of the `<style>` element to search for.

**Returns:**

- `CSSStyleSheet | null`: The found `CSSStyleSheet` object or `null` if not found.

**Example:**

```javascript
import { styleSheet } from 'dune';

const sheet = styleSheet.find.sheet('custom-style');
if (sheet) {
  // Found the stylesheet
}
```

<span id="styleSheet-delete-rules"></span>

### Delete CSS Rules

#### `styleSheet.delete.rules(styleSheet, indices)`

Deletes CSS rules at the specified indices within the given `CSSStyleSheet`.

**Parameters:**

- `styleSheet` (CSSStyleSheet): The `CSSStyleSheet` object from which rules will be deleted.
- `indices` (number[]): An array of indices representing the positions of rules to be deleted.

**Example:**

```javascript
import { styleSheet } from 'dune';

const sheet = styleSheet.find.sheet('custom-style');
if (sheet) {
  styleSheet.delete.rules(sheet, [0, 1]);
}
```

<span id="styleSheet-generate-css-rule-text"></span>

### Generate CSS Rule Text

#### `styleSheet.generateCSSRuleText(obj, transform)`

Generates a CSS rule text for defining CSS variables from the provided object.

**Parameters:**

- `obj` (DuneCSSVariables): An object containing CSS variable names and their values.
- `transform` (boolean): A boolean flag indicating whether to transform variable names to CSS custom property syntax.

**Returns:**

- `string`: A string representing the CSS rule text.

**Example:**

```javascript
import { styleSheet } from 'dune';

const variables = {
  primaryColor: '#ff0000',
  fontSize: '16px',
};

const ruleText = styleSheet.generateCSSRuleText(variables, true);
console.log(ruleText);
```

<span id="stylesheet-insertcssruletext"></span>

### Insert CSS Rule Text

#### `styleSheet.insertCSSRuleText(ruleText: string, id?: string): void` <!-- New method -->

Inserts the provided CSS rule text into the stylesheet identified by the specified ID. If the stylesheet does not exist, it will be created.

##### Parameters

- `ruleText` (string): The CSS rule text to be inserted.
- `id` (string, optional): The ID of the stylesheet where the rule text will be inserted. Default value is `'theme-style'`.

##### Example

```javascript
import { styleSheet } from '@modules/style-sheet';

const customRule = `
  .custom-class {
    background-color: red;
    color: white;
  }
`;

styleSheet.insertCSSRuleText(customRule, 'custom-styles');
```

<span id="styleSheet-insert-css-variables"></span>

### Insert CSS Variables

#### `styleSheet.insertCSSVariables(variables, transform?, id?)`

Creates or updates CSS variables in the stylesheet identified by the specified ID.

**Parameters:**

- `variables` (DuneCSSVariables): An object containing CSS variable names and their values.
- `transform` (boolean, optional): A boolean flag indicating whether to transform variable names to CSS custom property syntax. Default value is `true`.
- `id` (string, optional): The ID of the stylesheet where variables will be created or updated. Default value is `'theme-style'`.

**Example:**

```javascript
import { styleSheet } from 'dune';

const variables = {
  primaryColor: '#ff0000',
  fontSize: '16px',
};

styleSheet.insertCSSVariables(variables);
```

<span id="styleSheet-update-css-variables"></span>

### Update CSS Variables

#### `styleSheet.updateCSSVariables(variables, transform?, id?)`

Updates or adds CSS variables to the stylesheet identified by the specified ID.

**Parameters:**

- `variables` (DuneCSSVariables): An object containing CSS variable names and their updated values.
- `transform` (boolean, optional): A boolean flag indicating whether to transform variable names to CSS custom property syntax. Default value is `true`.
- `id` (string, optional): The ID of the stylesheet to be updated. Default value is `'theme-style'`.

**Example:**

```javascript
import { styleSheet } from 'dune';

const updatedVariables = {
  primaryColor: '#00ff00',
  fontSize: '18px',
};

styleSheet.updateCSSVariables(updatedVariables);
```

<span id="styleSheet-delete-variables"></span>

### Delete CSS Variables

#### `styleSheet.delete.variables(variableNames, id?)`

Removes specified CSS variables from the stylesheet identified by the specified ID.

**Parameters:**

- `variableNames` (string[]): An array of CSS variable names to be removed.
- `id` (string, optional): The ID of the stylesheet from which variables will be removed. Default value is `'theme-style'`.

**Example:**

```javascript
import { styleSheet } from 'dune';

const variablesToDelete = ['primaryColor', 'fontSize'];
styleSheet.delete.variables(variablesToDelete);
```

---

## Event Emitter Module

The `event-emitter` module provides a lightweight event emitter implementation that enables you to easily manage and communicate events within your application.

<span id="event-emitter--create-event-emitter"></span>

### Create Event Emitter (functional implementation)

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

<span id="event-emitter--event-emitter-class"></span>

### EventEmitter Class (class implementation)

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
import { EventEmitter } from 'dune';

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
