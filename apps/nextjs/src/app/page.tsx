import { HydrateClient } from "../trpc/server";
import { Client } from "./_components/client";

export default function Home() {
  return (
    <HydrateClient>
      <Client />
    </HydrateClient>
  );
}
