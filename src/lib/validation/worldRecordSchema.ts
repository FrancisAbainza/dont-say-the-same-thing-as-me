import z from "zod";

export const rankingSchema = z.object({
  name: z.string().min(1, {
    message: "Name must have a value.",
  }),
});