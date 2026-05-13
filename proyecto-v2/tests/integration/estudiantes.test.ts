import request from "supertest";
import {
  seedBaseData,
  setupTestApp,
  resetTestStore,
} from "./support/testSetup";

const app = setupTestApp();

beforeEach(() => {
  resetTestStore();
  seedBaseData();
});

describe("GET /estudiantes/:id/prestamos-activos", () => {
  it("lista prestamos activos", async () => {
    await request(app)
      .post("/prestamos")
      .send({ estudiante_id: "user-1", ejemplar_id: "ej-1" });

    const response = await request(app).get(
      "/estudiantes/user-1/prestamos-activos",
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});

describe("GET /estudiantes/:id/historial-prestamos", () => {
  it("lista historial", async () => {
    await request(app)
      .post("/prestamos")
      .send({ estudiante_id: "user-1", ejemplar_id: "ej-1" });

    const response = await request(app).get(
      "/estudiantes/user-1/historial-prestamos",
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});

describe("GET /estudiantes/:id/multas", () => {
  it("retorna multas", async () => {
    const creation = await request(app)
      .post("/prestamos")
      .send({ estudiante_id: "user-1", ejemplar_id: "ej-1" });

    await request(app)
      .patch(`/prestamos/${creation.body.id}/devolver`)
      .send({ fecha_devolucion_real: new Date().toISOString() });

    const response = await request(app).get("/estudiantes/user-1/multas");
    expect(response.status).toBe(200);
  });
});
