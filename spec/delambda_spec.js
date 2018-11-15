const { β, η, ι, _ } = require("../delambda");

describe("delambda", () => {
  it("η on its own is an identity function", () =>
    expect([1, 2, 3].map(η)).toEqual([1, 2, 3]));
  it("single property accessor", () => {
    const m = p => ({ p });
    expect([1, 2, 3].map(m).map(η.p)).toEqual([1, 2, 3]);
  });
  it("nested property accessor", () => {
    const m = q => ({ p: { q } });
    expect([1, 2, 3].map(m).map(η.p.q)).toEqual([1, 2, 3]);
  });
  it("double-nested property accessor", () => {
    const m = r => ({ p: { q: { r } } });
    expect([1, 2, 3].map(m).map(η.p.q.r)).toEqual([1, 2, 3]);
  });
  it("property function values are bound to target", () => {
    const m = x => ({ x, f() { return this.x * this.x; } });
    expect([1, 2, 3].map(m).map(η.f(_))).toEqual([1, 4, 9]);
  });
  it("β collects argument to apply to function once target is provided", () => {
    const m = x => ({ x, f(y) { return this.x + y; } });
    expect([1, 2, 3].map(m).map(η.f.β(5))).toEqual([6, 7, 8]);
  });
  it("β collects multiple arguments to apply to function once target is provided", () => {
    const m = x => ({ x, f(y, z) { return (this.x + y) * z; } });
    expect([1, 2, 3].map(m).map(η.f.β(5, 3))).toEqual([18, 21, 24]);
  });
  it("using _ as an argument creates a partial application", () => {
    const m = x => ({ x, f(y) { return this.x + y; } });
    expect([1, 2, 3].map(m).map(η.f(5, _))).toEqual([6, 7, 8]);
  });
  it("using _ simply to trigger deferred application", () => {
    const m = x => ({ x, f(y, z) { return (this.x + y) * z; } });
    expect([1, 2, 3].map(m).map(η.f(5, 3, _))).toEqual([18, 21, 24]);
  });
  it("β applies a function", () => {
    const m = x => () => x * 2;
    expect([1, 2, 3].map(m).map(β)).toEqual([2, 4, 6]);
  });
  it("ι generates array of numbers from 0 to n", () => {
    expect([0, 1, 5].map(ι)).toEqual([[], [0], [0, 1, 2, 3, 4]]);
  });
});
