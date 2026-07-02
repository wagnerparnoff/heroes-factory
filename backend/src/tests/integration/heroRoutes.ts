import request from "supertest";
import app from "../../../src/server.ts";
import { prisma } from "../../../src/infrastructure/prisma/client.ts";

const heroPayload = {
  name: "Robert Bruce Banner",
  nickname: "Hulk",
  dateOfBirth: "1962-04-10",
  universe: "Marvel",
  mainPower: "Force",
  avatarUrl: "https://example.com/hulk.jpg",
};

// limpa a tabela antes de cada teste para isolamento
beforeEach(async () => {
  await prisma.hero.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/heroes", () => {
  it("deve criar herói e retornar 201 com shape correto", async () => {
    const res = await request(app).post("/api/heroes").send(heroPayload);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: "Robert Bruce Banner",
      nickname: "Hulk",
      isActive: true,
    });
    expect(res.body.id).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
  });

  it("deve retornar 400 com payload inválido", async () => {
    const res = await request(app).post("/api/heroes").send({ name: "" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Erro de validação");
  });
});

describe("GET /api/heroes", () => {
  it("deve listar heróis paginados", async () => {
    await request(app).post("/api/heroes").send(heroPayload);
    await request(app).post("/api/heroes").send({ ...heroPayload, nickname: "Banner" });

    const res = await request(app).get("/api/heroes?page=1&limit=10");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.total).toBe(2);
  });

  it("deve buscar por name", async () => {
    await request(app).post("/api/heroes").send(heroPayload);
    await request(app).post("/api/heroes").send({ ...heroPayload, name: "Tony Stark", nickname: "Iron Man" });

    const res = await request(app).get("/api/heroes?search=tony");
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0]?.name).toBe("Tony Stark");
  });
});

describe("PUT /api/heroes/:id", () => {
  it("deve atualizar herói ativo", async () => {
    const created = await request(app).post("/api/heroes").send(heroPayload);
    const id = created.body.id;

    const res = await request(app)
      .put(`/api/heroes/${id}`)
      .send({ nickname: "O Incrível Hulk" });

    expect(res.status).toBe(200);
    expect(res.body.nickname).toBe("O Incrível Hulk");
  });

  it("deve retornar 409 ao editar herói desativado", async () => {
    const created = await request(app).post("/api/heroes").send(heroPayload);
    const id = created.body.id;

    await request(app).patch(`/api/heroes/${id}/deactivate`);

    const res = await request(app).put(`/api/heroes/${id}`).send({ nickname: "Novo" });
    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Não é possível editar um herói desativado");
  });
});

describe("PATCH /api/heroes/:id/deactivate e /activate", () => {
  it("deve desativar e reativar herói", async () => {
    const created = await request(app).post("/api/heroes").send(heroPayload);
    const id = created.body.id;

    const deactivated = await request(app).patch(`/api/heroes/${id}/deactivate`);
    expect(deactivated.body.isActive).toBe(false);

    const reactivated = await request(app).patch(`/api/heroes/${id}/activate`);
    expect(reactivated.body.isActive).toBe(true);
  });
});

describe("GET /api/heroes/:id", () => {
  it("deve retornar 404 para id inexistente", async () => {
    const res = await request(app).get("/api/heroes/id-que-nao-existe");
    expect(res.status).toBe(404);
  });
});