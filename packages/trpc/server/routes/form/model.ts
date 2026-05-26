import { z } from "zod";

export const createFormInputModel = z.object({
  title: z.string().min(1).max(55, { message: "Title must be at most 55 characters" }),
  description: z.string().max(300).nullable().optional(),
});

export const createFormOutputModel = z.object({
  id: z.string().describe("Form id"),
  createdAt: z.string().describe("ISO timestamp when form was created"),
});

export const formItemModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const getFormsByUserOutputModel = z.array(formItemModel);

export const getFormByUserInputModel = z.undefined()