import type { helloWorldTask } from "@devlab/jobs";
import { NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk/v3";

export async function GET() {
  const handle = await tasks.trigger<typeof helloWorldTask>(
    "hello-world",
    "James",
  );

  return NextResponse.json(handle);
}
