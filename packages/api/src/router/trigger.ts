import { createTRPCRouter, publicProcedure } from "../trpc";
import { tasks } from "@trigger.dev/sdk/v3";
import type { helloWorldTask } from "@devlab/jobs";

export const triggerRouter = createTRPCRouter({
  example: publicProcedure
    .mutation(async () => {
      await tasks.trigger<typeof helloWorldTask>(
        "hello-world",
        "James",
      );
      
      return "Triggered";
    }),
});
