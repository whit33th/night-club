export const deleteImageFromImageKit = async (imageKitId: string) => {
  try {
    const response = await fetch("/api/imagekit/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: [imageKitId] }),
    });

    if (!response.ok) {
      console.error("Failed to delete image from ImageKit");
    }
  } catch (error) {
    console.error("Error deleting image from ImageKit:", error);
  }
};
