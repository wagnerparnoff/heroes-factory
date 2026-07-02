import { AppError } from "../../shared/errors/AppError.ts";
import type { IHeroRepository, CreateHeroInput, UpdateHeroInput, ListHeroesFilters } from "../../domain/repositories/IHeroRepository.js";

export class HeroService {
    constructor(private repository: IHeroRepository) {}

    create(data: CreateHeroInput) {
        return this.repository.create(data);
    }

    async update(id: string, data: UpdateHeroInput) {
        const hero = await this.repository.findById(id);
        if(!hero) throw new AppError(404, "Herói nao encontrado");
        if(!hero.isActive) throw new AppError(400, "Herói é possível editar um herói desativado");
        return this.repository.update(id, data);
    }

    async setActive(id: string, isActive: boolean) {
        const hero = await this.repository.findById(id);
        if(!hero) throw new AppError(404, "Herói nao encontrado");
        return this.repository.setActive(id, isActive);
    }

    async findById(id: string) {
        const hero = await this.repository.findById(id);
        if(!hero) throw new AppError(404, "Herói nao encontrado");
        return hero;
    }

    list(page=1, limit=10, search?: string) {
        const filters: ListHeroesFilters = { page, limit };
        if (search !== undefined) {
            filters.search = search;
        }
        return this.repository.findAll(filters);
    }
}