import { HydrateClient } from "../trpc/server";
import { Repo } from "./_components/repo";
import { TriggerExample } from "./_components/trigger-example";

export default function Home() {
  return (
    <HydrateClient>
      <main className="inset-0 flex min-h-[100dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-secondaryBlack">
        <div className="container flex max-w-screen-sm flex-col items-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Dev <span className="text-[hsl(280,100%,70%)]">Lab</span>
          </h1>

          <Repo />
          <TriggerExample />
        </div>
      </main>
    </HydrateClient>
  );
}
