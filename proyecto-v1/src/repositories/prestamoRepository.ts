import { openDb } from "../db/sqlite";

export type PrestamoRow = {
  id: number;
  libro_id: number;
  estudiante_id: string;
  fecha_prestamo: string;
  fecha_devolucion: string | null;
  estado: "vigente" | "devuelto";
};

export const listPrestamosVigentes = async (): Promise<PrestamoRow[]> => {
  const db = await openDb();
  return db.all<PrestamoRow>(
    "SELECT id, libro_id, estudiante_id, fecha_prestamo, fecha_devolucion, estado FROM prestamos WHERE estado = 'vigente' ORDER BY id",
  );
};

export const findPrestamoById = async (
  id: number,
): Promise<PrestamoRow | null> => {
  const db = await openDb();
  const prestamo = await db.get<PrestamoRow>(
    "SELECT id, libro_id, estudiante_id, fecha_prestamo, fecha_devolucion, estado FROM prestamos WHERE id = ?",
    [id],
  );

  return prestamo ?? null;
};

export const createPrestamo = async (
  data: Omit<PrestamoRow, "id" | "fecha_devolucion" | "estado"> & {
    fecha_devolucion?: string | null;
    estado?: PrestamoRow["estado"];
  },
): Promise<PrestamoRow> => {
  const db = await openDb();
  const estado = data.estado ?? "vigente";
  const fechaDevolucion = data.fecha_devolucion ?? null;

  const result = await db.run(
    [
      "INSERT INTO prestamos (libro_id, estudiante_id, fecha_prestamo, fecha_devolucion, estado)",
      "VALUES (?, ?, ?, ?, ?)",
    ].join(" "),
    [
      data.libro_id,
      data.estudiante_id,
      data.fecha_prestamo,
      fechaDevolucion,
      estado,
    ],
  );

  const prestamo = await findPrestamoById(result.lastID as number);
  if (!prestamo) {
    throw new Error("prestamo_no_creado");
  }

  return prestamo;
};

export const updatePrestamo = async (
  id: number,
  updates: Partial<Pick<PrestamoRow, "fecha_devolucion" | "estado">>,
): Promise<PrestamoRow> => {
  const db = await openDb();
  await db.run(
    "UPDATE prestamos SET fecha_devolucion = ?, estado = ? WHERE id = ?",
    [updates.fecha_devolucion ?? null, updates.estado ?? "vigente", id],
  );

  const prestamo = await findPrestamoById(id);
  if (!prestamo) {
    throw new Error("prestamo_no_encontrado");
  }

  return prestamo;
};
