import { Hono } from "hono";
import {z} from'zod'
import {zValidator} from '@hono/zod-validator'

const habitsRoutes = new Hono().get("/", (ctx) => {
  return ctx.text("Hello Habits");
}).get("/", (ctx) => {
  return ctx.text("Hello Habits");
}).get('/:id', zValidator('query', z.object({
  id: z.string()
})), (ctx) => {
  return ctx.text(ctx.req.param('id'))
})

export { habitsRoutes };

export type THabitsRPC = typeof habitsRoutes;
