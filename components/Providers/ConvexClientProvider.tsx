"use client";

import { ConvexQueryCacheProvider } from "convex-helpers/react/cache/provider";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProvider client={convex}>
      <ConvexQueryCacheProvider>{children}</ConvexQueryCacheProvider>
    </ConvexProvider>
  );
}

export function toastConvexError(
  err: unknown,
  onFieldErrors?: (fields: string[]) => void,
) {
  try {
    const anyErr = err as any;
    const errorFields: string[] = [];

    // Map technical field names to user-friendly names
    const fieldNameMap: Record<string, string> = {
      imageKitId: "Image",
      startAt: "Start time",
      doorsAt: "Doors time",
      musicGenres: "Music genres",
      ticketUrl: "Ticket URL",
      minAge: "Minimum age",
      dressCode: "Dress code",
      // clubInfo.socialMedia fields kept for club info form only
      "socialMedia.facebook": "Facebook URL",
      "socialMedia.instagram": "Instagram URL",
      "socialMedia.twitter": "Twitter URL",
      "socialMedia.youtube": "YouTube URL",
      "socialMedia.tiktok": "TikTok URL",
      "socialMedia.twitch": "Twitch URL",
      "socialMedia.discord": "Discord URL",
      "socialMedia.telegram": "Telegram URL",
      title: "Title",
      date: "Date",
      name: "Name",
      phone: "Phone",
      email: "Email",
      // summary removed from News schema
      body: "Content",
      question: "Question",
      answer: "Answer",
      role: "Role",
      priceFrom: "Price From",
      currency: "Currency",
      description: "Description",
    };

    const getUserFriendlyFieldName = (path: string) => {
      return fieldNameMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
    };

    let message = "Something went wrong";

    if (anyErr instanceof ConvexError) {
      if (typeof anyErr.data === "string") {
        message = anyErr.data;
      } else if (
        anyErr.data?.issues &&
        Array.isArray(anyErr.data.issues) &&
        anyErr.data.issues.length > 0
      ) {
        // Collect error fields and show all validation errors with user-friendly field names
        const errors = anyErr.data.issues.map((issue: any) => {
          const fieldPath =
            Array.isArray(issue.path) && issue.path.length > 0
              ? issue.path.join(".")
              : "field";

          // Add to error fields for highlighting
          errorFields.push(fieldPath);

          const friendlyName = getUserFriendlyFieldName(fieldPath);
          return `${friendlyName}: ${issue.message}`;
        });
        message = errors.join(", ");
      } else if (typeof anyErr.data?.message === "string") {
        message = anyErr.data.message;
      }
    } else if (typeof anyErr?.message === "string") {
      message = anyErr.message;

      // Clean up ArgumentValidationError messages
      if (message.includes("Object is missing the required field")) {
        const match = message.match(
          /Object is missing the required field `([^`]+)`/,
        );
        if (match) {
          const fieldPath = match[1];
          errorFields.push(fieldPath);
          const friendlyName = getUserFriendlyFieldName(fieldPath);
          message = `${friendlyName} is required`;
        }
      } else if (message.includes("Consider wrapping the field validator")) {
        message = message.split(".").slice(0, 1).join(".");
      }
    }

    // Call the callback with error fields if provided
    if (onFieldErrors && errorFields.length > 0) {
      onFieldErrors(errorFields);
    }

    toast.error(message);
  } catch {
    toast.error("Something went wrong");
  }
}
