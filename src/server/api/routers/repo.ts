import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { repos } from "@/server/db/schema";

export const repoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      owner: z.string().min(1),
      name: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const [repo] = await ctx.db.insert(repos).values({
        owner: input.owner,
        name: input.name,
      }).returning();
      return repo;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const repos = await ctx.db.query.repos.findMany();
    return repos;
  }),
});
