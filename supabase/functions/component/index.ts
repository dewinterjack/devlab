import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { tasks } from "npm:@trigger.dev/sdk@latest/v3";

import type { loadComponentTask } from "../../../packages/jobs/src/trigger/load-component.ts";

Deno.serve(async (req) => {
  const payload = await req.json();
  await tasks.trigger<typeof loadComponentTask>("load", {
    component: payload.component,
  });

  return new Response("ok");
});
