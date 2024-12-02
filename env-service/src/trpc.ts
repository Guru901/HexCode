import { initTRPC } from "@trpc/server";

const t = initTRPC.context<{}>().create();

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return { greeting: "Hello World" };
  }),
});
