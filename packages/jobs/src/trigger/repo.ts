import { logger, task } from "@trigger.dev/sdk/v3";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export const repoTask = task({
  id: "repo",
  maxDuration: 300,
  run: async (payload: { repo: string, owner: string }, { ctx }) => {

    logger.log("Fetching repo README", { payload, ctx });

    const response = await octokit.repos.getReadme({
      owner: payload.owner,
      repo: payload.repo,
    });
  
    const readme = Buffer.from(response.data.content, "base64").toString("utf-8");
  
    logger.log("README fetched", { readme, ctx });

    return {
      readme,
    }
  },
});