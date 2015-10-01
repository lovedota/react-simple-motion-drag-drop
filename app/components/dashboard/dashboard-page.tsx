import React from 'react';
import logClass from '../../decorators/log-class-decorator';
import DashboardProductList from './dashboard-product-list';
import DashboardActionButtons from './dashboard-action-buttons';
import DashboardBasket from './dashboard-basket';
import DashboardStore from '../../stores/dashboard-store';

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

@logClass
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
          <DashboardProductList products={this.state.products} ref="productList"/>
         </div>
       </div>
     );
  }

  private onChange = () => {
    this.setState(getStateFromStores());
  }
}

export default DashboardPageComponent;
