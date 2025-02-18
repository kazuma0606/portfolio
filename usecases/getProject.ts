import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function getProjects(Id: string) {
    return useQuery(api.portfolios.getProjrcts, { portfolioId: Id as Id<"portfolios"> });
}