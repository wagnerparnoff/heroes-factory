import { useQuery } from "@tanstack/react-query";
import { heroApi } from "../api/heroApi";

export function useHeroes(page: number, search: string) {
  return useQuery({
    queryKey: ["heroes", page, search],
    queryFn: () => heroApi.list({ page, limit: 10, search: search || undefined }),
    placeholderData: (prev) => prev,
  });
}