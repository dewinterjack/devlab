import { logger, tags, task, wait } from "@trigger.dev/sdk/v3";

export const helloWorldTask = task({
  id: "hello-world",
  maxDuration: 300,
  run: async (payload: string, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    await wait.for({ seconds: 3 });
    await tags.add("devlab");

    return {
      message: "Hello, world!",
    };
  },
});
