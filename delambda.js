{
  const _ = Symbol("_");

  const isEmpty = x => !x || x.length < 1;

  const merge = (xss, yss) => {
    if (isEmpty(xss)) { return yss; }
    if (isEmpty(yss)) { return xss.filter(x => x !== _); }
    const [x, ...xs] = xss;
    const [y, ...ys] = yss;
    return x === _
      ? [y, ...merge(xs, ys)]
      : [x, ...merge(xs, yss)];
  };

  const extract = (object, property) => {
    const value = object[property];
    return typeof value === "function" ? value.bind(object) : value;
  };

  const extend = select => new Proxy(select, {
    get: (f, property, _2) =>
      property === "β"
        ? (...args) => extend(arg => f(arg)(...args))
        : extend(arg => extract(f(arg), property)),
    apply: (f, _1, args) =>
      args.some(x => x === _)
        ? (...[arg, ...rest]) => f(arg)(...merge(args, rest || []))
        : f(...args)
  });

  const β = (...args) => args.some(x => x === _)
    ? (...rest) => β(...merge(args, rest || []))
    : (args.length === 0 ? undefined : args[0](...args.slice(1)));

  const Δ = (x, y) => Math.abs(x - (y || 0));

  const η = extend(x => x);

  const ι = n => [...Array(n).keys()];

  const ξ = Math.random;

  const exported = { β, Δ, η, ι, ξ, _ };

  if (typeof module !== "undefined") {
    module.exports = exported;
  } else if (typeof global !== "undefined") {
    Object.keys(exported).forEach(k => global[k] = exported[k]);
  } else if (typeof window !== "undefined") {
    Object.keys(exported).forEach(k => window[k] = exported[k]);
  } else {
    throw new Error("None of module.exports, global, window are defined");
  }
}
