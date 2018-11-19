const { _, ċ, β, Δ, η, ι, ñ, ξ, ρ, Γ, Π, Σ, ℮, ℝ, ℤ, ℕ, 𝔸, 𝔽, 𝕊, ಠ_ಠ, ǃ } = require("../lunacy");

describe("lunacy", () => {
  describe("ċ", () => {
    it("composes a series of functions, applying innermost first", () =>
      expect(ċ(x => x + 3, x => x * 2, x => x + 1)(4)).toEqual(13));
    it("returns identity function when given 0 args", () =>
      expect(ċ()("abc")).toEqual("abc"));
  });
  describe("β", () => {
    it("applies a function", () => {
      const m = x => () => x * 2;
      expect([1, 2, 3].map(m).map(β)).toEqual([2, 4, 6]);
    });
    it("using _ in β creates a partial application", () => {
      const m = x => y => x * 2 + 1;
      expect([1, 2, 3].map(m).map(β(_, 1))).toEqual([3, 5, 7]);
    });
    it("raises an error when given 0 args", () =>
      expect(β).toThrow());
  });
  describe("Δ", () => {
    it("Δ of two numbers returns difference between them", () =>
      expect(Δ(14, -27)).toEqual(41));
    it("Δ of a number returns the absolute value of that number", () =>
      expect(Δ(-27)).toEqual(27));
    it("Δ of two strings returns the levenshtein distance between them", () =>
      expect(Δ("qwerty", "azerty")).toEqual(2));
    it("Δ of a string returns the length of that string", () =>
      expect(Δ("qwerty")).toEqual(6));
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
    it("η.f.ñ composes a logical inversion on function call", () => {
      const m = x => ({ x, f(y) { return this.x > y; } });
      expect([1, 2, 3, 4].map(m).map(η.f.ñ.β(2))).toEqual([true, true, false, false]);
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
  describe("ñ", () => {
    it("complements a function", () =>
      expect(ñ(x => x >= 0)(-1)).toBe(true));
  });
  describe("ρ", () => {
    it("renames properties", () =>
      expect(ρ({ a: "b" }, { a: 1 })).toEqual({ b: 1 }));
  });
  describe("Π", () => {
    it("Π multiplies together values in nested arrays", () =>
      expect(Π(3, 4, [2, 7, [9, 5], 1], 8, [6])).toEqual(362880));
  });
  describe("Σ", () => {
    it("Σ adds up values in nested arrays", () =>
      expect(Σ(3, 4, [2, 7, [9, 5], 1], 8, [6])).toEqual(45));
  });
  describe("℮", () => {
    it("rounds numbers to nearest integer", () =>
      expect(℮(14.65)).toEqual(15));
    it("rounds number to nearest multiple", () =>
      expect(℮(14.65, 2)).toEqual(14));
    it("rounds number to nearest fractional multiple", () =>
      expect(℮(14.65, 0.25)).toEqual(14.75));
  });
  describe("ℝ", () => {
    it("identifies real numbers", () => {
      expect(ℝ(2392684.4756738)).toBe(true);
      expect(ℝ(-0.23926844756738)).toBe(true);
      expect(ℝ(2392684e+34)).toBe(true);
      expect(ℝ(NaN)).toBe(false);
      expect(ℝ(Infinity)).toBe(false);
      expect(ℝ(-Infinity)).toBe(false);
      expect(ℝ("")).toBe(false);
      expect(ℝ({})).toBe(false);
      expect(ℝ(x => x)).toBe(false);
    });
  });
  describe("ℤ", () => {
    it("identifies integers", () => {
      expect(ℤ(2392)).toBe(true);
      expect(ℤ(-56738)).toBe(true);
      expect(ℤ(2392684e+34)).toBe(true);
      expect(ℤ(2392684.4756738)).toBe(false);
      expect(ℤ(-0.23926844756738)).toBe(false);
    });
  });
  describe("ℕ", () => {
    it("identifies natural numbers (non-negative integers)", () => {
      expect(ℕ(2392)).toBe(true);
      expect(ℕ(-56738)).toBe(false);
      expect(ℕ(2392684e+34)).toBe(true);
    });
  });
  describe("𝔸", () => {
    it("identifies arrays", () => {
      expect(𝔸([])).toBe(true);
      expect(𝔸([0].map(x => x + 1))).toBe(true);
      expect(𝔸({})).toBe(false);
    });
  });
  describe("𝔽", () => {
    it("identifies functions", () => {
      expect(𝔽(-135.47)).toBe(false);
      expect(𝔽(function () {})).toBe(true);
      expect(𝔽("qwerty")).toBe(false);
      expect(𝔽(Math.abs)).toBe(true);
      expect(𝔽({})).toBe(false);
      expect(𝔽(x => x)).toBe(true);
    });
  });
  describe("𝕊", () => {
    it("identifies arrays", () => {
      expect(𝕊("")).toBe(true);
      expect(𝕊("asdf")).toBe(true);
      expect(𝕊([])).toBe(false);
      expect(𝕊({})).toBe(false);
    });
  });
  describe("ಠ_ಠ", () => {
    it("identifies undefined", () => {
      expect(ಠ_ಠ({})).toBe(false);
      expect(ಠ_ಠ(0)).toBe(false);
      expect(ಠ_ಠ(describe.zzz)).toBe(true);
      expect(ಠ_ಠ(undefined)).toBe(true);
      expect(ಠ_ಠ(null)).toBe(false);
    });
  });
  describe("ǃ", () => {
    it("throws Error", () =>
      expect(β(ǃ, "fail", _)).toThrow());
  });
});
