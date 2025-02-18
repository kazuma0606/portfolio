import { query, mutation } from "../convex/_generated/server";
import { v } from "convex/values";

export const getPortfolio = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const portfolio = await ctx.db
            .query("portfolios")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .unique();
        return portfolio;
    },
});

export const createPortfolio = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        bio: v.string(),
        skills: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const portfolioId = await ctx.db.insert("portfolios", {
            userId: args.userId,
            name: args.name,
            bio: args.bio,
            skills: args.skills,
        });
        return portfolioId;
    },
});

export const getProjrcts = query({
    args: { portfolioId: v.id("portfolios") },
    handler: async (ctx, args) => {
        const projrcts = await ctx.db
            .query("projects")
            .withIndex("by_portfolio", (q) => q.eq("portfolioId", args.portfolioId))
            .unique();
        return projrcts;
    },
});

export const createProject = mutation({
    args: {
        portfolioId: v.id("portfolios"),
        title: v.string(),
        description: v.string(),
        imageUrl: v.optional(v.string()),
        projectUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const projectId = await ctx.db.insert("projects", {
            portfolioId: args.portfolioId,
            title: args.title,
            description: args.description,
            imageUrl: args.imageUrl,
            projectUrl: args.projectUrl,
        });
        return projectId;
    },
});
// const portfolio = await ctx.db
//   .query("portfolios")
//   .withIndex("by_user", (q) => q.eq("userId", userId))
//   .unique();