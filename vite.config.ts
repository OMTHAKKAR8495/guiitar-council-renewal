// Configuration includes TanStack Start, React, Tailwind CSS, TypeScript paths, and Nitro SSR.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const NEON_DB_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_6xstyEme5PMN@ep-twilight-brook-b4c0f74u-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export default defineConfig({
  define: {
    "process.env.DATABASE_URL": JSON.stringify(NEON_DB_URL),
    "import.meta.env.VITE_DATABASE_URL": JSON.stringify(NEON_DB_URL),
  },
  server: {
    port: 8080,
    host: true,
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
