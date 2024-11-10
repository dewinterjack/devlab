import type { helloWorldTask, repoTask } from "@devlab/jobs";
import type { AnyTask, TaskRunShape } from "@trigger.dev/sdk/v3";
import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks";

type HelloWorldTask = typeof helloWorldTask;
type RepoTask = typeof repoTask;

function isHelloWorldRun(
  run: TaskRunShape<AnyTask>,
): run is TaskRunShape<HelloWorldTask> {
  return run.taskIdentifier === "hello-world";
}

function isRepoRun(run: TaskRunShape<AnyTask>): run is TaskRunShape<RepoTask> {
  return run.taskIdentifier === "repo";
}

export function useDevlabRuns() {
  const { runs, error } = useRealtimeRunsWithTag<
    typeof helloWorldTask | typeof repoTask
  >("devlab");

  const helloWorldRuns = runs.filter(isHelloWorldRun);
  const repoRuns = runs.filter(isRepoRun);

  return {
    helloWorldRuns,
    repoRuns,
    error,
  };
}
