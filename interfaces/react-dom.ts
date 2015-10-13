import React = __React;

interface ReactDOM {
  findDOMNode<TElement extends Element>(componentOrElement: React.Component<any, any> | Element): TElement;
  findDOMNode(componentOrElement: React.Component<any, any> | Element): Element;
  render<P>(element: React.DOMElement<P>, container: Element, callback?: () => any): React.DOMComponent<P>;
  render<P, S>(element: React.ClassicElement<P>, container: Element, callback?: () => any): React.ClassicComponent<P, S>;
  render<P, S>(element: React.ReactElement<P>, container: Element, callback?: () => any): React.Component<P, S>;
}

declare module "react-dom" {
    let reactDOM: ReactDOM;
    export default reactDOM;
}
