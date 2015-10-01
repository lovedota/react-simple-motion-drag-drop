import {EventEmitter} from "events";
import Dispatcher from "../cores/dispatcher";

interface Action {
  type: string;
}

class BaseStore extends EventEmitter {

  static handlers = new Map();
  changeEventName: string;
  dispatchToken: string;
  className: string;

  constructor(changeEventName) {
    super();
    this.changeEventName = changeEventName;

    this.dispatchToken = Dispatcher.register((action: Action) => {
      let handlerName = `${this.className}__${action.type}`;

      if (BaseStore.handlers.has(handlerName)) {
        let handlerFunction: Function = BaseStore.handlers.get(handlerName);
        handlerFunction.apply(this, [action]);
      }
    });
  }

  addChangeListener(callback) {
    this.on(this.changeEventName, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.changeEventName, callback);
  }

  emitChange() {
    this.emit(this.changeEventName);
  }

  waitFor(tokens) {
    Dispatcher.waitFor(tokens);
  }

  register(eventName, handler) {
    let funcNameRegex = /function (.{1,})\(/,
        results = (funcNameRegex).exec((this).constructor.toString()),
        className = (results && results.length > 1) ? results[1] : "";

    this.className = className;

    BaseStore.handlers.set(`${className}__${eventName}`, handler);
  }
}

export default BaseStore;
