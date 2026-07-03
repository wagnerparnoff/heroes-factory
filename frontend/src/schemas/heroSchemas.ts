import { z } from "zod";

export const heroFormSchema = z.object({
  name:        z.string().min(1, "Nome obrigatório"),
  nickname:    z.string().min(1, "Codinome obrigatório"),
  dateOfBirth: z.date({ message: "Data obrigatória" }),
  universe:    z.string().min(1, "Universo obrigatório"),
  mainPower:   z.string().min(1, "Habilidade obrigatória"),
  avatarUrl:   z.url("URL inválida"),
});

export type HeroFormValues = z.infer<typeof heroFormSchema>;