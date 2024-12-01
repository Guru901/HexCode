import { Hono } from "hono";
import { appRouter } from "./trpc.ts";
import { trpcServer } from "@hono/trpc-server";

const app = new Hono();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

Deno.serve(
  {
    port: 8080,
  },
  app.fetch
);
