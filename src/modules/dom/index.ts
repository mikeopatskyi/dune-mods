/**
 * A lightweight utility library for DOM manipulation and event handling.
 */
import { DuneDom, DuneDomElement } from '@core/types';

export const dom: DuneDom = (() => {
  const listenersMap: WeakMap<
    Element,
    {
      event: string;
      handler: EventListenerOrEventListenerObject;
    }[]
  > = new WeakMap();

  /**
   * Selects and extends elements matching the specified selector with additional methods.
   * @param selector - Selector string, Element, or NodeList to query for elements.
   * @returns NodeList with extended methods for simplified interaction.
   */
  const nodes = (selector: string | Element | NodeList): NodeListOf<Element> & DuneDomElement => {
    const elements = (
      typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : selector instanceof Element
        ? [selector]
        : Array.from(selector)
    ) as NodeListOf<Element> & DuneDomElement;

    elements.each = function (callback) {
      Array.prototype.forEach.call(this, callback);
    };

    return elements as NodeListOf<Element> & DuneDomElement;
  };

  /**
   * Iterates over a collection of elements and applies a callback function to each element.
   * @param elements - NodeList or array of elements to iterate over.
   * @param callback - Function to execute on each element.
   */
  const eachNode = (
    elements: NodeListOf<Element> | Node[],
    callback: (element: Element, index: number) => void
  ): void => {
    if (elements instanceof NodeList) {
      for (let i = 0; i < elements.length; i++) {
        callback(elements[i], i);
      }
    } else {
      elements?.length > 0 &&
        elements.forEach((element, index) => {
          callback(element as Element, index);
        });
    }
  };

  /**
   * Attaches an event listener to specified elements based on the provided selector.
   * @param event - Event type to listen for (e.g., 'click', 'keyup', 'mouseenter').
   * @param selector - Selector string, Element, NodeList, Document, Window, null, or undefined.
   * @param handler - Function to be executed when the event occurs.
   */
  const on = (
    event: string,
    selector: string | EventTarget | Element | NodeList | Document | Window | null | undefined,
    handler: EventListenerOrEventListenerObject
  ): void => {
    if (selector === null || selector === undefined) {
      return;
    }

    const elements: Node[] = [];

    const addElements = (
      selector: string | EventTarget | Element | NodeList | Document | Window
    ) => {
      if (typeof selector === 'string') {
        elements.push(...Array.from(document.querySelectorAll(selector)));
      } else if (
        selector instanceof Element ||
        selector instanceof EventTarget ||
        selector instanceof Document
      ) {
        elements.push(selector as Node);
      } else if (selector instanceof NodeList) {
        elements.push(...Array.from(selector));
      }
    };

    if (selector instanceof Window) {
      selector.addEventListener(event, handler);
    } else {
      addElements(selector);

      const eventHandler = (event: Event) => {
        const targetElement = event.target as Element;

        if (
          elements.some((element) =>
            element instanceof Element ? element === targetElement : element.contains(targetElement)
          )
        ) {
          (handler as EventListener).call(targetElement, event);
        }
      };

      elements.forEach((element) => {
        element.addEventListener(event, eventHandler);
      });
    }
  };

  /**
   * Binds an event listener to the specified element(s) based on the provided selector.
   * @param event - Event name to bind.
   * @param element - Selector string, Element, NodeList, Document, Window, null, or undefined.
   * @param handler - Event listener or event handler function.
   */
  const bind = (
    event: string,
    element: string | EventTarget | Element | NodeList | Document | Window | null | undefined,
    handler: EventListenerOrEventListenerObject
  ): void => {
    if (element === null || element === undefined) {
      return;
    }

    const elements: Element[] = [];

    const addElements = (
      selector: string | EventTarget | Element | NodeList | Document | Window
    ) => {
      if (typeof selector === 'string') {
        elements.push(...Array.from(document.querySelectorAll(selector)));
      } else if (
        selector instanceof Element ||
        selector instanceof EventTarget ||
        selector instanceof Document
      ) {
        elements.push(selector as Element);
      } else if (selector instanceof NodeList) {
        Array.from(selector).forEach((element) => {
          if (element instanceof Element) {
            elements.push(element);
          }
        });
      }
    };

    if (
      element instanceof Window ||
      typeof element === 'string' ||
      element instanceof Element ||
      element instanceof NodeList ||
      element instanceof Document
    ) {
      if (element instanceof Window) {
        element.addEventListener(event, handler);
      } else {
        addElements(element);

        const eventHandler = (event: Event) => {
          const targetElement = event.target as Element;

          if (
            elements.some((element) => element === targetElement || element.contains(targetElement))
          ) {
            (handler as EventListener).call(targetElement, event);
          }
        };

        elements.forEach((element) => {
          element.addEventListener(event, eventHandler);
          if (!listenersMap.has(element)) {
            listenersMap.set(element, []);
          }
          listenersMap.get(element)?.push({ event, handler: eventHandler });
        });
      }
    }
  };

  /**
   * Removes a bound event listener from the specified element(s) based on the provided selector.
   * @param event - Event name to unbind.
   * @param element - Selector string, Element, NodeList, Document, Window, null, or undefined.
   * @param handler - (Optional) Specific handler to remove. If not provided, all handlers for the event will be removed.
   */
  const unbind = (
    event: string,
    element: string | EventTarget | Element | NodeList | Document | Window | null | undefined,
    handler?: EventListenerOrEventListenerObject
  ): void => {
    if (element === null || element === undefined) {
      return;
    }

    const elements: Element[] = [];

    const addElements = (
      selector: string | EventTarget | Element | NodeList | Document | Window
    ) => {
      if (typeof selector === 'string') {
        elements.push(...Array.from(document.querySelectorAll(selector)));
      } else if (
        selector instanceof Element ||
        selector instanceof EventTarget ||
        selector instanceof Document
      ) {
        elements.push(selector as Element);
      } else if (selector instanceof NodeList) {
        Array.from(selector).forEach((element) => {
          if (element instanceof Element) {
            elements.push(element);
          }
        });
      }
    };

    addElements(element);

    elements.forEach((element) => {
      const listeners = listenersMap.get(element);
      if (listeners) {
        listeners
          .filter(
            (listener) => listener.event === event && (!handler || handler === listener.handler)
          )
          .forEach((listener) => {
            element.removeEventListener(event, listener.handler);
          });

        // If a specific handler is provided, filter out the removed listener
        if (handler) {
          listenersMap.set(
            element,
            listeners.filter(
              (listener) => !(listener.event === event && handler === listener.handler)
            )
          );
        } else {
          // Otherwise, filter out all listeners for the event
          listenersMap.set(
            element,
            listeners.filter((listener) => listener.event !== event)
          );
        }
      }
    });
  };

  /**
   * Applies a class operation (add, remove, toggle) on the specified element(s).
   * @param element - Selector string, Element, or NodeList.
   * @param className - CSS class to add.
   * @param operation - 'add', 'remove', or 'toggle'
   */
  const modifyClass = (
    element: string | Element | NodeList,
    className: string,
    operation: 'add' | 'remove' | 'toggle'
  ): void => {
    if (!element) return;

    const applyOperation = (el: Element) => {
      el.classList[operation](className);
    };

    if (typeof element === 'string') {
      document.querySelectorAll(element).forEach(applyOperation);
    } else if (element instanceof Element) {
      applyOperation(element);
    } else if (element instanceof NodeList) {
      element.forEach((el) => {
        if (el instanceof Element) {
          applyOperation(el);
        }
      });
    }
  };

  /**
   * Adds a CSS class to the specified element(s).
   * @param element - Selector string, Element, or NodeList.
   * @param className - CSS class to add.
   */
  const addClassName = (element: string | Element | NodeList, className: string): void => {
    modifyClass(element, className, 'add');
  };

  /**
   * Removes a CSS class from the specified element(s).
   * @param element - Selector string, Element, or NodeList.
   * @param className - CSS class to remove.
   */
  const removeClassName = (element: string | Element | NodeList, className: string): void => {
    modifyClass(element, className, 'remove');
  };

  /**
   * Toggles a CSS class on the specified element(s).
   * @param element - Selector string, Element, or NodeList.
   * @param className - CSS class to toggle.
   */
  const toggleClassName = (element: string | Element | NodeList, className: string): void => {
    modifyClass(element, className, 'toggle');
  };

  /**
   * Applies an attribute operation (add, remove, toggle) on the specified element(s).
   * @param element - Selector string, Element, or NodeList.
   * @param attrName - Attribute name.
   * @param operation - 'add', 'remove', or 'toggle'.
   * @param attrValue? - Optional attribute value for the 'add' operation.
   */
  const modifyAttr = (
    element: string | Element | NodeList,
    attrName: string,
    operation: 'add' | 'remove' | 'toggle',
    attrValue?: string
  ): void => {
    if (!element) return;

    const applyOperation = (el: Element) => {
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
    } else if (element instanceof Element) {
      applyOperation(element);
    } else if (element instanceof NodeList) {
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
  const addAttr = (
    element: string | Element | NodeList,
    attrName: string,
    attrValue: string
  ): void => {
    modifyAttr(element, attrName, 'add', attrValue);
  };

  /**
   * Removes an attribute from the specified element(s).
   * @param element - Selector string, Element, or NodeList.
   * @param attrName - Attribute name to remove.
   */
  const removeAttr = (element: string | Element | NodeList, attrName: string): void => {
    modifyAttr(element, attrName, 'remove');
  };

  /**
   * Toggles an attribute on the specified element(s).
   * If the attribute is present, it is removed. If it is absent, it is added.
   * @param element - Selector string, Element, or NodeList.
   * @param attrName - Attribute name to toggle.
   */
  const toggleAttr = (element: string | Element | NodeList, attrName: string): void => {
    modifyAttr(element, attrName, 'toggle');
  };

  return {
    nodes,
    eachNode,
    on,
    bind,
    unbind,
    addClassName,
    removeClassName,
    toggleClassName,
    addAttr,
    removeAttr,
    toggleAttr,
  };
})();

export default dom;
