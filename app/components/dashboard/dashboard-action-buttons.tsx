import './styles/dashboard-basket.scss';

import React from 'react';
import classNames from "classnames";
import DashboardActions from '../../actions/dashboard-actions';

interface Props extends React.Props<any> {

}

interface State {

}

class DashboardActionButtonsComponent extends React.Component<Props, State> {
  static displayName = "DashboardActionButtonsComponent";

  constructor(props) {
    super(props);
  }

	render() {
    return (
      <div className="btn-group">
        <button className="btn btn-primary" onClick={this.handleAddNewClick}>Add New</button>
        <button className="btn btn-default" onClick={this.handleShuffleClick}>Shuffle</button>
      </div>
    );
	}

  private handleShuffleClick = (e) => {
    DashboardActions.shuffleProducts();
  }

  private handleAddNewClick = (e) => {
    DashboardActions.addProduct();
  }
}

export default DashboardActionButtonsComponent;
