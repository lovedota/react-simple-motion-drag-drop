export {default as AutoBind} from "./autobind-decorator";
export {default as Handle} from "./handle-decorator";

import {memoize} from "lodash";

export function Test(target, name, descriptor) {
  const { value, get } = descriptor;

  return {
    get() {
      let newDescriptor: any = { configurable: true };

      // if we are dealing with a getter
      if (get) {
        // replace the getter with the processed one
        newDescriptor.get = memoize(get);

        // redefine the property on the instance with the new descriptor
        Object.defineProperty(this, name, newDescriptor);

        // return the getter result
        return newDescriptor.get();
      }

      // process the function
      newDescriptor.value = memoize(value);

      // redfine it on the instance with the new descriptor
      Object.defineProperty(this, name, newDescriptor);

      // return the processed function
      return newDescriptor.value;
    }
  };
}
