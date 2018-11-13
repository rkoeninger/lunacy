function getBound(object, property) {
  const value = object[property];
  return (typeof value === "function") ? value.bind(object) : value;
}

function extend(select) {
  const handler = {
    get(f, property, _2) {
      return extend(arg => getBound(f(arg), property));
    },
    apply(f, _1, args) {
      // TODO: if any args are the root delambda proxy, make new
      //       selector that partially applies inner function
      const wildcardIndices = args
        .map((x, i) => (x === $) ? i : undefined)
        .filter(x => x !== undefined);
      if (wildcardIndices.length > 0) {
        // TODO: take arg(s) here and put in place of wildcard
        //       values in args from outer scope
        console.log("partial application time: " + wildcardIndices);
        return extend(arg => "composed proxy goes here");
      }
      return f(...args);
    }
  };
  return new Proxy(select, handler);
}

var $ = extend(x => x);
