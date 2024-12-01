import { Octokit } from "@octokit/rest";
import { logger, tags, task } from "@trigger.dev/sdk/v3";

const octokit = new Octokit();

export const commitReviewTask = task({
  id: "review",
  maxDuration: 300,
  run: async (
    payload: { repo: string; owner: string; commitHash: string },
    { ctx },
  ) => {
    logger.log("Retrieving commit", { payload, ctx });

    const response = await octokit.repos.getCommit({
      owner: payload.owner,
      repo: payload.repo,
      ref: payload.commitHash,
      mediaType: {
        format: "diff",
      },
    });

    logger.log("Diff: ", { diff: response.data });

    await tags.add("devlab");

    return {
      commit: response.data,
    };
  },
});
