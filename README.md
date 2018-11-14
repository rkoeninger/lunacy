[![Build Status](https://travis-ci.org/rkoeninger/delambda.svg?branch=master)](https://travis-ci.org/rkoeninger/delambda)

# De-Lambda

> De-lambda your JavaScript with ES6 Proxies!

## Examples

```javascript
[{p:1}, {p:2}, {p:3}].map($.p)

// [1, 2, 3]
```

```javascript
[{p:{q:1}}, {p:{q:2}}, {p:{q:3}}].map($.p.q)

// [1, 2, 3]
```
