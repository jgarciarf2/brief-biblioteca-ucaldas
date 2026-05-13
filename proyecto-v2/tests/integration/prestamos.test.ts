import request from "supertest";
import {
  seedBaseData,
  setupTestApp,
  resetTestStore,
} from "./support/testSetup";
import {
  findPrestamoById,
  updatePrestamo,
} from "../../src/infrastructure/persistence/in-memory/prestamoRepository";
import { toIsoString } from "../../src/shared/utils/dateUtils";

const app = setupTestApp();

beforeEach(() => {
  resetTestStore();
  seedBaseData();
});

describe("POST /prestamos", () => {
  it("crea un prestamo", async () => {
    const response = await request(app)
      .post("/prestamos")
      .send({ estudiante_id: "user-1", ejemplar_id: "ej-1" });

    expect(response.status).toBe(201);
    expect(response.body.usuario_id).toBe("user-1");
  });
});

describe("PATCH /prestamos/:id/renovar", () => {
  it("renueva un prestamo", async () => {
    const creation = await request(app)
      .post("/prestamos")
      .send({ estudiante_id: "user-1", ejemplar_id: "ej-1" });

    const response = await request(app).patch(
      `/prestamos/${creation.body.id}/renovar`,
    );
    expect(response.status).toBe(200);
    expect(response.body.renovaciones).toBe(1);
  });
});

describe("PATCH /prestamos/:id/devolver", () => {
  it("devuelve un prestamo y genera multa si aplica", async () => {
    const creation = await request(app)
      .post("/prestamos")
      .send({ estudiante_id: "user-1", ejemplar_id: "ej-1" });

    const prestamo = findPrestamoById(creation.body.id);
    const fechaPasada = toIsoString(
      new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    );
    if (prestamo) {
      updatePrestamo({ ...prestamo, fecha_devolucion_esperada: fechaPasada });
    }

    const response = await request(app)
      .patch(`/prestamos/${creation.body.id}/devolver`)
      .send({ fecha_devolucion_real: toIsoString(new Date()) });

    expect(response.status).toBe(200);
    expect(response.body.multa).toBeDefined();
  });
});

describe("GET /prestamos/vencidos", () => {
  it("retorna los prestamos vencidos", async () => {
    const creation = await request(app)
      .post("/prestamos")
      .send({ estudiante_id: "user-1", ejemplar_id: "ej-1" });

    const prestamo = findPrestamoById(creation.body.id);
    const fechaPasada = toIsoString(
      new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    );
    if (prestamo) {
      updatePrestamo({ ...prestamo, fecha_devolucion_esperada: fechaPasada });
    }

    const response = await request(app).get("/prestamos/vencidos");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
