import React from "react";

import DashboardProductList from "./dashboard-product-list";
import DashboardActionButtons from "./dashboard-action-buttons";
import DashboardStore from "../../stores/dashboard-store";

import {AutoBind} from "../../decorators/factory";

interface Props {

}

interface State {
  products: Product[];
}

function getStateFromStores(): State {
  return {
    products: DashboardStore.products
  };
}

@AutoBind
class DashboardPageComponent extends React.Component<Props, State> {
  constructor() {
      super();
      this.state = getStateFromStores();
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this.onChange);
  }

  componentDidMount() {
    DashboardStore.addChangeListener(this.onChange);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <DashboardProductList
              ref="productList"
              products={this.state.products}
            />
          </div>
          <div className="col-md-3">
            <DashboardActionButtons />
          </div>
        </div>
       </div>
     );
  }

  private onChange() {
    this.setState(getStateFromStores());
  }
}

export default DashboardPageComponent;
