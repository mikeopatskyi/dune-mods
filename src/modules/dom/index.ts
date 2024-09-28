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
   * Selects and returns a single element matching the specified selector.
   * This element will have custom methods like `getHtml`, `setHtml`, `getText`, and `setText`.
   *
   * @param selector - Selector string or Element to query for a single element.
   * @returns Custom DuneDomElement or null if no matching element is found.
   */
  const node = (selector: string | Element): DuneDomElement | null => {
    let element: DuneDomElement | null = null;

    if (typeof selector === 'string') {
      element = document.querySelector(selector) as DuneDomElement | null;
    } else if (selector instanceof Element) {
      element = selector as DuneDomElement;
    }

    if (element) {
      element.getHtml = function () {
        return this.innerHTML;
      };

      element.setHtml = function (html: string) {
        this.innerHTML = html;
      };

      element.getText = function () {
        return this.textContent || '';
      };

      element.setText = function (text: string) {
        this.textContent = text;
      };

      element.each = function (
        callback: (element: Element, index: number, parent: NodeListOf<Element> | Element[]) => void
      ) {
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
   * Binds an event listener to the specified parent element using event delegation.
   * The event will only trigger for elements matching the delegateSelector.
   * @param event - The event type (e.g., 'click', 'change', etc.).
   * @param delegateSelector - The selector string for the child elements to delegate the event to.
   * @param handler - The event listener or handler function.
   * @param parentElement - The parent element to bind the event to (default is document).
   */
  const bind = (
    event: string,
    delegateSelector: string,
    handler: EventListenerOrEventListenerObject,
    parentElement: Document | HTMLElement | Window = document
  ): void => {
    // Event delegation using parent element
    const eventHandler = (e: Event) => {
      // Ensure the event target or one of its ancestors matches the selector
      const targetElement = e.target as Element;
      const delegateTarget = targetElement.closest(delegateSelector);

      // If the delegate target is found and is inside the parentElement, invoke the handler
      if (delegateTarget && (parentElement as HTMLElement).contains(delegateTarget)) {
        // Call the handler with the delegate target as `this`
        (handler as EventListener).call(delegateTarget, e);
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
          .filter(
            (listener) => listener.event === event && (!handler || handler === listener.handler)
          )
          .forEach((listener) => {
            el.removeEventListener(event, listener.handler);
          });

        // If a specific handler is provided, filter out the removed listener
        if (handler) {
          listenersMap.set(
            el,
            listeners.filter(
              (listener) => !(listener.event === event && handler === listener.handler)
            )
          );
        } else {
          // Otherwise, filter out all listeners for the event
          listenersMap.set(
            el,
            listeners.filter((listener) => listener.event !== event)
          );
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
  const triggerEvent = (
    event: string,
    element: string | Element | NodeList | EventTarget | null | undefined,
    options?: EventInit
  ): void => {
    // Create a new event with the specified type and options
    const evt = new Event(event, {
      bubbles: options?.bubbles ?? true,
      cancelable: options?.cancelable ?? true,
      ...options,
    });

    // Handle multiple elements or a single element
    const triggerOnElement = (el: Element | EventTarget) => {
      el.dispatchEvent(evt);
    };

    if (typeof element === 'string') {
      // Select elements if a string selector is provided
      const elements = document.querySelectorAll(element);
      elements.forEach(triggerOnElement);
    } else if (element instanceof NodeList) {
      // Trigger the event on each node in a NodeList
      element.forEach(triggerOnElement);
    } else if (element) {
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
   * Checks if the specified element(s) have the given CSS class.
   * @param element - Selector string, Element, or NodeList.
   * @param className - CSS class to check.
   * @returns boolean - True if the class is present on any of the elements, false otherwise.
   */
  const hasClassName = (element: string | Element | NodeList, className: string): boolean => {
    let found = false;

    const checkClass = (el: Element) => {
      if (el.classList.contains(className)) {
        found = true;
      }
    };

    if (typeof element === 'string') {
      document.querySelectorAll(element).forEach(checkClass);
    } else if (element instanceof Element) {
      checkClass(element);
    } else if (element instanceof NodeList) {
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

  /**
   * Applies CSS styles to the specified element(s).
   * @param element - Selector string, Element, or NodeList.
   * @param style - Object containing CSS properties and values.
   */
  const setStyle = (
    element: string | Element | NodeList | null | undefined,
    style: { [key: string]: string | number }
  ): void => {
    if (!element) return;

    const applyStyle = (el: HTMLElement) => {
      Object.keys(style).forEach((property) => {
        el.style[property as any] = style[property] as string;
      });
    };

    if (typeof element === 'string') {
      document.querySelectorAll(element).forEach((el) => {
        if (el instanceof HTMLElement) {
          applyStyle(el);
        }
      });
    } else if (element instanceof HTMLElement) {
      applyStyle(element);
    } else if (element instanceof NodeList) {
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
  const insertHtml = (
    element: string | Element | NodeList | null | undefined,
    html: string,
    position: InsertPosition = 'beforeend'
  ): void => {
    if (!element) return;

    const applyHtml = (el: HTMLElement) => {
      el.insertAdjacentHTML(position, html);
    };

    if (typeof element === 'string') {
      document.querySelectorAll(element).forEach((el) => {
        if (el instanceof HTMLElement) {
          applyHtml(el);
        }
      });
    } else if (element instanceof HTMLElement) {
      applyHtml(element);
    } else if (element instanceof NodeList) {
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
  const removeHtmlElement = (element: string | Element | NodeList): void => {
    if (!element) return;

    const removeElement = (el: Element) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };

    if (typeof element === 'string') {
      document.querySelectorAll(element).forEach(removeElement);
    } else if (element instanceof Element) {
      removeElement(element);
    } else if (element instanceof NodeList) {
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

export default dom;
