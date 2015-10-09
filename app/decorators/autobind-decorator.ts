let excludeFunctions = ["render", "componentDidMount", "componentWillUnmount", "constructor"];

function AutoBind(target) {
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

    let propeties = Object.getOwnPropertyNames(newInstance.__proto__);

    propeties.forEach(prop => {
      if (!excludeFunctions.includes(prop) && typeof newInstance[prop] === "function") {
        newInstance[prop] = newInstance[prop].bind(newInstance);
      }
    });

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

export default AutoBind;
