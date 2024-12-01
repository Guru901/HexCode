import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(Deno.env.get("DATABASE_URL")!);

export const db = drizzle({ client: sql });
