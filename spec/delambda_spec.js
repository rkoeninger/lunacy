const _ = require("../delambda");

describe("delambda", () => {
  it("single property accessor", () => {
    const p = x => ({ p: x });
    const xs = [1, 2, 3];
    expect(xs.map(p).map(_.p)).toEqual(xs);
  });
  it("nested property accessor", () => {
    const pq = x => ({ p: { q: x } });
    const xs = [1, 2, 3];
    expect(xs.map(pq).map(_.p.q)).toEqual(xs);
  });
  it("double-nested property accessor", () => {
    const pqr = x => ({ p: { q: { r: x } } });
    const xs = [1, 2, 3];
    expect(xs.map(pqr).map(_.p.q.r)).toEqual(xs);
  });
  it("property function values are bound to target", () => {
    const o = { x: 3, f(y) { return this.x + y; } };
    expect(_.f(o)(5)).toEqual(8);
  });
  it("$ collects argument to apply to function once target is provided", () => {
    const o = { x: 3, f(y) { return this.x + y; } };
    expect(_.f.$(5)(o)).toEqual(8);
  });
  it("$ collects multiple arguments to apply to function once target is provided", () => {
    const o = { x: 3, f(y, z) { return (this.x + y) * z; } };
    expect(_.f.$(5, 3)(o)).toEqual(24);
  });
  it("using _ as an argument creates a partial application", () => {
    const o = { x: 3, f(y) { return this.x + y; } };
    expect(_.f(_)(o, 5)).toEqual(8);
  });
  it("using _ simply to trigger deferred application", () => {
    const o = { x: 3, f(y, z) { return (this.x + y) * z; } };
    expect(_.f(5, 3, _)(o)).toEqual(24);
  });
});
