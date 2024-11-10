import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { tasks } from "npm:@trigger.dev/sdk@latest/v3";

import type { repoTask } from "../../../packages/jobs/src/trigger/repo.ts";

Deno.serve(async (req) => {
  const payload = await req.json();
  await tasks.trigger<typeof repoTask>("repo", {
    owner: payload.record.owner,
    repo: payload.record.name,
  });

  return new Response("ok");
});
