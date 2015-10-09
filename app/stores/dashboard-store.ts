import * as Immutable from "immutable";
import randomColor from "randomcolor";

import BaseStore from "./base-store";
import DashboardConstants from "../constants/dashboard-constants";

/* tslint:disable */
import {handle} from "../cores/flux";
import {Handle, Test} from "../decorators/factory";
/* tslint:enable */

interface DashboardAction {
  type: string;
  products?: Product[];
  productId?: string;
  fromIndex?: number;
  toIndex?: number;
}

class DashboardStore extends BaseStore {
  private _products = Immutable.List<Product>();
  private _lastCount: number;

  constructor() {
    super(DashboardConstants.DASHBOARD_CHANGE_EVENT);
  }

  get products() {
    return this._products.toArray();
  }

  /* tslint:disable:no-unused-variable */
  @Handle(DashboardConstants.DASHBOARD_LOAD_COMPLETE)
  private convertProductsToViewModel(action: DashboardAction) {
    this._products = Immutable.List<Product>(action.products.map((product: Product, index: number) => {
      product.styles = {};
      return product;
    }));

    this.emitChange();
  }

  @Handle(DashboardConstants.DASHBOARD_MOVE_PRODUCT)
  private changeProductsPosition(action: DashboardAction) {
    this.swapProducts(action.fromIndex, action.toIndex);
    this.emitChange();
  }

  @Handle(DashboardConstants.DASHBOARD_REMOVE_PRODUCT)
  private removeProduct(action: DashboardAction) {
    let removedProduct = this._products.find(p => p.id === action.productId);

    this._products = this._products.remove(this._products.indexOf(removedProduct));

    this.emitChange();
  }

  @Handle(DashboardConstants.DASHBOARD_ADD_PRODUCT)
  private addProduct(action: DashboardAction) {
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

  @Handle(DashboardConstants.DASHBOARD_SHUFFLE_PRODUCTS)
  private shuffleProducts() {
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
  /* tslint:enable:no-unused-variable */
}

export default new DashboardStore();
