"use client";

import { useState } from "react";
import { useDevlabRuns } from "@/hooks/use-devlab-runs";
import { Button } from "@devlab/ui/button";
import { Input } from "@devlab/ui/input";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { api } from "../../trpc/react";

export function Repo() {
  const { repoRuns } = useDevlabRuns();

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
    <div className="flex w-full flex-col gap-4">
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
          <div key={run.id}>
            {run.output?.readme ? (
              <ReactMarkdown
                children={run.output.readme}
                components={{
                  h1: ({ children }) => {
                    return <h1 className="text-2xl font-bold">{children}</h1>;
                  },
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className ?? "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, "")}
                        // @ts-expect-error dark is a valid style
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        style={dark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, "")}
                        // @ts-expect-error dark is a valid style
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        style={dark}
                        PreTag="div"
                        {...props}
                      />
                    );
                  },
                }}
              />
            ) : (
              <p className="text-gray-500">No readme found</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
