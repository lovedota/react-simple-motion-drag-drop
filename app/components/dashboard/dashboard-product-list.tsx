import './styles/dashboard-product-list.scss';

import React from 'react';
import classNames from "classnames";
import {Spring, Motion, spring} from '../../libs/react-motion';
import Add from '../../libs/add';

import DashboardProductItem from './dashboard-product-item';
import DashboardActions from '../../actions/dashboard-actions';

interface Props extends React.Props<any> {
  products: Product[];
}

interface State {
  mouse?: number[];
  delta?: number[]; // difference between mouse and circle pos, for dragging
  lastPress?: any; // key of the last pressed component
  isPressed?: boolean;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const
  ITEM_WIDTH = 70,
  ITEM_HEIGHT = 90,
  ITEM_PER_COL = 3;

class DashboardProductListComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductListComponent";

  private layout: any[] = [];

  constructor(props) {
    super(props);

    this.state = {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false
    }
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
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
          let style;
          let x;
          let y;
          let visualPosition = index;
          let key = product.id;

          if (key === lastPress && isPressed) {
            [x, y] = mouse;
            style = {
              translateX: x,
              translateY: y,
              scale: spring(1.2, [180, 10]),
              boxShadow: spring((x - (3 * ITEM_WIDTH - 50) / 2) / 15, [180, 10])
            };
          } else {
            [x, y] = layout[visualPosition];
            style = {
              translateX: spring(x, [120, 17]),
              translateY: spring(y, [120, 17]),
              scale: spring(1, [180, 10]),
              boxShadow: spring((x - (3 * ITEM_WIDTH - 50) / 2) / 15, [180, 10])
            };
          }
          return (
            <Motion key={key} style={style}>
              {({translateX, translateY, scale, boxShadow}) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                  onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                  className="dashboard-product-item"
                  style={{
                    backgroundColor: product.color,
                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: key === lastPress ? 99 : visualPosition,
                    boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
                  }}
                />
              }
            </Motion>
          );
        })}
      </div>
    );
	}

  private createLayout = (count: number) => {
    this.layout = Array.apply(null, Array(count)).map((_, n) => {
      let row = Math.floor(n / ITEM_PER_COL),
          col = n % ITEM_PER_COL;

      return [ITEM_WIDTH * col, ITEM_HEIGHT * row];
    });
  }

  private handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  private handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    this.handleMouseMove(e.touches[0]);
  }

  private handleMouseMove = ({pageX, pageY}) => {
    let {products} = this.props,
        {lastPress, isPressed, delta: [dx, dy]} = this.state,
        count = products.length;

    if (isPressed) {
      let mouse = [pageX - dx, pageY - dy];
      let col = clamp(Math.floor(mouse[0] / ITEM_WIDTH), 0, 2);
      let row = clamp(Math.floor(mouse[1] / ITEM_HEIGHT), 0, Math.floor(count / ITEM_PER_COL));
      let index = row * ITEM_PER_COL + col;
      let fromIndex = products.findIndex(product => product.id === lastPress);
      DashboardActions.moveProduct(fromIndex, index);
      this.setState({mouse: mouse});
    }
  }

  private handleMouseDown = (key, [pressX, pressY], {pageX, pageY}) => {
    this.setState({
      lastPress: key,
      isPressed: true,
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
    });
  }

  handleMouseUp = () => {
    this.setState({isPressed: false, delta: [0, 0]});
  }
}

export default DashboardProductListComponent;
