import { randomUUID } from "crypto";
import type {
  IHeroRepository,
  CreateHeroInput,
  UpdateHeroInput,
  ListHeroesFilters,
  PaginatedResult,
} from "../../domain/repositories/IHeroRepository.ts";
import type { Hero } from "../../domain/entities/Hero.ts";

export class FakeHeroRepository implements IHeroRepository {
  private heroes: Hero[] = [];

  async create(data: CreateHeroInput): Promise<Hero> {
    const hero: Hero = {
      id: randomUUID(),
      isActive: true,
      createdAt: new Date(Date.now() + this.heroes.length * 1000),
      updatedAt: new Date(Date.now() + this.heroes.length * 1000),
      ...data,
    };
    this.heroes.push(hero);
    return hero;
  }

  async findById(id: string): Promise<Hero | null> {
    return this.heroes.find((h) => h.id === id) ?? null;
  }

  async findAll({ page, limit, search }: ListHeroesFilters): Promise<PaginatedResult<Hero>> {
    let data = [...this.heroes];
    if (search) {
      const term = search.toLowerCase();
      data = data.filter(
        (h) =>
          h.name.toLowerCase().includes(term) ||
          h.nickname.toLowerCase().includes(term)
      );
    }
    const total = data.length;
    const paginated = data
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * limit, page * limit);
    return { data: paginated, total, page, limit };
  }

  async update(id: string, data: UpdateHeroInput): Promise<Hero> {
    const index = this.heroes.findIndex((h) => h.id === id);
    if (index === -1) throw new Error("Hero not found");
    const existing = this.heroes[index];
    if (!existing) throw new Error("Hero not found");
    
    this.heroes[index] = { ...existing, ...data, updatedAt: new Date() };
    return this.heroes[index]!;
  }

  async setActive(id: string, isActive: boolean): Promise<Hero> {
    const index = this.heroes.findIndex((h) => h.id === id);
    if (index === -1) throw new Error("Hero not found");
    const existing = this.heroes[index];
    if (!existing) throw new Error("Hero not found");
    
    this.heroes[index] = { ...existing, isActive, updatedAt: new Date() };
    return this.heroes[index]!;
  }

  // reset entre testes
  clear() {
    this.heroes = [];
  }
}