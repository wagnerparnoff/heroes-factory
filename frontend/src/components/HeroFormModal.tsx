import { Modal, TextInput, Button, Stack, Group } from "@mantine/core";
import { useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { heroApi } from "../api/heroApi";
import { heroFormSchema } from "../schemas/heroSchemas";
import type { HeroFormValues } from "../schemas/heroSchemas";
import type { Hero } from "../types/Hero";

interface HeroFormModalProps {
  opened: boolean;
  onClose: () => void;
  hero?: Hero;        // quando preenchido, modo edição
}

export function HeroFormModal({ opened, onClose, hero }: HeroFormModalProps) {
  const queryClient = useQueryClient();
  const isEditing = !!hero;

  const form = useForm<HeroFormValues>({
    validate: zodResolver(heroFormSchema),
    initialValues: {
      name:        "",
      nickname:    "",
      dateOfBirth: new Date(),
      universe:    "",
      mainPower:   "",
      avatarUrl:   "",
    },
  });

  useEffect(() => {
    if (opened) {
      if (hero) {
        form.setValues({
          name:        hero.name,
          nickname:    hero.nickname,
          dateOfBirth: new Date(hero.dateOfBirth),
          universe:    hero.universe,
          mainPower:   hero.mainPower,
          avatarUrl:   hero.avatarUrl ?? "",
        });
      } else {
        form.reset();
      }
    }
  }, [opened, hero]);

  const mutation = useMutation({
    mutationFn: (values: HeroFormValues) => {
      const payload = {
        name:        values.name,
        nickname:    values.nickname,
        dateOfBirth: values.dateOfBirth.toISOString().split("T")[0],
        universe:    values.universe,
        mainPower:   values.mainPower,
        avatarUrl:   values.avatarUrl,
      };
      return isEditing
        ? heroApi.update(hero!.id, payload)
        : heroApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroes"] });
      notifications.show({
        color: "green",
        title: "Sucesso",
        message: isEditing ? "Herói atualizado!" : "Herói criado!",
      });
      form.reset();
      onClose();
    },
    onError: (error: Error) => {
      notifications.show({
        color: "red",
        title: "Erro",
        message: error.message,
      });
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? "Editar Herói" : "Novo Herói"}
      size="md"
    >
      <form onSubmit={form.onSubmit((v) => mutation.mutate(v))}>
        <Stack gap="sm">
          <TextInput label="Nome completo"  placeholder="Bruce Banner"  {...form.getInputProps("name")} />
          <TextInput label="Nome de guerra" placeholder="Hulk"          {...form.getInputProps("nickname")} />
          <DateInput label="Data de nascimento" placeholder="10/04/1962" valueFormat="DD/MM/YYYY" {...form.getInputProps("dateOfBirth")} />
          <TextInput label="Universo"       placeholder="Marvel"        {...form.getInputProps("universe")} />
          <TextInput label="Habilidade"     placeholder="Força"         {...form.getInputProps("mainPower")} />
          <TextInput label="Avatar (URL)"   placeholder="https://..."   {...form.getInputProps("avatarUrl")} />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose} disabled={mutation.isPending}>
              Cancelar
            </Button>
            <Button type="submit" loading={mutation.isPending}>
              {isEditing ? "Salvar" : "Criar"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}