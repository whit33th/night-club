"use client";

import { useMutation } from "convex/react";
import { usePaginatedQuery } from "convex-helpers/react/cache/hooks";
import { api } from "@/convex/_generated/api";
import { useAdminForm } from "../_hooks/useAdminForm";
import { FormField } from "../_components/FormField";
import { DataTable } from "../_components/DataTable";
import { HoverPreviewIcon } from "../_components/HoverPreview";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import Button from "@/components/UI/Form/Button";
import { Type, Crown, FileImage } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { deleteImageFromImageKit } from "../_utils/imageKit";

interface ResidentFormData {
  name: string;
  role: string;
}

const mapResidentToForm = (
  r: Partial<Doc<"residents">> | null,
): ResidentFormData => ({
  name: r?.name ?? "",
  role: r?.role ?? "",
});

const mapFormToResidentPatch = (f: ResidentFormData) => ({
  name: f.name?.trim(),
  role: f.role?.trim() || undefined,
  imageKitId: undefined as string | undefined,
  imageKitPath: undefined as string | undefined,
});

const residentColumns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  {
    key: "imageKitId",
    label: "Image",
    render: (r: Doc<"residents">) =>
      r.imageKitId ? (
        <HoverPreviewIcon
          imageKitId={r.imageKitId}
          imageKitPath={r.imageKitPath}
          size={160}
        />
      ) : (
        "—"
      ),
  },
  { key: "_creationTime", label: "Created" },
];

export default function ResidentsPage() {
  const createResident = useMutation(api.admin.createResident);
  const updateResident = useMutation(api.admin.updateResident);
  const deleteResident = useMutation(api.admin.deleteResident);

  const {
    results: residents,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.admin.paginateResidents,
    {},
    { initialNumItems: 5 },
  );

  const [editingId, setEditingId] = useState<Id<"residents"> | null>(null);
  const [editingResident, setEditingResident] =
    useState<Doc<"residents"> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    loading,
    imagePreview,
    handleFileChange,
    reset,
    clearImage,
  } = useAdminForm<ResidentFormData>({
    defaultValues: {
      name: "",
      role: "",
    },
    autoReset: false,
    onSubmit: async (data, imageKitData) => {
      const formData = mapFormToResidentPatch(data);

      if (editingId && editingResident) {
        const patch = { ...formData };

        if (imageKitData) {
          if (editingResident.imageKitId) {
            await deleteImageFromImageKit(editingResident.imageKitId);
          }
          patch.imageKitId = imageKitData.fileId;
          patch.imageKitPath = imageKitData.filePath;
        }

        await updateResident({ id: editingId, patch });

        setEditingId(null);
        setEditingResident(null);
        reset(mapResidentToForm(null));
        setImageError(false);
        clearImage();
      } else {
        const toCreate = {
          ...formData,
          imageKitId: imageKitData?.fileId || "",
          imageKitPath: imageKitData?.filePath,
        };
        await createResident(toCreate);

        reset(mapResidentToForm(null));
        setImageError(false);
        clearImage();
      }
    },
  });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (editingResident) {
      const formData = mapResidentToForm(editingResident);
      reset(formData);
    }
  }, [editingResident, reset]);

  const handleDelete = async (id: string, opts?: { skipConfirm?: boolean }) => {
    if (!opts?.skipConfirm) {
      const ok = confirm("Delete this resident?");
      if (!ok) return;
    }
    await deleteResident({ id: id as Id<"residents"> });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Residents</h1>
      {editingResident && (
        <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3 text-yellow-200">
          Editing: <span className="font-semibold">{editingResident.name}</span>
          <button
            type="button"
            className="ml-4 rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
            onClick={() => {
              setEditingId(null);
              setEditingResident(null);
              reset(mapResidentToForm(null));
              setImageError(false);
              clearImage();
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <form
        key={editingResident?._id || "new"}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Name"
            icon={<Type className="h-4 w-4" />}
            required
            placeholder="Enter resident name"
            error={errors.name}
            {...register("name", {
              required: "Name is required",
            })}
          />

          <FormField
            label="Role"
            icon={<Crown className="h-4 w-4" />}
            placeholder="DJ, Producer, etc."
            error={errors.role}
            {...register("role")}
          />

          <div className="md:col-span-2">
            <input
              id="resident-image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e as React.ChangeEvent<HTMLInputElement>);
                setImageError(false);
              }}
              className="sr-only"
            />
            <label
              htmlFor="resident-image"
              className={`group block w-full cursor-pointer rounded-xl border-2 border-dashed bg-white/5 transition-colors ${imageError ? "border-red-500" : "border-white/20 hover:border-white/40"}`}
            >
              <div className="flex min-h-48 items-center justify-center p-4">
                {imagePreview ? (
                  <div className="relative aspect-video w-full max-w-xl">
                    <Image
                      src={imagePreview}
                      alt="Resident preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-white/70">
                    <FileImage className="mb-3 h-10 w-10" />
                    <span className="text-sm">
                      Choose image <span className="text-red-500">*</span>
                    </span>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          onClick={(e) => {
            const isCreate = !editingId;
            if (isCreate && !imagePreview) {
              e.preventDefault();
              setImageError(true);
            }
          }}
        >
          {loading
            ? editingId
              ? "Updating..."
              : "Saving..."
            : editingId
              ? "Update Resident"
              : "Create Resident"}
        </Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Residents</h2>
        <DataTable
          data={residents as Doc<"residents">[]}
          columns={residentColumns}
          onEdit={(item) => {
            setEditingId(item._id);
            setEditingResident(item);
            setImageError(false);
            clearImage();
          }}
          onDelete={handleDelete}
          loading={status === "LoadingFirstPage"}
        />

        {status === "CanLoadMore" && (
          <Button variant="secondary" onClick={() => loadMore(5)}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
