[![Build Status](https://travis-ci.org/rkoeninger/delambda.svg?branch=master)](https://travis-ci.org/rkoeninger/delambda)

# De-Lambda

> De-lambda your JavaScript with ES6 Proxies!

## Examples

```javascript
const m1 = x => ({ x, f() { return this.x + 1; } });
const my = x => ({ x, f(y) { return this.x + y; } });

[1, 2, 3].map(η)                    // [1, 2, 3]
[{p:1}, {p:2}, {p:3}].map(η.p)      // [1, 2, 3]
[0, 1, 2].map(m1).map(η.f).map(β)    // [1, 2, 3]
[0, 1, 2].map(my).map(η.f.β(1))      // [1, 2, 3]
[0, 1, 2].map(my).map(η.f(1, _))     // [1, 2, 3]

η.f(_)       // (x, y) => x.f(y)
η.f(0, _)    // (x, y) => x.f(0, y)

β(f)         // f()
β(f, x)      // f(x)
β(f, x, y)   // f(x, y)
β(_, x)      // f => f(x)
β(_, x, _)   // (f, y) => f(x, y)

ι(10)        // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Usage

Typically, all one must do to use delambda is write:

```javascript
const { η, _ } = require("delambda");
```

The Greek letter eta (`η`) is preferred for a couple of reasons:

- It's not likely to be used by any other library
- It's also somewhat appropriate as [eta-reduction][eta-reduction] involves lambda elimination

The underscore is preferred for the wildcard argument, but another symbol can be used if underscore.js or lodash are in scope.

[eta-reduction]: https://wiki.haskell.org/Eta_conversion
