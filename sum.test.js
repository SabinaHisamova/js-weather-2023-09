import { sum } from "./sum";

describe("sum function", () => {
  it("sum is a function", () => {
    expect(sum).toBeInstanceOf(Function);
  });

  it("sum of (5,10)", () => {
    expect(sum(5, 10)).toBe(15);
  });
});
