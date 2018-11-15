{
  const extract = (object, property) => {
    const value = object[property];
    return typeof value === "function" ? value.bind(object) : value;
  };

  const isEmpty = x => !x || x.length < 1;

  const _ = { NULL: null };

  const merge = (xss, yss) => {
    if (isEmpty(xss)) { return yss; }
    if (isEmpty(yss)) { return xss.filter(x => x !== _); }
    const [x, ...xs] = xss;
    const [y, ...ys] = yss;
    return x === _
      ? [y, ...merge(xs, ys)]
      : [x, ...merge(xs, yss)];
  };

  const extend = select => new Proxy(select, {
    get(f, property, _2) {
      return property === "β"
        ? (...args) => extend(arg => f(arg)(...args))
        : extend(arg => extract(f(arg), property));
    },
    apply(f, _1, args) {
      if (args.some(x => x === _)) {
        // TODO: clean this up
        return (...args2) => {
          // TODO: arg ends up being the wildcard
          const arg = args2 && args2.length > 0 && args2[0];
          const rest = (args2 && args2.length > 1 && args2.slice(1)) || [];
          const ff = f(arg);
          const merged = merge(args, rest);
          return ff(...merged);
          //(f(arg)(merge(args, rest)))
        };
      } else {
        return f(...args);
      }
    }
  });

  const η = extend(x => x);

  if (typeof module !== "undefined") {
    module.exports = { η, _ };
  } else if (typeof global !== "undefined") {
    global.η = η;
    global._ = _;
  } else if (typeof window !== "undefined") {
    window.η = η;
    window._ = _;
  } else {
    throw new Error("None of module, global, window are defined");
  }
}
