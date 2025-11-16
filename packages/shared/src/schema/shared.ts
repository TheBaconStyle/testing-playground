import z from "zod";

export const dateSchema = z.codec(z.iso.date(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});