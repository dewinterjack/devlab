import { LatestRepo } from "@/app/_components/repo";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const repos = await api.repo.getAll();

  void api.repo.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Dev <span className="text-[hsl(280,100%,70%)]">Lab</span>
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {repos
                ? repos.map((repo) => `${repo.owner}/${repo.name}`).join(", ")
                : "Loading tRPC query..."}
            </p>
          </div>

          <LatestRepo />
        </div>
      </main>
    </HydrateClient>
  );
}
