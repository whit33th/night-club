"use client";

import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import Button from "@/components/UI/Form/Button";
import { Type, Crown } from "lucide-react";
import { useAdminCrud } from "../_hooks/useAdminCrud";
import { FormField } from "../_components/FormField";
import { DataTable } from "../_components/DataTable";
import { HoverPreviewIcon } from "../_components/HoverPreview";
import AdminImageUpload from "../_components/AdminImageUpload";
import EditingBanner from "../_components/EditingBanner";

interface ResidentFormData {
  name: string;
  role: string;
}

const mapResidentToForm = (r: Doc<"residents"> | null): ResidentFormData => ({
  name: r?.name ?? "",
  role: r?.role ?? "",
});

const mapFormToResidentPatch = (f: ResidentFormData) => ({
  name: f.name?.trim(),
  role: f.role?.trim() || undefined,
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
  const crud = useAdminCrud<Doc<"residents">, ResidentFormData>({
    api: {
      paginate: api.admin.paginateResidents,
      create: api.admin.createResident,
      update: api.admin.updateResident,
      delete: api.admin.deleteResident,
    },
    defaultValues: { name: "", role: "" },
    mapToForm: mapResidentToForm,
    mapToPatch: mapFormToResidentPatch,
    hasImage: true,
    requiresImageOnCreate: true,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Residents</h1>
      
      <EditingBanner
        isEditing={!!crud.editingItem}
        itemName={crud.editingItem?.name || ""}
        onCancel={crud.exitEditMode}
        disabled={crud.loading}
      />

      <form onSubmit={crud.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Name"
            icon={<Type className="h-4 w-4" />}
            required
            placeholder="Enter resident name"
            error={crud.formState.errors.name}
            {...crud.register("name", { required: "Name is required" })}
          />

          <FormField
            label="Role"
            icon={<Crown className="h-4 w-4" />}
            placeholder="DJ, Producer, etc."
            error={crud.formState.errors.role}
            {...crud.register("role")}
          />

          <AdminImageUpload
            id="resident-image"
            label="Image"
            imagePreview={crud.imagePreview}
            imageError={crud.imageError}
            required
            disabled={crud.loading}
            onChange={crud.handleFileChange}
            onErrorClear={() => crud.setImageError(false)}
            className="md:col-span-2"
          />
        </div>

        <Button type="submit" loading={crud.loading}>
          {crud.loading
            ? crud.editingId
              ? "Updating..."
              : "Saving..."
            : crud.editingId
              ? "Update Resident"
              : "Create Resident"}
        </Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Residents</h2>
        <DataTable
          data={crud.items}
          columns={residentColumns}
          onEdit={crud.enterEditMode}
          onDelete={crud.handleDelete}
          loading={crud.isLoading}
          actionsDisabled={crud.loading}
          onLoadMore={crud.loadMore}
          canLoadMore={crud.canLoadMore}
        />
      </div>
    </div>
  );
}
