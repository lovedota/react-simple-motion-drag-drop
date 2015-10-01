import './styles/dashboard-product-item.scss';

import React from 'react';
import classNames from "classnames";
import DashboardActions from '../../actions/dashboard-actions';

interface Props extends React.Props<any> {
  product: Product;
}

interface State {
  isDragging: boolean
}

class DashboardProductItemComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductItemComponent";

  constructor(props) {
    super(props);

    this.state = {
      isDragging: false
    }
  }

	render() {
    let {isDragging} = this.state,
      {product} = this.props,
      cssClasses = classNames('dashboard-product-item', {
        'dragging': isDragging
      });

    return (
      <div
        className={cssClasses}
     >
        {product.name}
        <a>
          <span className="glyphicon glyphicon-remove"></span>
        </a>
      </div>
    );
	}
}

export default DashboardProductItemComponent;
