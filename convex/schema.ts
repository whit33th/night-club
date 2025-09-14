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
  events: defineTable({
    title: v.string(),
    date: v.string(),
    startAt: v.string(),
    doorsAt: v.optional(v.string()),

    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    artists: v.optional(
      v.array(
        v.object({
          index: v.optional(v.number()),
          name: v.string(),
          imageKitId: v.optional(v.string()),
          imageKitPath: v.optional(v.string()),
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

  news: defineTable({
    title: v.string(),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    body: v.string(),
  }),

  galleryImages: defineTable({
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
  }),

  clubInfo: defineTable({
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    socialMedia: v.optional(socialMedia),
  }),

  residents: defineTable({
    name: v.string(),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    role: v.optional(v.string()),
  }),

  faqs: defineTable({
    question: v.string(),
    answer: v.string(),
  }),
});
