import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { tasks } from "npm:@trigger.dev/sdk@latest/v3";

import type { commitReviewTask } from "../../../packages/jobs/src/trigger/commit-review.ts";

Deno.serve(async (req) => {
  const payload = await req.json();
  await tasks.trigger<typeof commitReviewTask>("review", {
    owner: payload.record.owner,
    repo: payload.record.name,
    commit_sha: payload.record.commit_sha,
  });

  return new Response("ok");
});
