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

  const β = (...args) =>
    args.some(x => x === _)
      ? (...rest) => β(...merge(args, rest || []))
      : (args.length === 0 ? undefined : args[0](...args.slice(1)));

  const Δ = (x, y) => Math.abs(x - (y || 0));

  const extract = (object, property) => {
    const x = object[property];
    return typeof x === "function" ? x.bind(object) : x;
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

  const η = extend(x => x);

  const ι = n => [...Array(n).keys()];

  const ν = f => (...args) => !f(...args);

  const ξ = (x, y) => {
    if (!ಠ_ಠ(x)) {
      if (!ಠ_ಠ(y)) {
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

  const ρ = (renames, source) =>
    Object.keys(source).reduce((dest, key) => {
      dest[renames[key] || key] = source[key];
      return dest;
    }, {});

  const Γ =
    typeof global !== "undefined" ? global :
    typeof window !== "undefined" ? window :
                                    this;

  const walkReduce = (f, acc, xs) =>
    𝔸(xs)
      ? xs.reduce(β(walkReduce, f, _, _), acc)
      : f(acc, xs);

  const Π = (...xs) => walkReduce((x, y) => x * y, 1, xs);

  const Σ = (...xs) => walkReduce((x, y) => x + y, 0, xs);

  const ℮ = (x, precision = 1) => Math.round(x / precision) * precision;

  const ℝ = x => typeof x === "number" && isFinite(x);

  const ℤ = x => ℝ(x) && Number.isInteger(x);

  const ℕ = x => ℤ(x) && x >= 0;

  const 𝔸 = Array.isArray;

  const 𝕊 = x => typeof x === "string";

  const ಠ_ಠ = x => typeof x === "undefined";

  const exported = { _, β, Δ, η, ι, ν, ξ, ρ, Γ, Π, Σ, ℮, ℝ, ℤ, ℕ, 𝔸, 𝕊, ಠ_ಠ };

  Object.assign(typeof exports !== "undefined" ? exports : Γ, exported);
}
