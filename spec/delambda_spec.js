const $ = require("../delambda");

describe("delambda", () => {
  it("single property accessor", () => {
    const xs = [{ p: 1 }, { p: 2 }, { p: 3 }];
    expect(xs.map($.p)).toEqual([1, 2, 3]);
  });
  it("nested property accessor", () => {
    const xs = [{ p: { q: 1 } }, { p: { q: 2 } }, { p: { q: 3 } }];
    expect(xs.map($.p.q)).toEqual([1, 2, 3]);
  });
});
