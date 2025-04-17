import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  auth: t.router({
    authorize: publicProcedure.input(z.object({
      token: z.string(),
    })).output(z.object({
      isAuthorized: z.boolean(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    uploadRelease: publicProcedure.input(z.object({
      title: z.string(),
      startDate: z.string(),
      roles: z
        .object({
          person: z.string(),
          role: z.string(),
        })
        .array(),
      area: z.object({
        negate: z.boolean(),
        data: z.string().array(),
      }),
      platforms: z.string().array(),
    })).output(z.object({
      message: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

