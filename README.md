[![Build Status](https://travis-ci.org/rkoeninger/delambda.svg?branch=master)](https://travis-ci.org/rkoeninger/delambda)

# De-Lambda

> De-lambda your JavaScript with ES6 Proxies!

## Examples

```javascript
β(f)        // f()
β(f, x)     // f(x)
β(f, x, y)  // f(x, y)
β(_, x)     // f => f(x)
β(_, x, _)  // (f, y) => f(x, y)

Δ(x, y)     // Math.abs(x - y)
Δ(x)        // Math.abs(x)

η           // x => x
η.p         // x => x.p
η.f.β(1)    // x => x.f(1)
η.f(_)      // (x, y) => x.f(y)
η.f(0, _)   // (x, y) => x.f(0, y)

ι(5)        // [0, 1, 2, 3, 4]

ξ()         // Math.random()
ξ(max)      // Math.floor(Math.random() * max)
ξ(min, max) // Math.floor(Math.random() * (max - min)) + min
```

## Usage

Typically, all one must do to use delambda is write:

```javascript
const { β, Δ, η, ι, _ } = require("delambda");
```

`η` is somewhat appropriate for the extractor builder object as [eta-reduction][eta-reduction] involves lambda elimination.

[eta-reduction]: https://wiki.haskell.org/Eta_conversion
