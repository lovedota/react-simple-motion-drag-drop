function logClass(target) {
  // save a reference to the original constructor
  let original = target;

  // a utility function to generate instances of a class
  function construct(constructor, args) {
    let c : any = function () {
      return constructor.apply(this, args);
    };

    c.prototype = constructor.prototype;

    return new c();
  }

  // the new constructor behaviour
  let f : any = function (...args) {
    console.log("New: " + original.name);
    return construct(original, args);
  };

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f;
}

export default logClass;
