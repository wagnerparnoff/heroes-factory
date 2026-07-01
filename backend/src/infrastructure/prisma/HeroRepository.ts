import { prisma } from './client.ts';
import type { IHeroRepository, ListHeroesFilters, CreateHeroInput, UpdateHeroInput  } from '../../domain/repositories/IHeroRepository.js';
import type { Hero } from '../../domain/entities/Hero.js';

export class HeroRepository implements IHeroRepository {
    async create(data: CreateHeroInput): Promise<Hero> {
        return prisma.hero.create({ data });
    }

    async findById(id: string): Promise<Hero | null> {
        return prisma.hero.findUnique({ where: { id } });
    }

    async findAll({ page, limit, search }: ListHeroesFilters) {
        const where = search
        ? {
            OR: [
                { name: { contains: search } },
                { nickname: { contains: search } },
            ],
            }
        : {};

        const [data, total] = await Promise.all([
        prisma.hero.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.hero.count({ where }),
        ]);

        return { data, total, page, limit };
    }

    async update(id: string, data: UpdateHeroInput) {
        return prisma.hero.update({ where: { id }, data });
    }

    async setActive(id: string, isActive: boolean) {
        return prisma.hero.update({ where: { id }, data: { isActive } });
    }
    
}