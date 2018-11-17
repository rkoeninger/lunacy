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
      property === "β" ? (...args) => extend(arg => f(arg)(...args)) :
      property === "ν" ? extend(arg => ν(f(arg))) :
                         extend(arg => extract(f(arg), property)),
    apply: (f, _1, args) =>
      args.some(x => x === _)
        ? (...[arg, ...rest]) => f(arg)(...merge(args, rest || []))
        : f(...args)
  });

  const β = (...args) =>
    args.some(x => x === _)
      ? (...rest) => β(...merge(args, rest || []))
      : (args.length === 0 ? undefined : args[0](...args.slice(1)));

  const Δ = (x, y) => Math.abs(x - (y || 0));

  const η = extend(x => x);

  const ι = n => [...Array(n).keys()];

  const ν = f => (...args) => !f(...args);

  const ξ = (x, y) => {
    if (typeof x !== "undefined") {
      if (typeof y !== "undefined") {
        x = Math.ceil(x);
        y = Math.floor(y);
        return Math.floor(Math.random() * (y - x)) + x;
      } else {
        x = Math.floor(x);
        return Math.floor(Math.random() * x);
      }
    }
    return Math.random();
  };

  const assignCopy = (renames, source) => (dest, key) => {
    dest[renames[key] || key] = source[key];
    return dest;
  };

  const ρ = (renames, object) =>
    object
      ? Object.keys(object).reduce(assignCopy(renames, object), {})
      : β(ρ, renames, _);

  const walkReduce = (f, acc, xs) =>
    Array.isArray(xs)
      ? xs.reduce(β(walkReduce, f, _, _), acc)
      : f(acc, xs);

  const Π = (...xs) => walkReduce((x, y) => x * y, 1, xs);

  const Σ = (...xs) => walkReduce((x, y) => x + y, 0, xs);

  const Γ =
    typeof global !== "undefined" ? global :
    typeof window !== "undefined" ? window :
                                    this;

  const exported = { β, Δ, η, ι, ν, ξ, ρ, Γ, Π, Σ, _ };

  Object.assign(typeof exports !== "undefined" ? exports : Γ, exported);
}
