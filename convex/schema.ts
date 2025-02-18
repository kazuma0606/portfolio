import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    portfolios: defineTable({
        userId: v.string(), // ここを変更
        name: v.string(),
        bio: v.string(),
        skills: v.array(v.string()),
    }).index("by_user", ["userId"]),
    projects: defineTable({
        portfolioId: v.id("portfolios"),
        title: v.string(),
        description: v.string(),
        imageUrl: v.optional(v.string()),
        projectUrl: v.optional(v.string()),
    }).index("by_portfolio", ["portfolioId"]),
});