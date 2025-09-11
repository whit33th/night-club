"use client";

interface EditingBannerProps {
  isEditing: boolean;
  itemName: string;
  liveTitle?: string;
  onCancel: () => void;
  disabled?: boolean;
}

export default function EditingBanner({
  isEditing,
  itemName,
  liveTitle,
  onCancel,
  disabled = false,
}: EditingBannerProps) {
  if (!isEditing) return null;

  return (
    <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3 text-yellow-200">
      Editing: <span className="font-semibold">{liveTitle || itemName}</span>
      <button
        type="button"
        className="ml-4 rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
}
