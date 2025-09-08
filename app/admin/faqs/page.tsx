"use client";

import Button from "@/components/UI/Form/Button";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex-helpers/react/cache/hooks";
import { useMutation } from "convex/react";
import { HelpCircle, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "../_components/DataTable";
import { FormField } from "../_components/FormField";
import { useAdminForm } from "../_hooks/useAdminForm";

interface FAQFormData {
  question: string;
  answer: string;
}

const mapFaqToForm = (f: Partial<Doc<"faqs">> | null): FAQFormData => ({
  question: f?.question ?? "",
  answer: f?.answer ?? "",
});

const mapFormToFaqPatch = (f: FAQFormData) => ({
  question: f.question.trim(),
  answer: f.answer.trim(),
});

const faqColumns = [
  { key: "question", label: "Question" },
  {
    key: "answer",
    label: "Answer",
    render: (faq: Doc<"faqs">) =>
      faq.answer.length > 100
        ? `${faq.answer.substring(0, 100)}...`
        : faq.answer,
  },
  { key: "_creationTime", label: "Created" },
];

export default function FAQsPage() {
  const createFaq = useMutation(api.admin.createFaq);
  const updateFaq = useMutation(api.admin.updateFaq);
  const deleteFaq = useMutation(api.admin.deleteFaq);

  const {
    results: faqs,
    status,
    loadMore,
  } = usePaginatedQuery(api.admin.paginateFaqs, {}, { initialNumItems: 5 });

  const [editingId, setEditingId] = useState<Id<"faqs"> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Doc<"faqs"> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    loading,
    reset,
    watch,
  } = useAdminForm<FAQFormData>({
    defaultValues: {
      question: "",
      answer: "",
    },
    autoReset: false,
    onSubmit: async (data: FAQFormData) => {
      const formData = mapFormToFaqPatch(data);

      if (editingId && editingFaq) {
        await updateFaq({
          id: editingId,
          patch: formData,
        });

        setEditingId(null);
        setEditingFaq(null);
        reset(mapFaqToForm(null));
      } else {
        await createFaq(formData);

        reset(mapFaqToForm(null));
      }
    },
  });

  const liveQuestion = watch("question");

  useEffect(() => {
    if (editingFaq) {
      const formData = mapFaqToForm(editingFaq);
      reset(formData);
    }
  }, [editingFaq, reset]);

  const handleDelete = async (id: string, opts?: { skipConfirm?: boolean }) => {
    if (!opts?.skipConfirm) {
      const ok = confirm("Are you sure you want to delete this FAQ?");
      if (!ok) return;
    }
    await deleteFaq({ id: id as Id<"faqs"> });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">FAQs</h1>

      {editingFaq && (
        <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3 text-yellow-200">
          Editing:{" "}
          <span className="font-semibold">
            {liveQuestion || editingFaq.question}
          </span>
          <button
            type="button"
            className="ml-4 rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
            onClick={() => {
              setEditingId(null);
              setEditingFaq(null);
              reset(mapFaqToForm(null));
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <form
        key={editingFaq?._id || "new"}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4">
          <FormField
            label="Question"
            icon={<HelpCircle className="h-4 w-4" />}
            required
            placeholder="What question do people frequently ask?"
            error={errors.question}
            {...register("question", {
              required: "Question is required",
            })}
          />

          <FormField
            label="Answer"
            type="textarea"
            icon={<MessageSquareText className="h-4 w-4" />}
            required
            placeholder="Provide a detailed answer..."
            error={errors.answer}
            {...register("answer", {
              required: "Answer is required",
            })}
          />
        </div>

        <Button type="submit" loading={loading}>
          {loading
            ? editingFaq
              ? "Updating..."
              : "Creating..."
            : editingFaq
              ? "Update FAQ"
              : "Create FAQ"}
        </Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing FAQs</h2>
        <DataTable
          data={faqs as Doc<"faqs">[]}
          columns={faqColumns}
          onEdit={(item) => {
            setEditingId(item._id);
            setEditingFaq(item);
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
