const $ = require("../delambda");

describe("delambda", () => {
  it("single property accessor", () => {
    const p = x => ({ p: x });
    const xs = [1, 2, 3];
    expect(xs.map(p).map($.p)).toEqual(xs);
  });
  it("nested property accessor", () => {
    const pq = x => ({ p: { q: x } });
    const xs = [1, 2, 3];
    expect(xs.map(pq).map($.p.q)).toEqual(xs);
  });
  it("double-nested property accessor", () => {
    const pqr = x => ({ p: { q: { r: x } } });
    const xs = [1, 2, 3];
    expect(xs.map(pqr).map($.p.q.r)).toEqual(xs);
  });
});
