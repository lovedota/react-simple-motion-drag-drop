import Dispatcher from "./dispatcher";
import {memoize} from "lodash";

let handlers = [];

function handle(eventName: string) {
  return (target: any, key: string, descriptor: any) => {
    const { value, get } = descriptor;

    handlers.push({name: eventName, function: key, target: target});

    return {
      get: function getter() {
        let newDescriptor: any = { configurable: true };

        // ff we are dealing with a getter
        if (get) {
          // replace the getter with the processed one
          newDescriptor.get = memoize(get);

          // redefine the property on the instance with the new descriptor
          Object.defineProperty(this, name, newDescriptor);

          // return the getter result
          return newDescriptor.get();
        }

        // rrocess the function
        newDescriptor.value = memoize(value);

        // redfine it on the instance with the new descriptor
        Object.defineProperty(this, name, newDescriptor);
        let self = this;
        handlers
          .filter(handler => handler.name === eventName)
          .forEach(handler => {
            handler.target = self;
          });

        // return the processed function
        return newDescriptor.value;
      }
    };
  };
}

Dispatcher.register((action: any) => {
  handlers
    .filter(handler => handler.name === action.type)
    .forEach(handler => {
      handler.target[handler.function](action);
    });
});

export {Dispatcher, handle};
