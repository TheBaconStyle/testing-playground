import { serve } from "@hono/node-server";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { env } from "shared/env/backend/env";
import { auth } from "./auth/auth.config";
import { habitsRoutes } from "./habits/router";
import { logger } from "hono/logger";

const app = new Hono()
  .use(logger())
  .get(
    "/api/auth/reference",
    (()=>{
      return env.NODE_ENV !== "production" ? Scalar(async (_) => ({
      title: "Auth API",
      content: await auth.api.generateOpenAPISchema(),
    })) : async (c) => (c.status(404))
    })()
  )
  .on(["GET", "POST", "PUT", "DELETE"], "/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .route("/api/habits", habitsRoutes);

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT ?? 5000),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export type TApp = typeof app;
