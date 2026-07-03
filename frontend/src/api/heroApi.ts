import { httpClient } from "./httpClient";
import type { Hero, PaginatedHeroes } from "../types/Hero";

export interface ListHeroesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const heroApi = {
  list: async (params: ListHeroesParams = {}): Promise<PaginatedHeroes> => {
    const { data } = await httpClient.get("/heroes", { params });
    return data;
  },

  getById: async (id: string): Promise<Hero> => {
    const { data } = await httpClient.get(`/heroes/${id}`);
    return data;
  },

  create: async (payload: Omit<Hero, "id" | "is_active" | "created_at" | "updated_at">): Promise<Hero> => {
    const { data } = await httpClient.post("/heroes", payload);
    return data;
  },

  update: async (id: string, payload: Partial<Hero>): Promise<Hero> => {
    const { data } = await httpClient.put(`/heroes/${id}`, payload);
    return data;
  },

  setActive: async (id: string, isActive: boolean): Promise<Hero> => {
    const endpoint = isActive ? "activate" : "deactivate";
    const { data } = await httpClient.patch(`/heroes/${id}/${endpoint}`);
    return data;
  },
};