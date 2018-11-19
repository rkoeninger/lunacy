[![travis-ci](https://travis-ci.org/rkoeninger/lunacy.svg?branch=master)](https://travis-ci.org/rkoeninger/lunacy)
[![npm](https://img.shields.io/npm/v/lunacy.svg)](https://www.npmjs.com/package/lunacy)

# Lunacy

> The kind of library that only comes out at night...

## Examples

```javascript
β(f)              // f()
β(f, x)           // f(x)
β(f, x, y)        // f(x, y)
β(_, x)           // f => f(x)
β(_, x, _)        // (f, y) => f(x, y)

Δ(x, y)           // Math.abs(x - y)
Δ(x)              // Math.abs(x)

η                 // x => x
η.p               // x => x.p
η.f.β(1)          // x => x.f(1)
η.f(_)            // (x, y) => x.f(y)
η.f(0, _)         // (x, y) => x.f(0, y)
η.f.ν             // (x, y) => !x.f(y)
η.f.ν.β(1, _)     // (x, y) => !x.f(1, y)

ι(5)              // [0, 1, 2, 3, 4]

ν(f)              // x => !f(x)

ξ()               // Math.random()
ξ(max)            // Math.floor(Math.random() * max)
ξ(min, max)       // Math.floor(Math.random() * (max - min)) + min

ρ({a:"b"}, {a:1}) // {b:1}

Γ                 // global || window

Π(x, y, z)        // x * y * z
Π([x, y, z])      // x * y * z

Σ(x, y, z)        // x + y + z
Σ([x, y, z])      // x + y + z

℮(x)              // Math.round(x)
℮(x, precision)   // Math.round(x / precision) * precision

ℝ(x)              // typeof x === "number" && isFinite(x)
ℤ(x)              // ℝ(x) && Number.isInteger(x)
ℕ(x)              // ℤ(x) && x >= 0
𝔸(x)              // Array.isArray(x)
𝕊(x)              // typeof x === "string"

ಠ_ಠ(x)            // typeof x === "undefined"
```

## Usage

Typically, all one must do to engage in lunacy is write:

```javascript
const { _, β, Δ, η, ι, ν, ξ, ρ, Γ, Π, Σ, ℮, ℝ, ℤ, ℕ, 𝔸, 𝕊, ಠ_ಠ } = require("lunacy");
```

To avoid naming conflicts, don't use Greek letters in your own code. Only I'm allowed to do that.
