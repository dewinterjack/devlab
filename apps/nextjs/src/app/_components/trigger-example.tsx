"use client";

import { Button } from "@devlab/ui/button";

import { api } from "../../trpc/react";

export function TriggerExample() {
  const trigger = api.trigger.example.useMutation();

  return (
    <div className="w-full max-w-xs">
      <Button onClick={() => trigger.mutate()} disabled={trigger.isPending}>
        {trigger.isPending ? "Triggering..." : "Trigger"}
      </Button>
    </div>
  );
}
