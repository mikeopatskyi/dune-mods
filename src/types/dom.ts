export interface DuneDomElement extends Element {
  getHtml(): string;
  setHtml(html: string): void;
  getText(): string;
  setText(text: string): void;
  each(
    callback: (element: Element, index: number, parent: NodeListOf<Element> | Element[]) => void
  ): void;
}

export interface DuneDom {
  node(selector: string | Element): DuneDomElement | null;
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
  triggerEvent(
    event: string,
    element: string | Element | NodeList | EventTarget | null | undefined,
    options?: EventInit
  ): void;
  hasClassName(element: string | Element | NodeList, className: string): boolean;
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
  setStyle(
    element: string | Element | NodeList | null | undefined,
    style: { [key: string]: string | number }
  ): void;
  insertHtml(
    element: string | Element | NodeList | null | undefined,
    html: string,
    position?: InsertPosition
  ): void;
  removeHtmlElement(element: string | Element | NodeList | null | undefined): void;
}
