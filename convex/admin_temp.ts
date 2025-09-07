import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import schema from "./schema";
// All Zod-based validations removed. Runtime validation is limited to Convex validators above.

// Removed Convex storage helpers; ImageKit is the sole storage

// ==========================
// Events CRUD
// ==========================
// address removed from events schema

const artistValidator = v.object({
  index: v.optional(v.number()),
  name: v.string(),
  imageKitId: v.optional(v.string()),
  imageKitPath: v.optional(v.string()),
  role: v.optional(v.string()),
});

export const listEvents = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("events"),
      _creationTime: v.number(),
      title: v.string(),
      date: v.string(),
      startAt: v.string(),
      doorsAt: v.optional(v.string()),
      imageKitId: v.string(),
      imageKitPath: v.optional(v.string()),
      artists: v.optional(v.array(artistValidator)),
      musicGenres: v.optional(v.array(v.string())),
      priceFrom: v.optional(v.number()),
      minAge: v.optional(v.number()),
      dressCode: v.optional(v.string()),
      currency: v.optional(v.string()),
      ticketUrl: v.optional(v.string()),
      description: v.optional(v.string()),
    }),
  ),
  handler: async (ctx) => {
    const rows = await ctx.db.query("events").order("desc").collect();
    // Project to allowed fields only (omit legacy fields like address)
    return rows.map((r: any) => ({
      _id: r._id,
      _creationTime: r._creationTime,
      title: r.title,
      date: r.date,
      startAt: r.startAt,
      doorsAt: r.doorsAt,
      imageKitId: r.imageKitId,
      imageKitPath: r.imageKitPath,
      artists: r.artists,
      musicGenres: r.musicGenres,
      priceFrom: r.priceFrom,
      minAge: r.minAge,
      dressCode: r.dressCode,
      currency: r.currency,
      ticketUrl: r.ticketUrl,
      description: r.description,
    }));
  },
});

export const paginateEvents = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getEvent = query({
  args: { id: v.optional(v.id("events")) },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("events"),
      _creationTime: v.number(),
      title: v.string(),
      date: v.string(),
      startAt: v.string(),
      doorsAt: v.optional(v.string()),
      imageKitId: v.string(),
      imageKitPath: v.optional(v.string()),
      artists: v.optional(v.array(artistValidator)),
      musicGenres: v.optional(v.array(v.string())),
      priceFrom: v.optional(v.number()),
      minAge: v.optional(v.number()),
      dressCode: v.optional(v.string()),
      currency: v.optional(v.string()),
      ticketUrl: v.optional(v.string()),
      description: v.optional(v.string()),
    }),
  ),
  handler: async (ctx, args) => {
    if (!args.id) return null;
    const r: any = await ctx.db.get(args.id);
    if (!r) return null;
    return {
      _id: r._id,
      _creationTime: r._creationTime,
      title: r.title,
      date: r.date,
      startAt: r.startAt,
      doorsAt: r.doorsAt,
      imageKitId: r.imageKitId,
      imageKitPath: r.imageKitPath,
      artists: r.artists,
      musicGenres: r.musicGenres,
      priceFrom: r.priceFrom,
      minAge: r.minAge,
      dressCode: r.dressCode,
      currency: r.currency,
      ticketUrl: r.ticketUrl,
      description: r.description,
    };
  },
});

