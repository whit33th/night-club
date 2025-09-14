"use client";

import Button from "@/components/UI/Form/Button";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex-helpers/react/cache/hooks";
import { useMutation } from "convex/react";
import {
  CalendarDays,
  Clock3,
  DollarSign,
  Link,
  MessageSquareText,
  Music2,
  Type,
} from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { DataTable } from "./_components/DataTable";
import { FormField } from "./_components/FormField";
import { HoverPreviewIcon } from "./_components/HoverPreview";
import EventImagePicker from "./_components/ImagePicker";
import MultiSelect from "./_components/MultiSelect";
import { useAdminForm } from "./_hooks/useAdminForm";
import { deleteImageFromImageKit } from "./_utils/imageKit";

interface EventFormData {
  title: string;
  date: string;
  startAt: string;
  doorsAt: string;
  imageKitId: string;
  musicGenres: string[];
  minAge: string;
  dressCode: string;
  priceFrom: string;
  currency: string;
  ticketUrl: string;
  description: string;
  artists: { name: string; role: string }[];
}

const mapEventToForm = (e: Partial<Doc<"events">> | null): EventFormData => ({
  title: e?.title ?? "",
  date: e?.date ?? "",
  startAt: e?.startAt ?? "",
  doorsAt: e?.doorsAt ?? "",
  imageKitId: e?.imageKitId ?? "",
  musicGenres: e?.musicGenres ?? [],
  minAge: e?.minAge != null ? String(e.minAge) : "",
  dressCode: e?.dressCode ?? "",
  priceFrom: e?.priceFrom != null ? String(e.priceFrom) : "",
  currency: e?.currency ?? "PLN",
  ticketUrl: e?.ticketUrl ?? "",
  description: e?.description ?? "",
  artists: (e?.artists || []).map((a) => ({
    name: a.name || "",
    role: a.role || "",
  })),
});

const mapFormToPatch = (f: EventFormData) => ({
  title: f.title,
  date: f.date,
  startAt: f.startAt,
  doorsAt: f.doorsAt || undefined,
  musicGenres:
    f.musicGenres && f.musicGenres.length ? f.musicGenres : undefined,
  minAge: f.minAge ? Number(f.minAge) : undefined,
  dressCode: f.dressCode || undefined,
  artists:
    f.artists && f.artists.length
      ? f.artists
          .map((a, i) => ({
            index: i,
            name: a.name.trim(),
            role: a.role.trim() || undefined,
          }))
          .filter((a) => a.name.length > 0)
      : undefined,
  priceFrom: f.priceFrom ? Number(f.priceFrom) : undefined,
  currency: f.currency || undefined,
  ticketUrl: f.ticketUrl || undefined,
  description: f.description || undefined,
  imageKitId: undefined as string | undefined,
  imageKitPath: undefined as string | undefined,
});

const eventColumns = [
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  { key: "startAt", label: "Start Time" },
  {
    key: "artists",
    label: "Artists",
    render: (event: Doc<"events">) =>
      (event.artists ?? []).map((a) => a.name).join(", ") || "—",
  },
  {
    key: "imageKitId",
    label: "Image",
    render: (event: Doc<"events">) => (
      <HoverPreviewIcon
        imageKitId={event.imageKitId}
        imageKitPath={event.imageKitPath}
        size={160}
      />
    ),
  },
  {
    key: "musicGenres",
    label: "Genres",
    render: (event: Doc<"events">) =>
      (event.musicGenres ?? []).join(", ") || "—",
  },
  { key: "minAge", label: "Min Age" },
  { key: "dressCode", label: "Dress Code" },
  {
    key: "priceFrom",
    label: "Price From",
    render: (event: Doc<"events">) =>
      event.priceFrom ? `${event.priceFrom} ${event.currency || ""}` : "Free",
  },
  {
    key: "ticketUrl",
    label: "Ticket",
    render: (event: Doc<"events">) =>
      event.ticketUrl ? (
        <a
          href={event.ticketUrl}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Link
        </a>
      ) : (
        "—"
      ),
  },
  { key: "_creationTime", label: "Created" },
];

