import { Modal, Text, Button, Group } from "@mantine/core";

interface ConfirmModalProps {
  opened: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmColor?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  opened, title, message, confirmLabel = "Confirmar",
  confirmColor = "red", loading, onConfirm, onClose,
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} size="sm">
      <Text size="sm">{message}</Text>
      <Group justify="flex-end" mt="lg">
        <Button variant="default" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button color={confirmColor} loading={loading} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  );
}