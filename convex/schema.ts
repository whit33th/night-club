import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const socialMedia = v.object({
  facebook: v.optional(v.string()),
  instagram: v.optional(v.string()),
  twitter: v.optional(v.string()),
  youtube: v.optional(v.string()),
  tiktok: v.optional(v.string()),
  twitch: v.optional(v.string()),
  discord: v.optional(v.string()),
  telegram: v.optional(v.string()),
});
export default defineSchema({
  // Events (program)
  events: defineTable({
    title: v.string(),
    date: v.string(), // ISO YYYY-MM-DD
    startAt: v.string(), // HH:mm
    doorsAt: v.optional(v.string()), // HH:mm
    // Primary storage in ImageKit
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()), // Added filePath from ImageKit
    artists: v.optional(
      v.array(
        v.object({
          index: v.optional(v.number()),
          name: v.string(),
          imageKitId: v.optional(v.string()),
          imageKitPath: v.optional(v.string()), // Added filePath for artist images
          role: v.optional(v.string()),
        }),
      ),
    ),
    musicGenres: v.optional(v.array(v.string())),
    priceFrom: v.optional(v.number()),
    minAge: v.optional(v.number()),
    dressCode: v.optional(v.string()),
    currency: v.optional(v.string()),
    ticketUrl: v.optional(v.string()),
    description: v.optional(v.string()),
  }).index("by_date", ["date"]),

  // News posts
  news: defineTable({
    title: v.string(),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()), // Added filePath from ImageKit
    body: v.string(),
  }),

  // Gallery assets
  galleryImages: defineTable({
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()), // Added filePath from ImageKit
  }),

  // Club info (singleton)
  clubInfo: defineTable({
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    socialMedia: v.optional(socialMedia),
  }),

  // Residents (DJs)
  residents: defineTable({
    name: v.string(),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()), // Added filePath from ImageKit
    role: v.optional(v.string()),
  }),

  // Frequently Asked Questions
  faqs: defineTable({
    question: v.string(),
    answer: v.string(),
  }),
});
