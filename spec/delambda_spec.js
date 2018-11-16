const { β, Δ, η, ι, ν, ξ, Π, Σ, _ } = require("../delambda");

describe("delambda", () => {
  describe("β", () => {
    it("β applies a function", () => {
      const m = x => () => x * 2;
      expect([1, 2, 3].map(m).map(β)).toEqual([2, 4, 6]);
    });
    it("using _ in β creates a partial application", () => {
      const m = x => y => x * 2 + 1;
      expect([1, 2, 3].map(m).map(β(_, 1))).toEqual([3, 5, 7]);
    });
    it("β() returns undefined", () =>
      expect(β()).toBe(undefined));
  });
  describe("Δ", () => {
    it("Δ(x, y) returns difference between x and y", () =>
      expect(Δ(14, -27)).toEqual(41));
    it("Δ(x) returns the absolute value of x", () =>
      expect(Δ(-27)).toEqual(27));
  });
  describe("η", () => {
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
    it("η.f.β collects argument to apply to function once target is provided", () => {
      const m = x => ({ x, f(y) { return this.x + y; } });
      expect([1, 2, 3].map(m).map(η.f.β(5))).toEqual([6, 7, 8]);
    });
    it("η.f.β collects multiple arguments to apply to function once target is provided", () => {
      const m = x => ({ x, f(y, z) { return (this.x + y) * z; } });
      expect([1, 2, 3].map(m).map(η.f.β(5, 3))).toEqual([18, 21, 24]);
    });
    it("using _ in η creates a partial application", () => {
      const m = x => ({ x, f(y) { return this.x + y; } });
      expect([1, 2, 3].map(m).map(η.f(5, _))).toEqual([6, 7, 8]);
    });
    it("using _ in η simply to trigger deferred application", () => {
      const m = x => ({ x, f(y, z) { return (this.x + y) * z; } });
      expect([1, 2, 3].map(m).map(η.f(5, 3, _))).toEqual([18, 21, 24]);
    });
  });
  describe("ι", () => {
    it("ι generates array of numbers from 0 to n", () =>
      expect([0, 1, 5].map(ι)).toEqual([[], [0], [0, 1, 2, 3, 4]]));
  });
  describe("ν", () => {
    it("complements a function", () =>
      expect(ν(x => x >= 0)(-1)).toBe(true));
  });
  describe("Π", () => {
    it("Π multiplies together values in nested arrays", () =>
      expect(Π(3, 4, [2, 7, [9, 5], 1], 8, [6])).toEqual(362880));
  });
  describe("Σ", () => {
    it("Σ adds up values in nested arrays", () =>
      expect(Σ(3, 4, [2, 7, [9, 5], 1], 8, [6])).toEqual(45));
  });
});
