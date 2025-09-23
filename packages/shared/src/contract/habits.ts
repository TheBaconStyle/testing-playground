import { initContract } from "@ts-rest/core";
import z from 'zod';

const c = initContract();

export const habitsContract = c.router({
  getHabits: {
    method: "GET",
    path: "/habits",
    responses: {
      200: z.array(z.any()),
    },
    summary: "Получить все привычки пользователя",
  },
  createHabit: {
    method: "POST",
    path: "/habits",
    body: z.object({
      name: z.string(),
      category: z.string(),
    }),
    responses: {
      201: z.any(),
    },
    summary: "Создать новую привычку",
  },
  updateHabit: {
    method: "PATCH",
    path: "/habits/:id",
    body: z.any(),
    responses: {
      200: z.any(),
      404: z.object({ message: z.string() }),
    },
    summary: "Обновить существующую привычку",
  },
  deleteHabit: {
    method: "DELETE",
    path: "/habits/:id",
    body: z.any(),
    responses: {
      204: z.any(),
      404: z.object({ message: z.string() }),
    },
    summary: "Удалить привычку",
  },
});
