"use client";

import Button from "@/components/UI/Form/Button";

export default function BulkActionsBar({
  disabled,
  count,
  onDelete,
}: {
  disabled: boolean;
  count: number;
  onDelete: () => void | Promise<void>;
}) {
  return (
    <div className="mt-2 flex items-center justify-between">
      <Button variant="secondary" disabled={disabled} onClick={onDelete}>
        Delete selected {count ? `(${count})` : ""}
      </Button>
    </div>
  );
}
