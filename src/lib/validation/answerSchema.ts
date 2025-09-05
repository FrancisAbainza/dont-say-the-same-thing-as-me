import z from "zod";

export const answerSchema = z.object({
  answer: z.string().min(1, {
    message: "Answer must have a value.",
  }),
});