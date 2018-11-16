[![Build Status](https://travis-ci.org/rkoeninger/lunacy.svg?branch=master)](https://travis-ci.org/rkoeninger/lunacy)

# Lunacy

> A playful kind of madness!

## Examples

```javascript
β(f)         // f()
β(f, x)      // f(x)
β(f, x, y)   // f(x, y)
β(_, x)      // f => f(x)
β(_, x, _)   // (f, y) => f(x, y)

Δ(x, y)      // Math.abs(x - y)
Δ(x)         // Math.abs(x)

η            // x => x
η.p          // x => x.p
η.f.β(1)     // x => x.f(1)
η.f(_)       // (x, y) => x.f(y)
η.f(0, _)    // (x, y) => x.f(0, y)

ι(5)         // [0, 1, 2, 3, 4]

ν(f)         // x => !f(x)

ξ()          // Math.random()
ξ(max)       // Math.floor(Math.random() * max)
ξ(min, max)  // Math.floor(Math.random() * (max - min)) + min

ρ(x, y, o)   // Reflect.deleteProperty({ ...o, [y]: o[x] }, x)

Π(x, y, z)   // x * y * z
Π([x, y, z]) // x * y * z

Σ(x, y, z)   // x + y + z
Σ([x, y, z]) // x + y + z
```

## Usage

Typically, all one must do to engage in lunacy is write:

```javascript
const { β, Δ, η, ι, ν, ξ, ρ, Π, Σ, _ } = require("lunacy");
```

To avoid naming conflicts, don't use Greek letters in your own code. Only I'm allowed to do that.
