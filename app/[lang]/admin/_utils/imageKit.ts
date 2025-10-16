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
      console.error(
        "Failed to delete image from ImageKit",
        await response.text(),
      );
      throw new Error("Failed to delete image");
    }

    const result = await response.json();
    console.log("Image deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image from ImageKit:", error);
    throw error; // Re-throw so callers can handle it
  }
};
