import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { SaveThingsRouter, EnvRouter } from "../../../shared/trpcTypes";

export const saveThingsClient = createTRPCClient<SaveThingsRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8787/trpc",
    }),
  ],
});

export const envServiceClient = createTRPCClient<EnvRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:6767/trpc",
    }),
  ],
});
