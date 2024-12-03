import { AppRouter as _SaveThingsRouter } from "../save-things-service/src/trpc";
import { AppRouter as _EnvRouter } from "../env-service/src/trpc";

export type EnvRouter = _EnvRouter;
export type SaveThingsRouter = _SaveThingsRouter;
