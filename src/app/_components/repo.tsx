"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestRepo() {
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
      {repos ? (
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="text"
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createRepo.isPending}
        >
          {createRepo.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
