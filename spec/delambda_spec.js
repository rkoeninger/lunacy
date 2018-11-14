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
});
