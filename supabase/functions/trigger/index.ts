import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { tasks } from "npm:@trigger.dev/sdk@latest/v3";

import type { helloWorldTask } from "../../../packages/jobs/src/trigger/example.ts";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  // const payload = await req.json();
  await tasks.trigger<typeof helloWorldTask>("hello-world", "Jack");

  return new Response("ok");
});
