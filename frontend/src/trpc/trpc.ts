import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { SaveThingsRouter, EnvRouter } from "../../../shared/trpcTypes";

export const saveThingsClient = createTRPCProxyClient<SaveThingsRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8787/trpc",
    }),
  ],
});
