import { addDays, daysLate, isOverdue } from "../../src/shared/utils/dateUtils";

describe("dateUtils", () => {
  it("calcula dias de mora", () => {
    const expected = new Date("2026-05-01T00:00:00.000Z").toISOString();
    const real = new Date("2026-05-03T00:00:00.000Z").toISOString();
    expect(daysLate(expected, real)).toBe(2);
  });

  it("detecta vencimiento", () => {
    const expected = new Date("2026-05-01T00:00:00.000Z").toISOString();
    const now = new Date("2026-05-02T00:00:00.000Z").toISOString();
    expect(isOverdue(expected, now)).toBe(true);
  });

  it("suma dias", () => {
    const base = new Date("2026-05-01T00:00:00.000Z").toISOString();
    const result = addDays(base, 3);
    expect(new Date(result).toISOString()).toBe(
      new Date("2026-05-04T00:00:00.000Z").toISOString(),
    );
  });
});
