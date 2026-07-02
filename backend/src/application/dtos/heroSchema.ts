import { z } from 'zod';

export const createHeroSchema = z.object({
    name: z.string().min(1),
    nickname: z.string().min(1),
    dateOfBirth: z.coerce.date(),
    universe: z.string().min(1),
    mainPower: z.string().min(1),
    avatarUrl: z.string().url(),
})

export const updateHeroSchema = createHeroSchema.partial();

export const listHeroesSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
})