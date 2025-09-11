"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { usePaginatedQuery } from "convex-helpers/react/cache/hooks";
import { useAdminForm } from "./useAdminForm";
import { deleteImageFromImageKit } from "../_utils/imageKit";
import type { Id } from "@/convex/_generated/dataModel";
import type { FieldValues } from "react-hook-form";

interface CrudConfig<T, FormData extends FieldValues> {
  api: {
    paginate: any;
    create: any;
    update: any;
    delete: any;
  };
  defaultValues: FormData;
  mapToForm: (item: T | null) => FormData;
  mapToPatch: (formData: FormData) => any;
  hasImage?: boolean;
  requiresImageOnCreate?: boolean;
}

export function useAdminCrud<T extends { _id: Id<any>; imageKitId?: string }, FormData extends FieldValues>({
  api,
  defaultValues,
  mapToForm,
  mapToPatch,
  hasImage = false,
  requiresImageOnCreate = false,
}: CrudConfig<T, FormData>) {
  // Mutations
  const createMutation = useMutation(api.create);
  const updateMutation = useMutation(api.update);
  const deleteMutation = useMutation(api.delete);

  // Pagination
  const { results, status, loadMore } = usePaginatedQuery(
    api.paginate,
    {},
    { initialNumItems: 50 }
  );

  // Editing state
  const [editingId, setEditingId] = useState<Id<any> | null>(null);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [imageError, setImageError] = useState(false);

  // Form hook
  const form = useAdminForm({
    defaultValues: defaultValues as any,
    autoReset: true,
    onSubmit: async (data, imageKitData) => {
      const formData = mapToPatch(data);

      if (editingId && editingItem) {
        // Update
        const patch = { ...formData };

        if (hasImage && imageKitData) {
          if (editingItem.imageKitId) {
            await deleteImageFromImageKit(editingItem.imageKitId);
          }
          patch.imageKitId = imageKitData.fileId;
          patch.imageKitPath = imageKitData.filePath;
        }

        await updateMutation({ id: editingId, patch });
        exitEditMode();
      } else {
        // Create
        const toCreate = {
          ...formData,
          ...(hasImage && imageKitData && {
            imageKitId: imageKitData.fileId,
            imageKitPath: imageKitData.filePath,
          }),
        };
        await createMutation(toCreate);
        setImageError(false);
      }
    },
  });

  // Sync form with editing item
  useEffect(() => {
    if (editingItem) {
      form.reset(mapToForm(editingItem));
    } else {
      form.resetForm();
    }
  }, [editingItem, form.reset, form.resetForm]);

  const enterEditMode = (item: T) => {
    setEditingId(item._id);
    setEditingItem(item);
    setImageError(false);
    form.clearImage();
  };

  const exitEditMode = () => {
    setEditingId(null);
    setEditingItem(null);
    setImageError(false);
    form.resetForm();
  };

  const handleDelete = async (id: string, opts?: { skipConfirm?: boolean }) => {
    if (!opts?.skipConfirm && !confirm("Are you sure you want to delete this item?")) {
      return;
    }
    await deleteMutation({ id: id as Id<any> });
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (requiresImageOnCreate && !editingId && !form.imagePreview) {
      e.preventDefault();
      setImageError(true);
      return;
    }
    form.handleSubmit(e);
  };

  return {
    // Data
    items: results as T[],
    isLoading: status === "LoadingFirstPage",
    canLoadMore: status === "CanLoadMore",
    loadMore: () => loadMore(50),

    // Form
    ...form,
    handleSubmit,

    // Editing
    editingItem,
    editingId,
    enterEditMode,
    exitEditMode,
    handleDelete,

    // Image
    imageError,
    setImageError,
  };
}
