interface Product {
  id: string;
  name?: string;
  color?: string;
  price?: number;
  styles?: any;
}

interface Window {
    helloWorld():void;
}

interface Array<T> {
  includes(T): boolean;
}
