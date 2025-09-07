import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

interface UseAdminFormOptions<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  onSubmit: (
    data: T,
    imageKitData?: { fileId: string; filePath: string },
  ) => Promise<void>;
  autoReset?: boolean; // when true, reset form to defaults after successful submit
}

export function useAdminForm<T extends FieldValues>({
  defaultValues,
  onSubmit,
  autoReset = true,
}: UseAdminFormOptions<T>) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<T>({
    defaultValues,
    mode: "onTouched", // Validate on input
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type
      ? file.type.startsWith("image/")
      : /\.(png|jpe?g|webp|gif|bmp|tiff|svg)$/i.test(file.name);

    if (!isImage) {
      // Reset input and notify user
      event.target.value = "";
      setSelectedFile(null);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview("");
      toast.error("Please select an image file (PNG, JPEG, WebP, etc.).");
      return;
    }

    setSelectedFile(file);
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    // Clear input so selecting the same file again will fire onChange
    try {
      event.target.value = "";
    } catch {}
  };

  const uploadImageToImageKit = async (
    file: File,
  ): Promise<{ fileId: string; filePath: string }> => {
    try {
      // Compress before upload
      const MAX_SIZE_MB = 3;
      const compressed = await imageCompression(file, {
        maxSizeMB: MAX_SIZE_MB,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: "image/webp",
      });

      if (compressed.size > MAX_SIZE_MB * 1024 * 1024) {
        throw new Error("Image is too large (max 3 MB)");
      }

      // Get auth token from API
      const authRes = await fetch("/api/imagekit/auth");
      if (!authRes.ok) throw new Error("Failed to get auth token");

      const { token, expire, signature, publicKey } = await authRes.json();

      // Upload to ImageKit
      const formData = new FormData();
      formData.append("file", compressed);
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
      return {
        fileId: result.fileId,
        filePath: result.filePath,
      };
    } catch (error: any) {
      toast.error("Image upload failed: " + error.message);
      throw error;
    }
  };

  const handleSubmit = async (data: T) => {
    try {
      setLoading(true);

      let imageKitData: { fileId: string; filePath: string } | undefined;

      // Upload image if selected
      if (selectedFile) {
        imageKitData = await uploadImageToImageKit(selectedFile);
      }

      await onSubmit(data, imageKitData);
      toast.success("Saved successfully!");
      if (autoReset) {
        form.reset();
        setImagePreview("");
        setSelectedFile(null);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
    setSelectedFile(null);
  };

  return {
    ...form,
    loading,
    imagePreview,
    selectedFile,
    handleFileChange,
    clearImage,
    uploadFile: uploadImageToImageKit,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
