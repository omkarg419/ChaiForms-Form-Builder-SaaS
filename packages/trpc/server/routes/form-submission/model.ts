import { z } from "zod";

const formSubmissionValueModel = z.object({
  formFieldId: z.string().uuid(),
  value: z.string(),
});

export const createFormSubmissionInputModel = z.object({
  formId: z.string().uuid(),
  values: z.array(formSubmissionValueModel).min(1),
});

export const createFormSubmissionOutputModel = z.object({
  id: z.string().uuid(),
});
