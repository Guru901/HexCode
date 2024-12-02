import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc.js";

const app = new Hono();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
