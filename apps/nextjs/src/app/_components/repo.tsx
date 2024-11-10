"use client";

import { useState } from "react";
import { useDevlabRuns } from "@/hooks/use-devlab-runs";
import { Button } from "@devlab/ui/button";
import { Input } from "@devlab/ui/input";

import { api } from "../../trpc/react";

export function LatestRepo() {
  const { repoRuns } = useDevlabRuns();

  const [repos] = api.repo.getAll.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const createRepo = api.repo.create.useMutation({
    onSuccess: async () => {
      await utils.repo.invalidate();
      setName("");
      setOwner("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {repos.length > 0 ? (
        <p className="truncate">
          Your most recent repos:{" "}
          {repos.map((repo) => `${repo.owner}/${repo.name}`).join(", ")}
        </p>
      ) : (
        <p>You have no repos yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRepo.mutate({ owner, name });
        }}
        className="flex flex-col gap-2"
      >
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <Button type="submit" disabled={createRepo.isPending}>
          {createRepo.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <div>
        {repoRuns.map((run) => (
          <div key={run.id}>Readme: {run.output?.readme}</div>
        ))}
      </div>
    </div>
  );
}
