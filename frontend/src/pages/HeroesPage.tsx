import { useState } from "react";
import {
  Container, Title, Button, SimpleGrid, Skeleton,
  Alert, Pagination, Center, Stack,
} from "@mantine/core";
import { IconPlus, IconAlertCircle } from "@tabler/icons-react";
import { useHeroes } from "../hooks/useHeroes";
import { HeroCard } from "../components/HeroCard";

export function HeroesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useHeroes(page, "");

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Title order={1}>Hero Factory</Title>

        <Button leftSection={<IconPlus size={16} />} w="fit-content">
          Novo Herói
        </Button>

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
                onClick={() => console.log("abrir detalhe", hero.id)}
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