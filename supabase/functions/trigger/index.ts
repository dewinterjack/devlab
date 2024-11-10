import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { tasks } from "npm:@trigger.dev/sdk@latest/v3";

import type { helloWorldTask } from "../../../packages/jobs/src/trigger/example.ts";

Deno.serve(async (req) => {
  const payload = await req.json();
  const repoFullName = payload.record.owner + "/" + payload.record.name;
  await tasks.trigger<typeof helloWorldTask>("hello-world", repoFullName);

  return new Response("ok");
});
