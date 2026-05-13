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

describe("GET /libros", () => {
  it("retorna el catalogo", async () => {
    const response = await request(app).get("/libros");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});

describe("GET /libros/:id", () => {
  it("retorna el libro", async () => {
    const response = await request(app).get("/libros/lib-1");
    expect(response.status).toBe(200);
    expect(response.body.id).toBe("lib-1");
  });
});

describe("GET /libros/:id/ejemplares", () => {
  it("retorna los ejemplares", async () => {
    const response = await request(app).get("/libros/lib-1/ejemplares");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
