import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export async function createProject(portfolioId: Id<"portfolios">, title: string, description: string, imageUrl?: string | null, projectUrl?: string | null) {
    // return useQuery(api.portfolios.getPortfolio, { userId: Id as Id<"portfolios"> });
    const execute = useMutation(api.portfolios.createProject);
    imageUrl = imageUrl!
    projectUrl = projectUrl!
    const projectId = await execute({ portfolioId, title, description, imageUrl, projectUrl });

    console.log(`New project created with ID: ${projectId}`);
    // navigate(`/portfolio/${portfolioId}`); // 新しく作成されたportfolioページに遷移
}