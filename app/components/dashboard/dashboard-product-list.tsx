import "./styles/dashboard-product-list.scss";

import React from "react";
import {Motion, spring} from "../../libs/react-motion";

import {clamp} from "../../helpers/calculation-helpers";
import Autobind from "../../decorators/autobind-decorator";

import DashboardActions from "../../actions/dashboard-actions";

interface Props extends React.Props<any> {
  products: Product[];
}

interface State {
  mouse?: number[];
  delta?: number[]; // difference between mouse and circle pos, for dragging
  lastPress?: any; // key of the last pressed component
  isPressed?: boolean;
}

const
  ITEM_WIDTH = 70,
  ITEM_HEIGHT = 90,
  ITEM_PER_COL = 6;

@Autobind
class DashboardProductListComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductListComponent";

  private layout: number[][] = [];

  constructor(props) {
    super(props);

    this.state = {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false
    };
  }

  componentDidMount() {
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillReceiveProps(nextProps) {
    this.createLayout(nextProps.products.length);
  }

  render() {
    let {products} = this.props,
      {lastPress, isPressed, mouse} = this.state,
      layout = this.layout;

    return (
      <div className="dashboard-product-list col-md-7">
        {products.map((product, index) => {
          let visualPosition = index,
            key = product.id,
            style,
            x,
            y;

          // if product is moving item
          if (key === lastPress && isPressed) {
            [x, y] = mouse;
            style = {
              translateX: x,
              translateY: y,
              scale: spring(1.2, [180, 10]),
              boxShadow: spring((x - (ITEM_PER_COL * ITEM_WIDTH - 50) / 2) / 15, [180, 10])
            };
          } else {
            [x, y] = layout[visualPosition];
            style = {
              translateX: spring(x, [120, 17]),
              translateY: spring(y, [120, 17]),
              scale: spring(1, [180, 10]),
              boxShadow: spring((x - (ITEM_PER_COL * ITEM_WIDTH - 50) / 2) / 15, [180, 10])
            };
          }

          return (
            <Motion key={key} style={style}>
              {({translateX, translateY, scale, boxShadow}) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, key, [x, y]) }
                  onTouchStart={this.handleTouchStart.bind(null, key, [x, y]) }
                  onDoubleClick={this.handleDoubleClick.bind(null, key) }
                  className="dashboard-product-item"
                  style={{
                    backgroundColor: product.color,
                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: key === lastPress ? 99 : visualPosition,
                    boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`
                  }}
                  >
                  <span>{product.name}</span>
                  </div>
              }
              </Motion>
          );
        }) }
        </div>
    );
  }

  private createLayout(count: number) {
    this.layout = Array.apply(null, Array(count)).map((_, n) => {
      let row = Math.floor(n / ITEM_PER_COL),
        col = n % ITEM_PER_COL;

      return [ITEM_WIDTH * col, ITEM_HEIGHT * row];
    });
  }

  private handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  private handleTouchMove(e: TouchEvent) {
    e.preventDefault();

    this.handleMouseMove(e.touches[0]);
  }

  private handleMouseMove({pageX, pageY}) {
    let {products} = this.props,
      {lastPress, isPressed, delta: [dx, dy]} = this.state,
      count = products.length;

    if (isPressed) {
      let mouse = [pageX - dx, pageY - dy],
        col = clamp(Math.floor(mouse[0] / ITEM_WIDTH), 0, ITEM_PER_COL - 1),
        row = clamp(Math.floor(mouse[1] / ITEM_HEIGHT), 0, Math.floor(count / ITEM_PER_COL)),
        index = row * ITEM_PER_COL + col,
        fromIndex = products.findIndex(product => product.id === lastPress);

      DashboardActions.moveProduct(fromIndex, index);
      this.setState({ mouse: mouse });
    }
  }

  private handleMouseDown(key, [pressX, pressY], event: React.MouseEvent) {
    this.setState({
      lastPress: key,
      isPressed: true,
      delta: [event.pageX - pressX, event.pageY - pressY],
      mouse: [pressX, pressY]
    });
  }

  private handleMouseUp() {
    this.setState({ isPressed: false, delta: [0, 0] });
  }

  private handleDoubleClick(key) {
    DashboardActions.removeProduct(key);
  }
}

export default DashboardProductListComponent;
