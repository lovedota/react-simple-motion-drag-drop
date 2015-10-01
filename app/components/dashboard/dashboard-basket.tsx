import './styles/dashboard-basket.scss';

import React from 'react';
import classNames from "classnames";
import DashboardActions from '../../actions/dashboard-actions';

interface Props extends React.Props<any> {

}

interface State {
  isEnter: boolean;
}

class DashboardBasketComponent extends React.Component<Props, State> {
  static displayName = "DashboardBasketComponent";

  constructor(props) {
    super(props);

    this.state = {
      isEnter: false
    }
  }

	render() {
    let cssClasses = classNames('dashboard-basket col-md-5', {
      'enter': this.state.isEnter
    });

    return (
      <div
         className={cssClasses}
         onDrop={this.handleDrop}
         onDragEnter={this.handleDragEnter}
         onDragLeave={this.handleDragLeave}
         onDragOver={this.handleDragOver}
      >
        <div>dropzone</div>
      </div>
    );
	}

  private handleDrop = (e) => {
  	let id = e.dataTransfer.getData('id');
    DashboardActions.removeProduct(id);
    this.setState({isEnter: false});
  }

  private handleDragEnter = (e) => {
    this.setState({isEnter: true});
  }

  private handleDragLeave = (e) => {
    this.setState({isEnter: false});
  }

  private handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    this.setState({isEnter: true});
  }
}

export default DashboardBasketComponent;
