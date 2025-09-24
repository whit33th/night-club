import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function getCurrentWarsawTime(): Date {
  const warsawTime = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return new Date(warsawTime.replace(",", ""));
}

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
    const rows = await ctx.db
      .query("events")
      .withIndex("by_date")
      .order("desc")
      .collect();

    return rows.map((r) => ({
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

export const listUpcomingEvents = query({
  args: { limit: v.optional(v.number()) },
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
  handler: async (ctx, args) => {
    const currentWarsawDate = getCurrentWarsawTime();

    const rows = await ctx.db
      .query("events")
      .withIndex("by_date")
      .order("asc")
      .collect();

    const upcomingEvents = rows.filter((r) => {
      const eventDateTime = new Date(`${r.date}T${r.startAt}`);
      return eventDateTime >= currentWarsawDate;
    });

    return args.limit ? upcomingEvents.slice(0, args.limit) : upcomingEvents;
  },
});

export const listPastEvents = query({
  args: { limit: v.optional(v.number()) },
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
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("events")
      .withIndex("by_date")
      .order("asc")
      .collect();

    const currentWarsawDate = getCurrentWarsawTime();

    const pastEvents = rows.filter((r) => {
      const eventDateTime = new Date(`${r.date}T${r.startAt}`);
      return eventDateTime < currentWarsawDate;
    });

    return args.limit ? pastEvents.slice(0, args.limit) : pastEvents;
  },
});

export const paginateEvents = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_date")
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
    const r = await ctx.db.get(args.id);
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
    await ctx.db.patch(args.id, args.patch);
    const updated = await ctx.db.get(args.id);
    return updated;
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
    return await ctx.db.get(args.id);
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
    await ctx.db.patch(args.id, args.patch);
    const updated = await ctx.db.get(args.id);
    return updated;
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
    const r = await ctx.db.get(args.id);
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
    return await ctx.db.get(args.id);
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

    return rows.map((r) => ({
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
    const patch = { ...args.patch };
    if (patch.name !== undefined) {
      const trimmed = patch.name.trim();
      patch.name = trimmed;
    }
    if (patch.role !== undefined) {
      const t = patch.role.trim();
      patch.role = t.length ? t : undefined;
    }
    await ctx.db.patch(args.id, patch);
    const updated = await ctx.db.get(args.id);

    return updated;
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
    await ctx.db.patch(args.id, args.patch);
    const updated = await ctx.db.get(args.id);
    return updated;
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
