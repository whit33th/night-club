import Home from "./inner";
import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function ServerPage() {
  const preloaded = await preloadQuery(api.myFunctions.listNumbers, {
    count: 3,
  });

  const data = preloadedQueryResult(preloaded);

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-8">
      <h1 className="text-center text-4xl font-bold">Convex + Next.js</h1>
      <div className="flex flex-col gap-4 rounded-md bg-slate-200 p-4 dark:bg-slate-800">
        <h2 className="text-xl font-bold">Non-reactive server-loaded data</h2>
        <code>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      </div>
      <Home preloaded={preloaded} />
    </main>
  );
}
