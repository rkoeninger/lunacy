[![Build Status](https://travis-ci.org/rkoeninger/delambda.svg?branch=master)](https://travis-ci.org/rkoeninger/delambda)

# De-Lambda

> De-lambda your JavaScript with ES6 Proxies!

## Examples

```javascript
[1, 2, 3].map(η)                             // [1, 2, 3]

[{p:1}, {p:2}, {p:3}].map(η.p)               // [1, 2, 3]

[{p:{q:1}}, {p:{q:2}}, {p:{q:3}}].map(η.p.q) // [1, 2, 3]

const m = x => ({ x, f() { return this.x + 1; } });
[m(0), m(1), m(2)].map(η.f).map(z => z())    // [1, 2, 3]

const m = x => ({ x, f(y) { return this.x + y; } });
[m(0), m(1), m(2)].map(η.f.β(1))             // [1, 2, 3]

const m = x => ({ x, f(y) { return this.x + y; } });
[m(0), m(1), m(2)].map(η.f(1, _))            // [1, 2, 3]

η.f(_)       // (x, y) => x.f(y)

β(f)         // f()
β(f, x)      // f(x)
β(f, x, y)   // f(x, y)

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
