const extend = select => new Proxy(select, {
  get(_, property) {
    return extend(target => {
      const value = target[property];
      return (typeof value === "function") ? value.bind(target) : value;
    });
  },
  apply(_, self, args) {
    return select(args[0]);
  }
});

// wrap function with a version that further composes
// de-lambda proxy when called on a de-lambda proxy object
// and calls through when given other type

// ^^^ this is so you can write ($.f(0)) and it's equivalent
// to (x => x.f(0))

// need a way to make ($.func($)) translate to
// ((x, y) => x.f(y))

// need some way to track left-to-right order of $
// instances so we know argument order?

// need $._1, $._2 etc so we can specify arg indicies?

// $(...) so we can have deferred values?

const $ = extend(x => x);