export const createEvent = mutation({
  args: v.object({
    title: v.string(),
    date: v.string(),
    startAt: v.string(),
    doorsAt: v.optional(v.string()),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    artists: v.optional(v.array(artistValidator)),
    musicGenres: v.optional(v.array(v.string())),
    priceFrom: v.optional(v.number()),
    minAge: v.optional(v.number()),
    dressCode: v.optional(v.string()),
    currency: v.optional(v.string()),
    ticketUrl: v.optional(v.string()),
    description: v.optional(v.string()),
  }),
  returns: v.id("events"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    patch: v.object({
      title: v.optional(v.string()),
      date: v.optional(v.string()),
      startAt: v.optional(v.string()),
      doorsAt: v.optional(v.string()),
      imageKitId: v.optional(v.string()),
      imageKitPath: v.optional(v.string()),
      artists: v.optional(v.array(artistValidator)),
      musicGenres: v.optional(v.array(v.string())),
      priceFrom: v.optional(v.number()),
      minAge: v.optional(v.number()),
      dressCode: v.optional(v.string()),
      currency: v.optional(v.string()),
      ticketUrl: v.optional(v.string()),
      description: v.optional(v.string()),
    }),
  },
  returns: v.object({
    _id: v.id("events"),
    _creationTime: v.number(),
    title: v.string(),
    date: v.string(),
    startAt: v.string(),
    doorsAt: v.optional(v.string()),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    artists: v.optional(v.array(artistValidator)),
    musicGenres: v.optional(v.array(v.string())),
    priceFrom: v.optional(v.number()),
    minAge: v.optional(v.number()),
    dressCode: v.optional(v.string()),
    currency: v.optional(v.string()),
    ticketUrl: v.optional(v.string()),
    description: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.patch);
    const updated: any = await ctx.db.get(args.id);
    // Project to allowed fields only (omit legacy fields like address)
    return {
      _id: updated._id,
      _creationTime: updated._creationTime,
      title: updated.title,
      date: updated.date,
      startAt: updated.startAt,
      doorsAt: updated.doorsAt,
      imageKitId: updated.imageKitId,
      imageKitPath: updated.imageKitPath,
      artists: updated.artists,
      musicGenres: updated.musicGenres,
      priceFrom: updated.priceFrom,
      minAge: updated.minAge,
      dressCode: updated.dressCode,
      currency: updated.currency,
      ticketUrl: updated.ticketUrl,
      description: updated.description,
    };
  },
});

export const deleteEvent = mutation({
  args: { id: v.id("events") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

// ==========================
// News CRUD
// ==========================
export const listNews = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("news"),
      _creationTime: v.number(),
      title: v.string(),
      imageKitId: v.string(),
      imageKitPath: v.optional(v.string()),
      body: v.string(),
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("news").order("desc").collect();
  },
});

export const paginateNews = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("news")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getNews = query({
  args: { id: v.optional(v.id("news")) },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("news"),
      _creationTime: v.number(),
      title: v.string(),
      imageKitId: v.string(),
      imageKitPath: v.optional(v.string()),
      body: v.string(),
    }),
  ),
  handler: async (ctx, args) => {
    if (!args.id) return null;
    return (await ctx.db.get(args.id)) as any;
  },
});

export const createNews = mutation({
  args: {
    title: v.string(),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    body: v.string(),
  },
  returns: v.id("news"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("news", args);
  },
});

export const updateNews = mutation({
  args: {
    id: v.id("news"),
    patch: v.object({
      title: v.optional(v.string()),
      imageKitId: v.optional(v.string()),
      imageKitPath: v.optional(v.string()),
      body: v.optional(v.string()),
    }),
  },
  returns: v.object({
    _id: v.id("news"),
    _creationTime: v.number(),
    title: v.string(),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    body: v.string(),
  }),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.patch);
    const updated = await ctx.db.get(args.id);
    return updated as any;
  },
});

export const deleteNews = mutation({
  args: { id: v.id("news") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

// ==========================
// Gallery CRUD
// ==========================
export const listGallery = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("galleryImages"),
      _creationTime: v.number(),
      imageKitId: v.string(),
      imageKitPath: v.optional(v.string()),
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("galleryImages").order("desc").collect();
  },
});

export const paginateGallery = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("galleryImages")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const paginateResidents = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("residents")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getResident = query({
  args: { id: v.optional(v.id("residents")) },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("residents"),
      _creationTime: v.number(),
      name: v.string(),
      imageKitId: v.string(),
      imageKitPath: v.optional(v.string()),
      role: v.optional(v.string()),
    }),
  ),
  handler: async (ctx, args) => {
    if (!args.id) return null;
    const r: any = await ctx.db.get(args.id);
    if (!r) return null;
    return {
      _id: r._id,
      _creationTime: r._creationTime,
      name: r.name,
      imageKitId: r.imageKitId,
      imageKitPath: r.imageKitPath,
      role: r.role,
    };
  },
});

export const paginateFaqs = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("faqs")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getFaq = query({
  args: { id: v.optional(v.id("faqs")) },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("faqs"),
      _creationTime: v.number(),
      question: v.string(),
      answer: v.string(),
    }),
  ),
  handler: async (ctx, args) => {
    if (!args.id) return null;
    return (await ctx.db.get(args.id)) as any;
  },
});

