import { executeCreatePrestamo } from "../../src/use-cases/prestamos/createPrestamo";
import { Prestamo } from "../../src/domain/entities/Prestamo";
import { AppError } from "../../src/shared/errors/AppError";
import {
  resetStore,
  seedStore,
} from "../../src/infrastructure/persistence/in-memory/dataStore";
import { toIsoString } from "../../src/shared/utils/dateUtils";

const baseNow = toIsoString(new Date());
const futureDate = toIsoString(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

const buildPrestamo = (id: string, ejemplarId: string): Prestamo => ({
  id,
  usuario_id: "user-1",
  ejemplar_id: ejemplarId,
  fecha_prestamo: baseNow,
  fecha_devolucion_esperada: futureDate,
  fecha_devolucion_real: null,
  estado: "activo",
  renovaciones: 0,
});

describe("CrearPrestamo", () => {
  beforeEach(() => {
    resetStore();
  });

  it("RN1 - posgrado falla al intentar el sexto prestamo", () => {
    const vigentes: Prestamo[] = Array.from({ length: 5 }, (_, i) =>
      buildPrestamo(String(i + 1), `ej-${i + 1}`),
    );

    seedStore({
      usuarios: [
        {
          id: "user-1",
          codigo_estudiante: "STU-001",
          nombre: "Estudiante Uno",
          rol: "estudiante_posgrado",
          estado: "activo",
        },
      ],
      libros: [
        {
          id: "lib-1",
          codigo_inventario: "INV-001",
          titulo: "Libro Uno",
          autor: "Autor Uno",
          sala: "A",
          tipo_prestamo: "normal",
          activo: true,
        },
      ],
      ejemplares: [
        { id: "ej-1", libro_id: "lib-1", estado: "prestado" },
        { id: "ej-2", libro_id: "lib-1", estado: "prestado" },
        { id: "ej-3", libro_id: "lib-1", estado: "prestado" },
        { id: "ej-4", libro_id: "lib-1", estado: "prestado" },
        { id: "ej-5", libro_id: "lib-1", estado: "prestado" },
        { id: "ej-6", libro_id: "lib-1", estado: "disponible" },
      ],
      prestamos: vigentes,
      multas: [],
      solicitudesEspera: [],
    });

    try {
      executeCreatePrestamo({ estudiante_id: "user-1", ejemplar_id: "ej-6" });
      throw new Error("Expected AppError to be thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      if (error instanceof AppError) {
        expect(error.message).toBe("limite_prestamos_alcanzado");
        expect(error.statusCode).toBe(409);
        expect(error.details).toEqual({ limite: 5, actuales: 5 });
      }
    }
  });
});
