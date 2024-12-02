import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc";
import { inferRouterInputs } from "@trpc/server";

const app = new Hono();

app.all(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

export default app;
export type AppRouter = inferRouterInputs<typeof appRouter>;
