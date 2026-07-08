import type { Hero } from '../entities/Hero.ts';

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export interface ListHeroesFilters {
    page: number;
    limit: number;
    search?: string;
}

export type CreateHeroInput = Omit<Hero, "id" | "isActive" | "createdAt" | "updatedAt">;
export type UpdateHeroInput = Partial<CreateHeroInput>;

export interface IHeroRepository {
    create(data: CreateHeroInput): Promise<Hero>;
    findById(id: string): Promise<Hero | null>;
    findAll(filters: ListHeroesFilters): Promise<PaginatedResult<Hero>>;
    update(id: string, data: UpdateHeroInput): Promise<Hero>;
    setActive(id: string, isActive: boolean): Promise<Hero>;
    delete(id: string): Promise<void>;
}