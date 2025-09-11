"use client";

import Button from "@/components/UI/Form/Button";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex-helpers/react/cache/hooks";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../_components/DataTable";
import { HoverPreviewIcon } from "../_components/HoverPreview";
import { useAdminForm } from "../_hooks/useAdminForm";
import GalleryFilePicker from "./_components/GalleryFilePicker";
import GallerySelectedGrid, {
  LocalItem,
} from "./_components/GallerySelectedGrid";
interface GalleryFormData {
  imageKitId: string;
}

const galleryColumns = [
  {
    key: "imageKitId",
    label: "Image",
    render: (g: { imageKitId?: string; imageKitPath?: string }) =>
      g.imageKitId ? (
        <HoverPreviewIcon
          imageKitId={g.imageKitId}
          imageKitPath={g.imageKitPath}
          size={160}
        />
      ) : (
        "—"
      ),
  },
  { key: "_creationTime", label: "Created" },
];

type GalleryRow = {
  _id: string;
  imageKitId: string;
  imageKitPath?: string;
  _creationTime: number;
};

export default function GalleryPage() {
  const addGalleryImage = useMutation(api.admin.addGalleryImage);
  const deleteGalleryImage = useMutation(api.admin.deleteGalleryImage);

  const {
    results: gallery,
    status,
    loadMore,
  } = usePaginatedQuery(api.admin.paginateGallery, {}, { initialNumItems: 20 });

  const { handleSubmit, uploadFile } = useAdminForm<GalleryFormData>({
    defaultValues: { imageKitId: "" },
    onSubmit: async () => {
      return;
    },
  });

  const [selected, setSelected] = useState<LocalItem[]>([]);
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const next: LocalItem[] = [];
    const invalid: string[] = [];
    Array.from(files).forEach((file, idx) => {
      const isImage = file.type
        ? file.type.startsWith("image/")
        : /\.(png|jpe?g|webp|gif|bmp|tiff|svg)$/i.test(file.name);
      if (!isImage) {
        invalid.push(file.name);
        return;
      }
      const url = URL.createObjectURL(file);
      const id = `${file.name}-${file.lastModified}-${Date.now()}-${idx}`;
      next.push({ id, file, url });
    });
    if (invalid.length) {
      toast.error(
        `Some files are not images and were skipped: ${invalid.slice(0, 3).join(", ")}${invalid.length > 3 ? " and more" : ""}`,
      );
    }
    if (next.length) {
      setSelected((prev) => [...prev, ...next]);
      setImageError(false);
    }
  };

  const removeLocal = (id: string) => {
    setSelected((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) URL.revokeObjectURL(found.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  useEffect(
    () => () => {
      selected.forEach((i) => URL.revokeObjectURL(i.url));
    },
    [selected],
  );

  const handleDelete = async (id: string, opts?: { skipConfirm?: boolean }) => {
    if (!opts?.skipConfirm) {
      const ok = confirm("Are you sure you want to delete this gallery item?");
      if (!ok) return;
    }
    try {
      const item = (gallery as unknown as GalleryRow[]).find(
        (g) => g._id === id,
      );
      const imageKitId = item?.imageKitId;
      if (imageKitId) {
        await fetch("/api/imagekit/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: [imageKitId] }),
        });
      }
    } finally {
      await deleteGalleryImage({ id: id as Id<"galleryImages"> });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Gallery </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <GalleryFilePicker
          disabled={isUploading}
          imageError={imageError}
          onFiles={addFiles}
        />

        <GallerySelectedGrid
          items={selected}
          disabled={isUploading}
          onRemove={removeLocal}
        />

        <Button
          type="submit"
          loading={isUploading}
          disabled={isUploading}
          onClick={async (e) => {
            e.preventDefault();
            if (selected.length === 0) {
              setImageError(true);
              return;
            }
            setIsUploading(true);
            try {
              const uploadResults = await Promise.all(
                selected.map(async (item) => {
                  try {
                    const result = await uploadFile(item.file);
                    return result;
                  } catch {
                    return null;
                  }
                }),
              );

              const validResults = uploadResults.filter(
                (result): result is { fileId: string; filePath: string } =>
                  Boolean(result),
              );

              await Promise.all(
                validResults.map((result) =>
                  addGalleryImage({
                    imageKitId: result.fileId,
                    imageKitPath: result.filePath,
                  }),
                ),
              );

              if (validResults.length > 0) {
                toast.success(
                  `Uploaded ${validResults.length} image${validResults.length > 1 ? "s" : ""}`,
                );
              } else {
                toast.error("Upload failed. Please try again.");
              }

              setSelected((prev) => {
                prev.forEach((i) => URL.revokeObjectURL(i.url));
                return [];
              });
            } finally {
              setIsUploading(false);
            }
          }}
        >
          {isUploading ? "Uploading..." : "Upload Images"}
        </Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Gallery Items</h2>
        <DataTable
          data={gallery as unknown as GalleryRow[]}
          columns={galleryColumns}
          onDelete={handleDelete}
          loading={status === "LoadingFirstPage"}
          actionsDisabled={isUploading}
          onLoadMore={() => loadMore(20)}
          canLoadMore={status === "CanLoadMore"}
        />
      </div>
    </div>
  );
}
