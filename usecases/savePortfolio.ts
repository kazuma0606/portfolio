import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export default async function createPortfolio(userId: Id<"portfolios">, name: string, bio: string, skills: string[]) {
    // return useQuery(api.portfolios.getPortfolio, { userId: Id as Id<"portfolios"> });
    const execute = useMutation(api.portfolios.createPortfolio);
    const portfolioId = await execute({ userId, name, bio, skills });

    console.log(`New portfolio created with ID: ${portfolioId}`);
    // navigate(`/portfolio/${portfolioId}`); // 新しく作成されたportfolioページに遷移
}