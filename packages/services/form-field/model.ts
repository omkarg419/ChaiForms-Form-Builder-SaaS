import { z } from "zod";

export const createFieldInput = z.object({
  label: z.string().min(1).max(100),
  labelKey: z.string().min(1).max(100),
  placeholder: z.string().max(100).nullable().optional(),
  description: z.string().nullable().optional(),
  isRequired: z.boolean().optional(),
  index: z.number(),
  type: z.enum(["TEXT", "NUMBER", "YES_NO", "Password", "EMAIL"]),
  formId: z.string().uuid(),
});

export type CreateFieldInputType = z.infer<typeof createFieldInput>;

export const updateFieldInput = z.object({
  id: z.string().uuid(),
  label: z.string().min(1).max(100).optional(),
  placeholder: z.string().max(100).nullable().optional(),
  description: z.string().nullable().optional(),
  isRequired: z.boolean().optional(),
  index: z.number().optional(),
  type: z.enum(["TEXT", "NUMBER", "YES_NO", "Password", "EMAIL"]).optional(),
});

export type UpdateFieldInputType = z.infer<typeof updateFieldInput>;
