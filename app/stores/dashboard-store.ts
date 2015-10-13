import * as Immutable from "immutable";
import randomColor from "randomcolor";

import BaseStore from "./base-store";
import DashboardConstants from "../constants/dashboard-constants";

/* tslint:disable */
import {HandleStore, HandleAction} from "../cores/flux";
/* tslint:enable */

interface DashboardAction {
  type: string;
  products?: Product[];
  productId?: string;
  fromIndex?: number;
  toIndex?: number;
}

@HandleStore
class DashboardStore extends BaseStore {
  static displayName = "DashboardStore";

  private _products = Immutable.List<Product>();
  private _lastCount: number;

  constructor() {
    super(DashboardConstants.DASHBOARD_CHANGE_EVENT);
  }

  get products() {
    return this._products.toArray();
  }


  @HandleAction(DashboardConstants.DASHBOARD_LOAD_COMPLETE)
  /* tslint:disable:no-unused-variable */
  private convertProductsToViewModel(action: DashboardAction) {
  /* tslint:enable:no-unused-variable */
    this._products = Immutable.List<Product>(action.products.map((product: Product, index: number) => {
      product.styles = {};
      return product;
    }));

    this.emitChange();
  }

  @HandleAction(DashboardConstants.DASHBOARD_MOVE_PRODUCT)
  /* tslint:disable:no-unused-variable */
  private changeProductsPosition(action: DashboardAction) {
  /* tslint:enable:no-unused-variable */
    this.swapProducts(action.fromIndex, action.toIndex);
    this.emitChange();
  }

  @HandleAction(DashboardConstants.DASHBOARD_REMOVE_PRODUCT)
  /* tslint:disable:no-unused-variable */
  private removeProduct(action: DashboardAction) {
  /* tslint:enable:no-unused-variable */
    let removedProduct = this._products.find(p => p.id === action.productId);

    this._products = this._products.remove(this._products.indexOf(removedProduct));

    this.emitChange();
  }

  @HandleAction(DashboardConstants.DASHBOARD_ADD_PRODUCT)
  /* tslint:disable:no-unused-variable */
  private addProduct(action: DashboardAction) {
  /* tslint:enable:no-unused-variable */
    let lastCount = (this._lastCount && this._lastCount + 1) || this._products.size,
        newProduct: Product = {
          id: Math.random().toString(),
          name: lastCount.toString(),
          price: Math.floor(Math.random() * (1000 - 10)) + 10,
          color: randomColor()
        },
        index = Math.floor(Math.random() * this._products.size);

    this._lastCount = lastCount;

    this._products = this._products.splice(index, 0, newProduct).toList();

    this.emitChange();
  }

  @HandleAction(DashboardConstants.DASHBOARD_SHUFFLE_PRODUCTS)
  /* tslint:disable:no-unused-variable */
  private shuffleProducts() {
  /* tslint:enable:no-unused-variable */
    let counter = this._products.size,
        index;

    // while there are elements in the array
    while (counter > 0) {
        // pick a random index
        index = Math.floor(Math.random() * counter);

        // decrease counter by 1
        counter--;

        // and swap the last element with it
        this.swapProducts(counter, index);
    }

    this.emitChange();
  }

  private swapProducts(fromIndex: number, toIndex: number) {
    let fromProduct = this._products.get(fromIndex);

    this._products = this._products.splice(fromIndex, 1).toList();
    this._products = this._products.splice(toIndex, 0, fromProduct).toList();
  }
}

export default new DashboardStore();
