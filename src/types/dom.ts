export interface DuneDomElement extends Element {
  each(
    callback: (element: Element, index: number, parent: NodeListOf<Element> | Element[]) => void
  ): void;
}

export interface DuneDom {
  nodes(selector: string): NodeListOf<Element> & DuneDomElement;
  eachNode(elements: NodeListOf<Element> | Node[], callback: () => void): void;
  on(
    event: string,
    selector: string | EventTarget | Element | NodeList | Document | Window | null | undefined,
    handler: EventListenerOrEventListenerObject
  ): void;
  bind(
    event: string,
    element: string | EventTarget | Element | NodeList | Document | Window | null | undefined,
    handler: EventListenerOrEventListenerObject
  ): void;
  unbind(
    event: string,
    element: string | EventTarget | Element | NodeList | Document | Window | null | undefined,
    handler?: EventListenerOrEventListenerObject
  ): void;
  addClassName(element: string | Element | NodeList | null | undefined, className: string): void;
  removeClassName(element: string | Element | NodeList | null | undefined, className: string): void;
  toggleClassName(element: string | Element | NodeList | null | undefined, className: string): void;
  addAttr(
    element: string | Element | NodeList | null | undefined,
    attrName: string,
    attrValue: string
  ): void;
  removeAttr(element: string | Element | NodeList | null | undefined, attrName: string): void;
  toggleAttr(element: string | Element | NodeList | null | undefined, attrName: string): void;
}
