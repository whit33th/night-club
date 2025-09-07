"use client";

import { useMutation, useQuery } from "convex/react";
import { usePaginatedQuery } from "convex-helpers/react/cache/hooks";
import { api } from "@/convex/_generated/api";
import { useAdminForm } from "../_hooks/useAdminForm";
import { FormField } from "../_components/FormField";
import { DataTable } from "../_components/DataTable";
import { HoverPreviewIcon } from "../_components/HoverPreview";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import Button from "@/components/UI/Form/Button";
import { Type, FileImage, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteImageFromImageKit } from "../_utils/imageKit";

interface NewsFormData {
  title: string;
  body: string;
}

const mapNewsToForm = (n: Partial<Doc<"news">> | null): NewsFormData => ({
  title: n?.title ?? "",
  body: n?.body ?? "",
});

const mapFormToNewsPatch = (f: NewsFormData) => ({
  title: f.title.trim(),
  body: f.body.trim(),
  imageKitId: undefined as string | undefined,
  imageKitPath: undefined as string | undefined,
});

const newsColumns = [
  { key: "title", label: "Title" },
  {
    key: "body",
    label: "Body",
    render: (n: Doc<"news">) =>
      (n.body?.length ?? 0) > 120 ? `${n.body.slice(0, 120)}…` : n.body || "—",
  },
  {
    key: "imageKitId",
    label: "Image",
    render: (n: Doc<"news">) =>
      n.imageKitId ? (
        <HoverPreviewIcon
          imageKitId={n.imageKitId}
          imageKitPath={(n as any).imageKitPath}
          size={160}
        />
      ) : (
        "—"
      ),
  },
  { key: "_creationTime", label: "Created" },
];

export default function NewsPage() {
  const createNews = useMutation(api.admin.createNews);
  const updateNews = useMutation(api.admin.updateNews);
  const deleteNews = useMutation(api.admin.deleteNews);

  const {
    results: news,
    status,
    loadMore,
  } = usePaginatedQuery(api.admin.paginateNews, {}, { initialNumItems: 5 });

  const [editingId, setEditingId] = useState<Id<"news"> | null>(null);
  const [editingNews, setEditingNews] = useState<Doc<"news"> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    loading,
    imagePreview,
    handleFileChange,
    setValue,
    reset,
    watch,
    clearImage,
  } = useAdminForm<NewsFormData>({
    defaultValues: {
      title: "",
      body: "",
    },
    autoReset: false,
    onSubmit: async (data, imageKitData) => {
      const formData = mapFormToNewsPatch(data);

      if (editingId && editingNews) {
        const patch = { ...formData };

        if (imageKitData) {
          if (editingNews.imageKitId) {
            await deleteImageFromImageKit(editingNews.imageKitId);
          }
          patch.imageKitId = imageKitData.fileId;
          patch.imageKitPath = imageKitData.filePath;
        }

        await updateNews({ id: editingId, patch });

        setEditingId(null);
        setEditingNews(null);
        reset(mapNewsToForm(null));
        setImageError(false);
        clearImage();
      } else {
        const toCreate = {
          ...formData,
          imageKitId: imageKitData?.fileId || "",
          imageKitPath: imageKitData?.filePath,
        };
        await createNews(toCreate);

        reset(mapNewsToForm(null));
        setImageError(false);
        clearImage();
      }
    },
  });

  const [imageError, setImageError] = useState(false);

  const liveTitle = watch("title");

  useEffect(() => {
    if (editingNews) {
      const formData = mapNewsToForm(editingNews);
      reset(formData);
    }
  }, [editingNews, reset]);

  const handleDelete = async (id: string, opts?: { skipConfirm?: boolean }) => {
    if (!opts?.skipConfirm) {
      const ok = confirm("Delete this news item?");
      if (!ok) return;
    }
    await deleteNews({ id: id as Id<"news"> });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">News</h1>

      {editingNews && (
        <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3 text-yellow-200">
          Editing:{" "}
          <span className="font-semibold">
            {liveTitle || editingNews.title}
          </span>
          <button
            type="button"
            className="ml-4 rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
            onClick={() => {
              setEditingId(null);
              setEditingNews(null);
              reset(mapNewsToForm(null));
              setImageError(false);
              clearImage();
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <form
        key={editingNews?._id || "new"}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Title"
            icon={<Type className="h-4 w-4" />}
            required
            placeholder="News title"
            error={errors.title}
            {...register("title", {
              required: "Title is required",
            })}
          />

          <div className="md:col-span-2">
            <input
              id="news-image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e as React.ChangeEvent<HTMLInputElement>);
                setImageError(false);
              }}
              className="sr-only"
            />
            <label
              htmlFor="news-image"
              className={`group block w-full cursor-pointer rounded-xl border-2 border-dashed bg-white/5 transition-colors ${imageError ? "border-red-500" : "border-white/20 hover:border-white/40"}`}
            >
              <div className="flex min-h-48 items-center justify-center p-4">
                {imagePreview ? (
                  <div className="relative aspect-video w-full max-w-xl">
                    <img
                      src={imagePreview}
                      alt="News preview"
                      className="h-full w-full object-contain"
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

          <FormField
            label="Body"
            type="textarea"
            icon={<MessageSquareText className="h-4 w-4" />}
            placeholder="Full text..."
            required
            error={errors.body}
            className="md:col-span-2"
            {...register("body", { required: "Body is required" })}
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          onClick={(e) => {
            if (!editingNews && !imagePreview) {
              e.preventDefault();
              setImageError(true);
            }
          }}
        >
          {loading
            ? editingNews
              ? "Updating..."
              : "Saving..."
            : editingNews
              ? "Update News"
              : "Create News"}
        </Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing News</h2>
        <DataTable
          data={news as Doc<"news">[]}
          columns={newsColumns}
          onEdit={(item) => {
            setEditingId(item._id);
            setEditingNews(item);
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
