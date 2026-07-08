import { Card, Image, Text, Badge, Stack, Menu, ActionIcon } from "@mantine/core";
import { IconDots, IconEdit, IconTrash, IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";

import type { Hero } from "../types/Hero";

interface HeroCardProps {
  hero: Hero;
  onClick: () => void;
  onEdit: () => void;
  onDeactivate: () => void;
  onActivate: () => void;
  onDelete: () => void;
}

export function HeroCard({ hero, onClick, onEdit, onDeactivate, onActivate, onDelete }: HeroCardProps) {
  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      style={{
        opacity: hero.isActive ? 1 : 0.5,
        filter: hero.isActive ? "none" : "grayscale(100%)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
        onClick={(e) => e.stopPropagation()}>
          <Menu shadow="md" width={150}>
            <Menu.Target>
              <ActionIcon variant="white" size="sm">
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {hero.isActive && (
                <>
                  <Menu.Item leftSection={<IconEdit size={14} />} onClick={onEdit}>
                    Editar
                  </Menu.Item>
                  <Menu.Item color="orange" leftSection={<IconPlayerPause size={14} />} onClick={onDeactivate}>
                    Inativar
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={14} />} onClick={onDelete}>
                    Excluir
                  </Menu.Item>
                </>
              )}
              {!hero.isActive && (
                <Menu.Item color="green" leftSection={<IconPlayerPlay size={14} />} onClick={onActivate}>
                  Ativar
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
      </div>
      <Card.Section onClick={onClick} style={{ cursor: "pointer" }}>
        <Image
          src={hero.avatarUrl}
          height={180}
          alt={hero.name}
          fallbackSrc="https://placehold.co/300x180?text=Hero"
        />
      </Card.Section>

      <Stack gap={4} mt="sm" onClick={onClick} style={{ cursor: "pointer" }}>
        <Text fw={700} lineClamp={1}>{hero.name}</Text>
        <Text size="sm" c="dimmed" lineClamp={1}>{hero.nickname}</Text>
        <Badge color={hero.isActive ? "green" : "gray"} variant="light" size="sm">
          {hero.isActive ? "Ativo" : "Inativo"}
        </Badge>
      </Stack>
    </Card>
  );
}