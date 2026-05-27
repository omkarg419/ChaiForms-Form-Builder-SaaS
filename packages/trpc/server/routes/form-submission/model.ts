import { z } from "zod";

const formSubmissionValueModel = z.object({
  formFieldId: z.string().uuid(),
  value: z.string(),
});

const formSubmissionItemModel = z.object({
  id: z.string().uuid(),
  formId: z.string().uuid(),
  values: z.array(formSubmissionValueModel),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export const createFormSubmissionInputModel = z.object({
  formId: z.string().uuid(),
  values: z.array(formSubmissionValueModel).min(1),
});

export const createFormSubmissionOutputModel = z.object({
  id: z.string().uuid(),
});

export const getFormSubmissionsByFormIdInputModel = z.object({
  formId: z.string().uuid(),
});

export const getFormSubmissionsByFormIdOutputModel = z.array(formSubmissionItemModel);
