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

describe("POST /solicitudes-espera", () => {
  it("crea una solicitud", async () => {
    const response = await request(app)
      .post("/solicitudes-espera")
      .send({ estudiante_id: "user-1", libro_id: "lib-1" });

    expect(response.status).toBe(201);
    expect(response.body.estado).toBe("activa");
  });
});
