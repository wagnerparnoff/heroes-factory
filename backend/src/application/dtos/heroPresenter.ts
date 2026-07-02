import type { Hero } from "../../domain/entities/Hero.ts";

export function toHeroResponse(hero: Hero) {
    return {
        id: hero.id,
        name: hero.name,
        nickname: hero.nickname,
        dateOfBirth: hero.dateOfBirth,
        universe: hero.universe,
        mainPower: hero.mainPower,
        avatarUrl: hero.avatarUrl,
        isActive: hero.isActive,
        createdAt: hero.createdAt,
        updatedAt: hero.updatedAt,
    }
}