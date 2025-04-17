import { z } from 'zod';

export const emailSginInPayloadSchema = z.object({
  token: z.string(),
});

export type TSignInPayload = z.infer<typeof emailSginInPayloadSchema>;
