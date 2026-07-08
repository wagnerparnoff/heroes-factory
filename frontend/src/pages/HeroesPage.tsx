import { useState } from "react";
import {
  Container, Title, Button, SimpleGrid, Skeleton,
  Alert, Pagination, Center, Stack,
} from "@mantine/core";
import { IconPlus, IconAlertCircle } from "@tabler/icons-react";
import { useHeroes } from "../hooks/useHeroes";
import { HeroCard } from "../components/HeroCard";

import { useDebouncedValue } from "@mantine/hooks";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { useDisclosure } from "@mantine/hooks";
import { HeroFormModal } from "../components/HeroFormModal";
import { HeroDetailModal } from "../components/HeroDetailModal";
import type { Hero } from "../types/Hero";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { ConfirmModal } from "../components/ConfirmModal";
import { heroApi} from "../api/heroApi";

export function HeroesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const { data, isLoading, isError, error } = useHeroes(page, debouncedSearch);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [editHero, setEditHero] = useState<Hero | null>(null);
  //para os modais de confirmacao
  const [deactivateTarget, setDeactivateTarget] = useState<Hero | null>(null);
  const [activateTarget, setActivateTarget]     = useState<Hero | null>(null);
  const [deleteTarget, setDeleteTarget]         = useState<Hero | null>(null);

  const queryClient = useQueryClient();

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      heroApi.setActive(id, active),
    onSuccess: (_, { active }) => {
      queryClient.invalidateQueries({ queryKey: ["heroes"] });
      notifications.show({
        color: active ? "green" : "orange",
        message: active ? "Herói ativado!" : "Herói desativado!",
      });
      setDeactivateTarget(null);
      setActivateTarget(null);
    },
    onError: (error: Error) => {
      notifications.show({ color: "red", title: "Erro", message: error.message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => heroApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroes"] });
      notifications.show({
        color: "green",
        message: "Herói excluído da base!",
      });
      setDeleteTarget(null);
    },
    onError: (error: Error) => {
      notifications.show({ color: "red", title: "Erro ao excluir", message: error.message });
    },
  });

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  //aqui reseto para pagina1 depois de pesquisa
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <Container size="xl" py="xl">
      <HeroFormModal
        opened={createOpened || !!editHero}
        onClose={() => {
          closeCreate();
          setEditHero(null);
        }}
        hero={editHero ?? undefined}
      />
      <HeroDetailModal hero={selectedHero} onClose={() => setSelectedHero(null)} />
      <ConfirmModal
        opened={!!deactivateTarget}
        title="Inativar herói"
        message={`Deseja inativar ${deactivateTarget?.nickname}?`}
        confirmLabel="Inativar"
        confirmColor="orange"
        loading={toggleActiveMutation.isPending}
        onConfirm={() => toggleActiveMutation.mutate({ id: deactivateTarget!.id, active: false })}
        onClose={() => setDeactivateTarget(null)}
      />
      <ConfirmModal
        opened={!!activateTarget}
        title="Ativar herói"
        message={`Deseja reativar ${activateTarget?.nickname}?`}
        confirmLabel="Ativar"
        confirmColor="green"
        loading={toggleActiveMutation.isPending}
        onConfirm={() => toggleActiveMutation.mutate({ id: activateTarget!.id, active: true })}
        onClose={() => setActivateTarget(null)}
      />
      <ConfirmModal
        opened={!!deleteTarget}
        title="Excluir herói"
        message={`Tem certeza que deseja excluir DEFINITIVAMENTE ${deleteTarget?.nickname} da base? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        confirmColor="red"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate(deleteTarget!.id)}
        onClose={() => setDeleteTarget(null)}
      />
      <Stack gap="lg">
        <Title order={1}>Hero Factory</Title>

        <Button leftSection={<IconPlus size={16} />} w="fit-content" onClick={openCreate}>
          Novo Herói
        </Button>

        <TextInput
          placeholder="Buscar por nome ou codinome..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />

        {isLoading && (
          <SimpleGrid cols={5} spacing="md">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} height={260} radius="md" />
            ))}
          </SimpleGrid>
        )}

        {isError && (
          <Alert color="red" icon={<IconAlertCircle />} title="Erro ao carregar heróis">
            {error?.message}
          </Alert>
        )}

        {data && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="md">
            {data.data.map((hero) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                onClick={() => setSelectedHero(hero)}
                onEdit={() => setEditHero(hero)}
                onDeactivate={() => setDeactivateTarget(hero)}
                onActivate={() => setActivateTarget(hero)}
                onDelete={() => setDeleteTarget(hero)}
              />
            ))}
          </SimpleGrid>
        )}

        {totalPages > 1 && (
          <Center>
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Center>
        )}
      </Stack>
    </Container>
  );
}