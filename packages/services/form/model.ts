import { z } from "zod";

export const createFormInput = z.object({
  title: z
    .string()
    .min(1)
    .max(55, { message: "Title must be at most 55 characters" })
    .describe("Form title"),
  description: z
    .string()
    .max(300, { message: "Description must be at most 300 characters" })
    .nullable()
    .optional()
    .describe("Form description"),
  createdBy: z.string().uuid().describe("UUID of the user who creates the form"),
});

export type CreateFormInputType = z.infer<typeof createFormInput>;
