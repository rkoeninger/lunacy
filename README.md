[![Build Status](https://travis-ci.org/rkoeninger/delambda.svg?branch=master)](https://travis-ci.org/rkoeninger/delambda)

# De-Lambda

> De-lambda your JavaScript with ES6 Proxies!

## Examples

```javascript
[{p:1}, {p:2}, {p:3}].map(_.p)

// [1, 2, 3]
```

```javascript
[{p:{q:1}}, {p:{q:2}}, {p:{q:3}}].map(_.p.q)

// [1, 2, 3]
```

```javascript
[1, 2, 3].map(_)

// [1, 2, 3]
```

```javascript
const m = x => ({
  x,
  f() { return this.x + 1; }
});
[m(0), m(1), m(2)].map(_.f).map(z => z())

// [1, 2, 3]
```

```javascript
const m = x => ({
  x,
  f(y) { return this.x + y; }
});
[m(0), m(1), m(2)].map(_.f.$(1))

// [1, 2, 3]
```

## Usage

Typically, all one must do to use delambda is write:

```javascript
const _ = require("delambda");
```

Keep in mind that delambda's use of `_` and `$` can conflict with `jQuery`, `underscorejs` and `lodash` as they too are fond of these symbols.

Since unicdoe is allowed in JavaScript identifiers, I might recommend binding to `η`, the Greek letter eta, instead. It's somewhat appropriate as [eta-reduction][eta-reduction] often relieves us of writing lambdas in languages where currying is the norm.

[eta-reduction]: https://wiki.haskell.org/Eta_conversion
