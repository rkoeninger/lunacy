{
  const getBound = (object, property) => {
    const value = object[property];
    return typeof value === "function" ? value.bind(object) : value;
  };

  const extend = select => {
    return new Proxy(select, {
      get(f, property, _2) {
        return extend(arg => getBound(f(arg), property));
      },
      apply(f, _1, args) {
        return f(...args);
      }
    });
  };

  const root = extend(x => x);

  if (typeof module !== "undefined") {
    module.exports = root;
  } else {
    window.delambda = root;
  }
}
