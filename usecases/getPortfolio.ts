import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function getPortfolio(Id: string) {
    return useQuery(api.portfolios.getPortfolio, { userId: Id as Id<"portfolios"> });
}