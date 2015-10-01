import * as Immutable from "immutable";
import BaseStore from "./base-store";
import DashboardConstants from "../constants/dashboard-constants";
import handle from "../decorators/handle-decorator";

interface DashboardAction {
  type: string;
  products?: Product[];
  productId?: string;
  fromIndex?: number;
  toIndex?: number;
}

class DashboardStore extends BaseStore {
  private _products:  Immutable.IndexedIterable<Product> = Immutable.List<Product>();

  constructor() {
    super(DashboardConstants.DASHBOARD_CHANGE_EVENT);
  }

  get products() {
    return this._products.toArray();
  }

  @handle(DashboardConstants.DASHBOARD_LOAD_COMPLETE)
  private convertProductsToViewModel(action: DashboardAction) {
    this._products = Immutable.List<Product>(action.products.map((product: Product, index: number) => {
      product.styles = {};
      return product;
    }));

    this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_MOVE_PRODUCT)
  private changeProductsPosition(action: DashboardAction) {
    let fromProduct = this._products.get(action.fromIndex),
      toProduct = this._products.get(action.toIndex);

    this._products = this._products.splice(action.fromIndex, 1);
    this._products = this._products.splice(action.toIndex, 0, fromProduct);

    this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_REMOVE_PRODUCT)
  private removeProduct(action: DashboardAction) {
    // let removedProduct = this._products.find(p => p.id === action.productId);
    //
    // removedProduct.styles = {
    //   "WebkitTransform": "translate3d(850px,75px, 0)",
    //   "transform": "translate3d(850px,75px, 0)",
    //   "transition": "all 2s ease 0s"
    // };
    //
    // this.emitChange();
    //
    // setTimeout(() => {
    //   // 1. Remove product
    //   this._products = this._products.remove(this._products.indexOf(removedProduct));
    //
    //   // 2. Refresh the order
    //   this._products.forEach(p => {
    //     if (p.order >= removedProduct.order) {
    //       p.order = p.order - 1;
    //     }
    //   });
    //
    //   // 3. Make move animation
    //   this.createListStyles();
    //
    //   this.emitChange();
    // }, 100);
  }

  @handle(DashboardConstants.DASHBOARD_ADD_PRODUCT)
  private addProduct(action: DashboardAction) {
    // let newProduct: Product = {
    //   id: Math.random().toString(),
    //   name: `Product ${this._products.size + 1}`,
    //   price: Math.floor(Math.random() * (1000 - 10)) + 10,
    //   order: this._products.size
    // };
    //
    // // 1. Add product
    // this._products = this._products.push(newProduct);
    //
    // // 2. Make move animation
    // this.createListStyles();
    //
    // this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_SHUFFLE_PRODUCTS)
  private shuffleProducts() {
    let array = this._products,
      currentIndex = array.size,
      temporaryValue,
      randomIndex,
      randomItem,
      currentItem;

    // 1. While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      currentItem = array.get(currentIndex);
      randomItem = array.get(randomIndex);
      // and swap it with the current element.
      temporaryValue = currentItem.order;
      currentItem.order = randomIndex;
      randomItem.order = temporaryValue;
    }

    this.emitChange();
  }
}

export default new DashboardStore();
