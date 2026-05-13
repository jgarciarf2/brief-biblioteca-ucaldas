const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const toIsoString = (date: Date) => date.toISOString();

export const addDays = (isoDate: string, days: number) => {
  const base = new Date(isoDate);
  return new Date(base.getTime() + days * MS_PER_DAY).toISOString();
};

export const isValidIsoDate = (value: string) =>
  !Number.isNaN(Date.parse(value));

export const daysLate = (expectedIso: string, realIso: string) => {
  const diff = Date.parse(realIso) - Date.parse(expectedIso);
  const lateDays = Math.floor(diff / MS_PER_DAY);
  return lateDays > 0 ? lateDays : 0;
};

export const isOverdue = (expectedIso: string, nowIso: string) =>
  Date.parse(expectedIso) < Date.parse(nowIso);
