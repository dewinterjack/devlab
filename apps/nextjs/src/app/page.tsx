import { api, HydrateClient } from "../trpc/server";
import { LatestRepo } from "./_components/repo";

export default async function Home() {
  const repos = await api.repo.getAll();

  void api.repo.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="dark:bg-secondaryBlack inset-0 flex min-h-[100dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
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
