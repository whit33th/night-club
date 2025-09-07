import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

interface UseAdminFormOptions<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<void>;
}

export function useAdminForm<T extends FieldValues>({
  defaultValues,
  onSubmit,
}: UseAdminFormOptions<T>) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const form = useForm<T>({
    defaultValues,
    mode: "onTouched", // Validate on input
  });

  const handleSubmit = async (data: T) => {
    try {
      setLoading(true);
      await onSubmit(data);
      toast.success("Saved successfully!");
      form.reset();
      setImagePreview("");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      // Get auth token from API
      const authRes = await fetch("/api/imagekit/auth");
      if (!authRes.ok) throw new Error("Failed to get auth token");

      const { token, expire, signature, publicKey } = await authRes.json();

      // Upload to ImageKit
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("token", token);
      formData.append("expire", expire.toString());
      formData.append("signature", signature);
      formData.append("publicKey", publicKey);

      const uploadRes = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!uploadRes.ok) throw new Error("Upload failed");

      const result = await uploadRes.json();

      // Set preview
      setImagePreview(result.url);

      return result.fileId;
    } catch (error: any) {
      toast.error("Image upload failed: " + error.message);
      throw error;
    }
  };

  return {
    ...form,
    loading,
    imagePreview,
    setImagePreview,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleImageUpload,
  };
}