export default function EventsPage() {
  const createEvent = useMutation(api.admin.createEvent);
  const updateEvent = useMutation(api.admin.updateEvent);
  const deleteEvent = useMutation(api.admin.deleteEvent);

  const {
    results: events,
    status,
    loadMore,
  } = usePaginatedQuery(api.admin.paginateEvents, {}, { initialNumItems: 50 });

  const [editingId, setEditingId] = useState<Id<"events"> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Doc<"events"> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    loading,
    imagePreview,
    handleFileChange,
    reset,
    watch,
    control,
    clearImage,
    resetForm,
  } = useAdminForm<EventFormData>({
    defaultValues: {
      title: "",
      date: "",
      startAt: "",
      doorsAt: "",
      imageKitId: "",
      musicGenres: [],
      minAge: "",
      dressCode: "",
      priceFrom: "",
      currency: "PLN",
      ticketUrl: "",
      description: "",
      artists: [],
    },
    autoReset: true,
    onSubmit: async (data, imageKitData) => {
      const formData = mapFormToPatch(data);

      if (editingId && editingEvent) {
        const patch = { ...formData };

        if (imageKitData) {
          if (editingEvent.imageKitId) {
            await deleteImageFromImageKit(editingEvent.imageKitId);
          }
          patch.imageKitId = imageKitData.fileId;
          patch.imageKitPath = imageKitData.filePath;
        }

        await updateEvent({ id: editingId, patch });

        setEditingId(null);
        setEditingEvent(null);
        setImageError(false);
        clearImage();
        setFormKey((k) => k + 1);
      } else {
        const toCreate = {
          ...formData,
          imageKitId: imageKitData?.fileId || "",
          imageKitPath: imageKitData?.filePath,
        };
        await createEvent(toCreate);

        setImageError(false);
        clearImage();
        setFormKey((k) => k + 1);
      }
    },
  });

  const [imageError, setImageError] = useState(false);

  const liveTitle = watch("title");

  const {
    fields: artistFields,
    append: appendArtist,
    remove: removeArtist,
  } = useFieldArray({ name: "artists", control });

  const handleDelete = async (id: string, opts?: { skipConfirm?: boolean }) => {
    if (!opts?.skipConfirm) {
      const ok = confirm("Are you sure you want to delete this event?");
      if (!ok) return;
    }
    await deleteEvent({ id: id as Id<"events"> });
  };

  const [formKey, setFormKey] = useState(0);

  return (
    <div>
      <h1 className="text-2xl font-bold">Events</h1>

      {editingEvent && (
        <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3 text-yellow-200">
          Editing:{" "}
          <span className="font-semibold">
            {liveTitle || editingEvent.title}
          </span>
          <button
            type="button"
            className="ml-4 rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onClick={() => {
              setEditingId(null);
              setEditingEvent(null);
              resetForm();
              setImageError(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <form
        key={`${editingId ?? "new"}-${formKey}`}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            label="Event Title"
            icon={<Type className="h-4 w-4" />}
            required
            error={errors.title}
            placeholder="Enter event title"
            {...register("title", {
              required: "Title is required",
            })}
          />
          <FormField
            label="Date"
            type="date"
            icon={<CalendarDays className="h-4 w-4" />}
            required
            error={errors.date}
            {...register("date", { required: "Date is required" })}
          />
          <FormField
            label="Start Time"
            type="time"
            icon={<Clock3 className="h-4 w-4" />}
            required
            error={errors.startAt}
            {...register("startAt", { required: "Start time is required" })}
          />
          <FormField
            label="Doors Open"
            type="time"
            icon={<Clock3 className="h-4 w-4" />}
            error={errors.doorsAt}
            {...register("doorsAt")}
          />
          <FormField
            label="Min Age"
            type="number"
            placeholder="18"
            error={errors.minAge}
            {...register("minAge")}
          />
          <FormField
            label="Dress Code"
            placeholder="Casual / Smart / ..."
            error={errors.dressCode}
            {...register("dressCode")}
          />

          <EventImagePicker
            imagePreview={imagePreview}
            imageError={imageError}
            disabled={loading}
            onChange={(e) => {
              handleFileChange(e as React.ChangeEvent<HTMLInputElement>);
              setImageError(false);
            }}
          />
          <div className="md:col-span-1">
            <Controller
              control={control}
              name="musicGenres"
              render={({ field }) => (
                <MultiSelect
                  label="Music Genres"
                  icon={<Music2 className="h-4 w-4" />}
                  options={[
                    { value: "pop", label: "Pop" },
                    { value: "hip-hop", label: "Hip Hop" },
                    { value: "rock", label: "Rock" },
                    { value: "electronic", label: "Electronic" },
                    { value: "reggae", label: "Reggae" },
                    { value: "country", label: "Country" },
                    { value: "folk", label: "Folk" },
                    { value: "punk", label: "Punk" },
                    { value: "jazz", label: "Jazz" },
                    { value: "blues", label: "Blues" },
                    { value: "metal", label: "Metal" },
                    { value: "classical", label: "Classical" },
                    { value: "house", label: "House" },
                    { value: "techno", label: "Techno" },
                    { value: "deep-house", label: "Deep House" },
                    { value: "progressive-house", label: "Progressive House" },
                    { value: "melodic-techno", label: "Melodic Techno" },
                    { value: "minimal", label: "Minimal" },
                    { value: "trance", label: "Trance" },
                    { value: "drum-and-bass", label: "Drum & Bass" },
                    { value: "breaks", label: "Breaks" },
                    { value: "acid", label: "Acid" },
                    { value: "electro", label: "Electro" },
                    { value: "garage", label: "UK Garage" },
                    { value: "disco", label: "Disco" },
                    { value: "ambient", label: "Ambient" },
                  ]}
                  selected={field.value || []}
                  onChange={(next) => field.onChange(next)}
                  placeholder="Select genres"
                />
              )}
            />
          </div>
          <div className="md:col-span-2">
            <div className="mb-1 text-xs uppercase text-white/80">Artists</div>
            <div className="space-y-3">
              {artistFields.map((af, idx) => (
                <div
                  key={af.id}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  <FormField
                    placeholder="Artist name"
                    {...register(`artists.${idx}.name` as const)}
                  />
                  <div className="flex items-end gap-2">
                    <div className="grow">
                      <FormField
                        placeholder="Role (DJ / Band / Host / etc)"
                        {...register(`artists.${idx}.role` as const)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => removeArtist(idx)}
                      disabled={loading}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => appendArtist({ name: "", role: "" })}
                disabled={loading}
              >
                Add artist
              </Button>
            </div>
          </div>
          <FormField
            label="Price From"
            type="number"
            icon={<DollarSign className="h-4 w-4" />}
            placeholder="0"
            error={errors.priceFrom}
            {...register("priceFrom")}
          />
          <FormField
            label="Currency"
            placeholder="PLN"
            error={errors.currency}
            {...register("currency")}
          />
          <FormField
            label="Ticket URL"
            type="text"
            icon={<Link className="h-4 w-4" />}
            placeholder="https://tickets.com/event"
            error={errors.ticketUrl}
            {...register("ticketUrl")}
          />
          <FormField
            label="Description"
            type="textarea"
            icon={<MessageSquareText className="h-4 w-4" />}
            placeholder="Event description..."
            error={errors.description}
            className="md:col-span-3"
            {...register("description")}
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          onClick={(e) => {
            if (!editingEvent && !imagePreview) {
              e.preventDefault();
              setImageError(true);
            }
          }}
        >
          {loading
            ? editingEvent
              ? "Updating..."
              : "Creating..."
            : editingEvent
              ? "Update Event"
              : "Create Event"}
        </Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Events</h2>
        <DataTable
          data={events as Doc<"events">[]}
          columns={eventColumns}
          onEdit={(item) => {
            setEditingId(item._id);
            setEditingEvent(item);
            setImageError(false);
            clearImage();

            reset(mapEventToForm(item));
          }}
          onDelete={handleDelete}
          loading={status === "LoadingFirstPage"}
          actionsDisabled={loading}
          onLoadMore={() => loadMore(50)}
          canLoadMore={status === "CanLoadMore"}
        />
      </div>
    </div>
  );
}
