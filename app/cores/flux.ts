import Dispatcher from "./dispatcher";

interface Handler {
  name: string;
  callback: Function;
  caller: Object;
}

let handlers: Handler[] = [],
  stores = new Map();

function HandleStore(target) {
  // save a reference to the original constructor
  let original = target;

  // a utility function to generate instances of a class
  function construct(constructor, args) {
    let c : any = function () {
      return constructor.apply(this, args);
    },
    newInstance;

    c.prototype = constructor.prototype;

    newInstance = new c();

    stores.set(c.displayName, newInstance);

    return newInstance;
  }

  // the new constructor behaviour
  let f : any = function (...args) {
    return construct(original, args);
  };

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f;
}

function HandleAction(eventName: string) {
  return (target: any, key: string, descriptor: any) => {
    handlers.push({name: eventName, callback: descriptor.value, caller: target.displayName});
  };
}

Dispatcher.register((action: any) => {
  handlers
    .filter(handler => handler.name === action.type)
    .forEach(handler => {
      let store = stores.get(handler.caller);

      if (store) {
        handler.callback.apply(store, [action]);
      }
    });
});

export {Dispatcher, HandleStore, HandleAction};
