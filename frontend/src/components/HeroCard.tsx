import { Card, Image, Text, Badge, Stack } from "@mantine/core";
import type { Hero } from "../types/Hero";

interface HeroCardProps {
  hero: Hero;
  onClick: () => void;
}

export function HeroCard({ hero, onClick }: HeroCardProps) {
  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      onClick={onClick}
      style={{
        opacity: hero.isActive ? 1 : 0.5,
        filter: hero.isActive ? "none" : "grayscale(100%)",
        cursor: "pointer",
      }}
    >
      <Card.Section>
        <Image
          src={hero.avatarUrl}
          height={180}
          alt={hero.name}
          fallbackSrc="https://placehold.co/300x180?text=Hero"
        />
      </Card.Section>

      <Stack gap={4} mt="sm">
        <Text fw={700} lineClamp={1}>{hero.name}</Text>
        <Text size="sm" c="dimmed" lineClamp={1}>{hero.nickname}</Text>
        <Badge color={hero.isActive ? "green" : "gray"} variant="light" size="sm">
          {hero.isActive ? "Ativo" : "Inativo"}
        </Badge>
      </Stack>
    </Card>
  );
}