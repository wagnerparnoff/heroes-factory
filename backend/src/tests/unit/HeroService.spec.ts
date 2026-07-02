import { HeroService } from "../../application/services/HeroService.ts";
import { FakeHeroRepository } from "../fakes/FakeHeroRepository.ts";
import { AppError } from "../../shared/errors/AppError.ts";

const makeHeroData = (overrides = {}) => ({
  name: "Bruce Banner",
  nickname: "Hulk",
  dateOfBirth: new Date("1962-04-10"),
  universe: "Marvel",
  mainPower: "Force",
  avatarUrl: "https://example.com/hulk.jpg",
  ...overrides,
});

describe("HeroService", () => {
  let repository: FakeHeroRepository;
  let service: HeroService;

  beforeEach(() => {
    repository = new FakeHeroRepository();
    service = new HeroService(repository);
  });

  describe("create", () => {
    it("deve criar um herói com is_active true por padrão", async () => {
      const hero = await service.create(makeHeroData());
      expect(hero.isActive).toBe(true);
      expect(hero.id).toBeDefined();
    });
  });

  describe("findById", () => {
    it("deve lançar 404 quando herói não existe", async () => {
      await expect(service.findById("id-inexistente")).rejects.toBeInstanceOf(AppError);
      await expect(service.findById("id-inexistente")).rejects.toMatchObject({
        statusCode: 404,
      });
    });

    it("deve retornar o herói quando existe", async () => {
      const created = await service.create(makeHeroData());
      const found = await service.findById(created.id);
      expect(found.id).toBe(created.id);
    });
  });

  describe("update", () => {
    it("deve atualizar campos de um herói ativo", async () => {
      const hero = await service.create(makeHeroData());
      const updated = await service.update(hero.id, { nickname: "O Incrível Hulk" });
      expect(updated.nickname).toBe("O Incrível Hulk");
    });

    it("deve lançar 409 ao tentar editar herói desativado", async () => {
      const hero = await service.create(makeHeroData());
      await service.setActive(hero.id, false);

      await expect(service.update(hero.id, { nickname: "Novo" })).rejects.toMatchObject({
        statusCode: 409,
        message: "Não é possível editar um herói desativado",
      });
    });

    it("deve lançar 404 ao tentar editar herói inexistente", async () => {
      await expect(service.update("inexistente", { nickname: "X" })).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  describe("setActive", () => {
    it("deve desativar um herói ativo", async () => {
      const hero = await service.create(makeHeroData());
      const deactivated = await service.setActive(hero.id, false);
      expect(deactivated.isActive).toBe(false);
    });

    it("deve reativar um herói desativado", async () => {
      const hero = await service.create(makeHeroData());
      await service.setActive(hero.id, false);
      const reactivated = await service.setActive(hero.id, true);
      expect(reactivated.isActive).toBe(true);
    });

    it("deve lançar 404 ao tentar (des)ativar herói inexistente", async () => {
      await expect(service.setActive("inexistente", false)).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  describe("list", () => {
    it("deve retornar heróis paginados ordenados por createdAt desc", async () => {
      await service.create(makeHeroData({ name: "Spider-Man", nickname: "Aranha" }));
      await service.create(makeHeroData({ name: "Iron Man", nickname: "Homem de Ferro" }));

      const result = await service.list(1, 10);
      expect(result.data).toHaveLength(2);
      // último criado deve vir primeiro
      expect(result.data[0]?.name).toBe("Iron Man");
    });

    it("deve filtrar por name", async () => {
      await service.create(makeHeroData({ name: "Thor Odinson", nickname: "Thor" }));
      await service.create(makeHeroData({ name: "Tony Stark", nickname: "Iron Man" }));

      const result = await service.list(1, 10, "thor");
      expect(result.data).toHaveLength(1);
      expect(result.data[0]?.name).toBe("Thor Odinson");
    });

    it("deve filtrar por nickname", async () => {
      await service.create(makeHeroData({ name: "Thor Odinson", nickname: "Thor" }));
      await service.create(makeHeroData({ name: "Tony Stark", nickname: "Iron Man" }));

      const result = await service.list(1, 10, "iron");
      expect(result.data).toHaveLength(1);
      expect(result.data[0]?.nickname).toBe("Iron Man");
    });
  });
});