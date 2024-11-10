import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { repos } from "@devlab/db/schema";
import { tasks } from "@trigger.dev/sdk/v3";
import type { helloWorldTask } from "@devlab/jobs";

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

      await tasks.trigger<typeof helloWorldTask>(
        "hello-world",
        "James",
      );
      
      return repo;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const repos = await ctx.db.query.repos.findMany();
    return repos;
  }),
});
