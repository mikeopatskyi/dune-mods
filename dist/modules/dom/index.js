"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dom = void 0;
exports.dom = (() => {
    const listenersMap = new WeakMap();
    /**
     * Selects and returns a single element matching the specified selector.
     * This element will have custom methods like `getHtml`, `setHtml`, `getText`, and `setText`.
     *
     * @param selector - Selector string or Element to query for a single element.
     * @returns Custom DuneDomElement or null if no matching element is found.
     */
    const node = (selector) => {
        let element = null;
        if (typeof selector === 'string') {
            element = document.querySelector(selector);
        }
        else if (selector instanceof Element) {
            element = selector;
        }
        if (element) {
            element.getHtml = function () {
                return this.innerHTML;
            };
            element.setHtml = function (html) {
                this.innerHTML = html;
            };
            element.getText = function () {
                return this.textContent || '';
            };
            element.setText = function (text) {
                this.textContent = text;
            };
            element.each = function (callback) {
                callback(this, 0, [this]); // Since this is for a single node
            };
        }
        return element;
    };
    /**
     * Selects and extends elements matching the specified selector with additional methods.
     * @param selector - Selector string, Element, or NodeList to query for elements.
     * @returns NodeList with extended methods for simplified interaction.
     */
    const nodes = (selector) => {
        const elements = (typeof selector === 'string'
            ? document.querySelectorAll(selector)
            : selector instanceof Element
                ? [selector]
                : Array.from(selector));
        elements.each = function (callback) {
            Array.prototype.forEach.call(this, callback);
        };
        return elements;
    };
    /**
     * Iterates over a collection of elements and applies a callback function to each element.
     * @param elements - NodeList or array of elements to iterate over.
     * @param callback - Function to execute on each element.
     */
    const eachNode = (elements, callback) => {
        if (elements instanceof NodeList) {
            for (let i = 0; i < elements.length; i++) {
                callback(elements[i], i);
            }
        }
        else {
            elements?.length > 0 &&
                elements.forEach((element, index) => {
                    callback(element, index);
                });
        }
    };
    /**
     * Attaches an event listener to specified elements based on the provided selector.
     * @param event - Event type to listen for (e.g., 'click', 'keyup', 'mouseenter').
     * @param selector - Selector string, Element, NodeList, Document, Window, null, or undefined.
     * @param handler - Function to be executed when the event occurs.
     */
    const on = (event, selector, handler) => {
        if (selector === null || selector === undefined) {
            return;
        }
        const elements = [];
        const addElements = (selector) => {
            if (typeof selector === 'string') {
                elements.push(...Array.from(document.querySelectorAll(selector)));
            }
            else if (selector instanceof Element ||
                selector instanceof EventTarget ||
                selector instanceof Document) {
                elements.push(selector);
            }
            else if (selector instanceof NodeList) {
                elements.push(...Array.from(selector));
            }
        };
        if (selector instanceof Window) {
            selector.addEventListener(event, handler);
        }
        else {
            addElements(selector);
            const eventHandler = (event) => {
                const targetElement = event.target;
                if (elements.some((element) => element instanceof Element ? element === targetElement : element.contains(targetElement))) {
                    handler.call(targetElement, event);
                }
            };
            elements.forEach((element) => {
                element.addEventListener(event, eventHandler);
            });
        }
    };
    /**
     * Binds an event listener to the specified parent element using event delegation.
     * The event will only trigger for elements matching the delegateSelector.
     * @param event - The event type (e.g., 'click', 'change', etc.).
     * @param delegateSelector - The selector string for the child elements to delegate the event to.
     * @param handler - The event listener or handler function.
     * @param parentElement - The parent element to bind the event to (default is document).
     */
    const bind = (event, delegateSelector, handler, parentElement = document) => {
        // Event delegation using parent element
        const eventHandler = (e) => {
            // Ensure the event target or one of its ancestors matches the selector
            const targetElement = e.target;
            const delegateTarget = targetElement.closest(delegateSelector);
            // If the delegate target is found and is inside the parentElement, invoke the handler
            if (delegateTarget && parentElement.contains(delegateTarget)) {
                // Call the handler with the delegate target as `this`
                handler.call(delegateTarget, e);
            }
        };
        // Bind event listener to the parent element
        parentElement.addEventListener(event, eventHandler);
    };
    /**
     * Removes a bound event listener from the specified element(s) based on the provided selector.
     * This works for both delegated and non-delegated event listeners.
     * @param event - Event name to unbind.
     * @param element - Selector string, Element, NodeList, Document, Window, null, or undefined.
     * @param handler - (Optional) Specific handler to remove. If not provided, all handlers for the event will be removed.
     */
    const unbind = (event, element, handler) => {
        if (element === null || element === undefined) {
            return;
        }
        const elements = [];
        const addElements = (selector) => {
            if (typeof selector === 'string') {
                elements.push(...Array.from(document.querySelectorAll(selector)));
            }
            else if (selector instanceof Element ||
                selector instanceof EventTarget ||
                selector instanceof Document) {
                elements.push(selector);
            }
            else if (selector instanceof NodeList) {
                Array.from(selector).forEach((el) => {
                    if (el instanceof Element) {
                        elements.push(el);
                    }
                });
            }
        };
        // Add elements to be unbound
        addElements(element);
        elements.forEach((el) => {
            const listeners = listenersMap.get(el);
            if (listeners) {
                listeners
                    .filter((listener) => listener.event === event && (!handler || handler === listener.handler))
                    .forEach((listener) => {
                    el.removeEventListener(event, listener.handler);
                });
                // If a specific handler is provided, filter out the removed listener
                if (handler) {
                    listenersMap.set(el, listeners.filter((listener) => !(listener.event === event && handler === listener.handler)));
                }
                else {
                    // Otherwise, filter out all listeners for the event
                    listenersMap.set(el, listeners.filter((listener) => listener.event !== event));
                }
            }
        });
    };
    /**
     * Triggers an event on the specified element(s).
     * @param event - The name of the event to trigger (e.g., "click", "focus", "submit").
     * @param element - A selector string, Element, NodeList, or EventTarget on which to trigger the event.
     * @param options - (Optional) An object to customize event properties such as bubbles, cancelable, and more.
     */
    const triggerEvent = (event, element, options) => {
        // Create a new event with the specified type and options
        const evt = new Event(event, {
            bubbles: options?.bubbles ?? true,
            cancelable: options?.cancelable ?? true,
            ...options,
        });
        // Handle multiple elements or a single element
        const triggerOnElement = (el) => {
            el.dispatchEvent(evt);
        };
        if (typeof element === 'string') {
            // Select elements if a string selector is provided
            const elements = document.querySelectorAll(element);
            elements.forEach(triggerOnElement);
        }
        else if (element instanceof NodeList) {
            // Trigger the event on each node in a NodeList
            element.forEach(triggerOnElement);
        }
        else if (element) {
            // Trigger the event on a single element or EventTarget
            triggerOnElement(element);
        }
    };
    /**
     * Applies a class operation (add, remove, toggle) on the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param className - CSS class to add.
     * @param operation - 'add', 'remove', or 'toggle'
     */
    const modifyClass = (element, className, operation) => {
        if (!element)
            return;
        const applyOperation = (el) => {
            el.classList[operation](className);
        };
        if (typeof element === 'string') {
            document.querySelectorAll(element).forEach(applyOperation);
        }
        else if (element instanceof Element) {
            applyOperation(element);
        }
        else if (element instanceof NodeList) {
            element.forEach((el) => {
                if (el instanceof Element) {
                    applyOperation(el);
                }
            });
        }
    };
    /**
     * Checks if the specified element(s) have the given CSS class.
     * @param element - Selector string, Element, or NodeList.
     * @param className - CSS class to check.
     * @returns boolean - True if the class is present on any of the elements, false otherwise.
     */
    const hasClassName = (element, className) => {
        let found = false;
        const checkClass = (el) => {
            if (el.classList.contains(className)) {
                found = true;
            }
        };
        if (typeof element === 'string') {
            document.querySelectorAll(element).forEach(checkClass);
        }
        else if (element instanceof Element) {
            checkClass(element);
        }
        else if (element instanceof NodeList) {
            element.forEach((el) => {
                if (el instanceof Element) {
                    checkClass(el);
                }
            });
        }
        return found;
    };
    /**
     * Adds a CSS class to the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param className - CSS class to add.
     */
    const addClassName = (element, className) => {
        modifyClass(element, className, 'add');
    };
    /**
     * Removes a CSS class from the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param className - CSS class to remove.
     */
    const removeClassName = (element, className) => {
        modifyClass(element, className, 'remove');
    };
    /**
     * Toggles a CSS class on the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param className - CSS class to toggle.
     */
    const toggleClassName = (element, className) => {
        modifyClass(element, className, 'toggle');
    };
    /**
     * Applies an attribute operation (add, remove, toggle) on the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param attrName - Attribute name.
     * @param operation - 'add', 'remove', or 'toggle'.
     * @param attrValue? - Optional attribute value for the 'add' operation.
     */
    const modifyAttr = (element, attrName, operation, attrValue) => {
        if (!element)
            return;
        const applyOperation = (el) => {
            switch (operation) {
                case 'add':
                    el.setAttribute(attrName, attrValue || '');
                    break;
                case 'remove':
                    el.removeAttribute(attrName);
                    break;
                case 'toggle':
                    el.toggleAttribute(attrName);
                    break;
            }
        };
        if (typeof element === 'string') {
            document.querySelectorAll(element).forEach(applyOperation);
        }
        else if (element instanceof Element) {
            applyOperation(element);
        }
        else if (element instanceof NodeList) {
            element.forEach((el) => {
                if (el instanceof Element) {
                    applyOperation(el);
                }
            });
        }
    };
    /**
     * Adds an attribute to the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param attrName - Attribute name to add.
     * @param attrValue - Attribute value.
     */
    const addAttr = (element, attrName, attrValue) => {
        modifyAttr(element, attrName, 'add', attrValue);
    };
    /**
     * Removes an attribute from the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param attrName - Attribute name to remove.
     */
    const removeAttr = (element, attrName) => {
        modifyAttr(element, attrName, 'remove');
    };
    /**
     * Toggles an attribute on the specified element(s).
     * If the attribute is present, it is removed. If it is absent, it is added.
     * @param element - Selector string, Element, or NodeList.
     * @param attrName - Attribute name to toggle.
     */
    const toggleAttr = (element, attrName) => {
        modifyAttr(element, attrName, 'toggle');
    };
    /**
     * Applies CSS styles to the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param style - Object containing CSS properties and values.
     */
    const setStyle = (element, style) => {
        if (!element)
            return;
        const applyStyle = (el) => {
            Object.keys(style).forEach((property) => {
                el.style[property] = style[property];
            });
        };
        if (typeof element === 'string') {
            document.querySelectorAll(element).forEach((el) => {
                if (el instanceof HTMLElement) {
                    applyStyle(el);
                }
            });
        }
        else if (element instanceof HTMLElement) {
            applyStyle(element);
        }
        else if (element instanceof NodeList) {
            element.forEach((el) => {
                if (el instanceof HTMLElement) {
                    applyStyle(el);
                }
            });
        }
    };
    /**
     * Inserts HTML into the specified element(s).
     * @param element - Selector string, Element, or NodeList.
     * @param html - The HTML string to insert.
     * @param position - Optional. The position where the HTML will be inserted.
     * Default is 'beforeend'. Possible values: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'.
     */
    const insertHtml = (element, html, position = 'beforeend') => {
        if (!element)
            return;
        const applyHtml = (el) => {
            el.insertAdjacentHTML(position, html);
        };
        if (typeof element === 'string') {
            document.querySelectorAll(element).forEach((el) => {
                if (el instanceof HTMLElement) {
                    applyHtml(el);
                }
            });
        }
        else if (element instanceof HTMLElement) {
            applyHtml(element);
        }
        else if (element instanceof NodeList) {
            element.forEach((el) => {
                if (el instanceof HTMLElement) {
                    applyHtml(el);
                }
            });
        }
    };
    /**
     * Removes the specified element(s) from the DOM.
     * @param element - Selector string, Element, or NodeList to remove.
     */
    const removeHtmlElement = (element) => {
        if (!element)
            return;
        const removeElement = (el) => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };
        if (typeof element === 'string') {
            document.querySelectorAll(element).forEach(removeElement);
        }
        else if (element instanceof Element) {
            removeElement(element);
        }
        else if (element instanceof NodeList) {
            element.forEach((el) => {
                if (el instanceof Element) {
                    removeElement(el);
                }
            });
        }
    };
    return {
        node,
        nodes,
        eachNode,
        on,
        bind,
        unbind,
        triggerEvent,
        hasClassName,
        addClassName,
        removeClassName,
        toggleClassName,
        addAttr,
        removeAttr,
        toggleAttr,
        setStyle,
        insertHtml,
        removeHtmlElement,
    };
})();
exports.default = exports.dom;
//# sourceMappingURL=index.js.map