export const addGalleryImage = mutation({
  args: {
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
  },
  returns: v.id("galleryImages"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("galleryImages", {
      imageKitId: args.imageKitId,
      imageKitPath: args.imageKitPath,
    });
  },
});

export const deleteGalleryImage = mutation({
  args: { id: v.id("galleryImages") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

// ==========================
// Club info (singleton)
// ==========================
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

export const getClubInfo = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("clubInfo"),
      _creationTime: v.number(),
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      socialMedia: v.optional(socialMedia),
    }),
  ),
  handler: async (ctx) => {
    const row = await ctx.db.query("clubInfo").first();
    return row ?? null;
  },
});

export const upsertClubInfo = mutation({
  args: {
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    socialMedia: v.optional(socialMedia),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("clubInfo").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("clubInfo", args);
    }
    return null;
  },
});

// ==========================
// Residents CRUD
// ==========================
export const listResidents = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("residents"),
      _creationTime: v.number(),
      name: v.string(),
      imageKitId: v.string(),
      imageKitPath: v.optional(v.string()),
      role: v.optional(v.string()),
    }),
  ),
  handler: async (ctx) => {
    const rows = await ctx.db.query("residents").order("desc").collect();
    // Project only allowed fields (omit nameLower, etc.)
    return rows.map((r: any) => ({
      _id: r._id,
      _creationTime: r._creationTime,
      name: r.name,
      imageKitId: r.imageKitId,
      imageKitPath: r.imageKitPath,
      role: r.role,
    }));
  },
});

export const createResident = mutation({
  args: {
    name: v.string(),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    role: v.optional(v.string()),
  },
  returns: v.id("residents"),
  handler: async (ctx, args) => {
    if (!args.imageKitId || args.imageKitId.trim().length === 0) {
      throw new Error("Image is required");
    }
    return await ctx.db.insert("residents", {
      ...args,
      name: args.name.trim(),
      role: args.role?.trim() || undefined,
    });
  },
});

export const updateResident = mutation({
  args: {
    id: v.id("residents"),
    patch: v.object({
      name: v.optional(v.string()),
      imageKitId: v.optional(v.string()),
      imageKitPath: v.optional(v.string()),
      role: v.optional(v.string()),
    }),
  },
  returns: v.object({
    _id: v.id("residents"),
    _creationTime: v.number(),
    name: v.string(),
    imageKitId: v.string(),
    imageKitPath: v.optional(v.string()),
    role: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    const patch: any = { ...args.patch };
    if (patch.name !== undefined) {
      const trimmed = patch.name.trim();
      patch.name = trimmed;
    }
    if (patch.role !== undefined) {
      const t = patch.role.trim();
      patch.role = t.length ? t : undefined;
    }
    await ctx.db.patch(args.id, patch);
    const updated: any = await ctx.db.get(args.id);
    // Project to allowed fields only (omit nameLower)
    return {
      _id: updated._id,
      _creationTime: updated._creationTime,
      name: updated.name,
      imageKitId: updated.imageKitId,
      imageKitPath: updated.imageKitPath,
      role: updated.role,
    };
  },
});

export const deleteResident = mutation({
  args: { id: v.id("residents") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

// ==========================
// FAQs CRUD
// ==========================
export const listFaqs = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("faqs"),
      _creationTime: v.number(),
      question: v.string(),
      answer: v.string(),
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("faqs").order("desc").collect();
  },
});

export const createFaq = mutation({
  args: { question: v.string(), answer: v.string() },
  returns: v.id("faqs"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("faqs", args);
  },
});

export const updateFaq = mutation({
  args: {
    id: v.id("faqs"),
    patch: v.object({
      question: v.optional(v.string()),
      answer: v.optional(v.string()),
    }),
  },
  returns: v.object({
    _id: v.id("faqs"),
    _creationTime: v.number(),
    question: v.string(),
    answer: v.string(),
  }),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.patch);
    const updated = await ctx.db.get(args.id);
    return updated as any;
  },
});

export const deleteFaq = mutation({
  args: { id: v.id("faqs") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});
