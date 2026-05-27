import { z } from "zod";

export const formSubmissionValueInput = z.object({
  formFieldId: z.string().uuid(),
  value: z.string(),
});

export const createFormSubmissionInput = z.object({
  formId: z.string().uuid(),
  values: z.array(formSubmissionValueInput).min(1),
});

export type CreateFormSubmissionInputType = z.infer<typeof createFormSubmissionInput>;
