# DOM Manipulation:

The `dom` module within the `Dune` utility package offers a comprehensive set of functions for manipulating the Document Object Model (DOM) of your web pages. These functions simplify common tasks such as selecting elements, iterating over elements, adding and removing classes, managing attributes, and binding event listeners. This section provides an overview of the available DOM manipulation functions and their usage.

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
