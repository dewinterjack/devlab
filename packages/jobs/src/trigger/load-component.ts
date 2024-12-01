import { Octokit } from "@octokit/rest";
import { logger, tags, task } from "@trigger.dev/sdk/v3";

type LoggerAPI = typeof logger;

export const loadComponentTask = task({
  id: "load",
  maxDuration: 300,
  run: async (payload: { component: string }, { ctx }) => {
    await tags.add("component");

    const config = {
      owner: "dewinterjack",
      repo: "components",
      newBranchName: "new-component-demo",
      filePath: "lib/components/demo.tsx",
      fileContent: payload.component,
      commitMessage: "Add new component",
      token: process.env.GITHUB_TOKEN!,
    };

    const result = await createBranchAndCommit(config, logger);

    return {
      branch: result.branchName,
      commit: result.commitSha,
    };
  },
});

async function createBranchAndCommit(
  {
    owner,
    repo,
    baseBranch = "main",
    newBranchName,
    filePath,
    fileContent,
    commitMessage,
    token,
  }: {
    owner: string;
    repo: string;
    baseBranch?: string;
    newBranchName: string;
    filePath: string;
    fileContent: string;
    commitMessage: string;
    token: string;
  },
  logger: LoggerAPI,
) {
  const octokit = new Octokit({
    auth: token,
  });

  try {
    const { data: baseRef } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    });
    const baseSha = baseRef.object.sha;

    await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranchName}`,
      sha: baseSha,
    });
    logger.log(`Created new branch: ${newBranchName}`);

    const { data: blob } = await octokit.git.createBlob({
      owner,
      repo,
      content: Buffer.from(fileContent).toString("base64"),
      encoding: "base64",
    });

    const { data: newTree } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseSha,
      tree: [
        {
          path: filePath,
          mode: "100644",
          type: "blob",
          sha: blob.sha,
        },
      ],
    });

    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: commitMessage,
      tree: newTree.sha,
      parents: [baseSha],
    });

    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${newBranchName}`,
      sha: newCommit.sha,
    });

    logger.log(`Successfully created commit: ${newCommit.sha}`);
    return {
      branchName: newBranchName,
      commitSha: newCommit.sha,
    };
  } catch (error) {
    logger.error("Error:", error.message);
    throw error;
  }
}
