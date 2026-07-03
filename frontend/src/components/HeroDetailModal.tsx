import { Modal, Image, Text, Badge, Stack, Group, Divider } from "@mantine/core";
import type { Hero } from "../types/Hero";

interface HeroDetailModalProps {
  hero: Hero | null;
  onClose: () => void;
}

export function HeroDetailModal({ hero, onClose }: HeroDetailModalProps) {
  if (!hero) return null;

  return (
    <Modal opened={!!hero} onClose={onClose} title={hero.nickname} size="sm">
      <Stack gap="md">
        <Image
          src={hero.avatarUrl}
          height={200}
          radius="md"
          alt={hero.name}
          fallbackSrc="https://placehold.co/300x200?text=Hero"
        />
        <Divider />
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Nome completo</Text>
          <Text size="sm" fw={500}>{hero.name}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Universo</Text>
          <Text size="sm" fw={500}>{hero.universe}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Habilidade</Text>
          <Text size="sm" fw={500}>{hero.mainPower}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Data de nascimento</Text>
          <Text size="sm" fw={500}>
            {new Date(hero.dateOfBirth).toLocaleDateString("pt-BR")}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Status</Text>
          <Badge color={hero.isActive ? "green" : "gray"}>
            {hero.isActive ? "Ativo" : "Inativo"}
          </Badge>
        </Group>
      </Stack>
    </Modal>
  );
}