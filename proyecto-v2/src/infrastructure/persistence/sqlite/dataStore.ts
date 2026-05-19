import { db, get, run } from "./db";

// Table to store counters for custom IDs
async function initializeCounters() {
  await run(`CREATE TABLE IF NOT EXISTS counters (
    key TEXT PRIMARY KEY,
    value INTEGER NOT NULL
  )`);

  const keys = ["prestamo", "multa", "solicitud"];
  for (const key of keys) {
    const row = await get<{ value: number }>(
      "SELECT value FROM counters WHERE key = ?",
      [key],
    );
    if (!row) {
      await run("INSERT INTO counters (key, value) VALUES (?, ?)", [key, 1]);
    }
  }
}

initializeCounters().catch(console.error);

export const nextId = async (key: string): Promise<string> => {
  const row = await get<{ value: number }>(
    "SELECT value FROM counters WHERE key = ?",
    [key],
  );
  const current = row ? row.value : 1;
  const next = current + 1;
  await run("UPDATE counters SET value = ? WHERE key = ?", [next, key]);
  return String(current);
};
