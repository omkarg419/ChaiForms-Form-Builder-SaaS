import { z } from "zod";

const fieldTypeModel = z.enum(["TEXT", "NUMBER", "YES_NO", "Password", "EMAIL"]);

export const createFieldInputModel = z.object({
  label: z.string().min(1).max(100),
  placeholder: z.string().max(100).nullable().optional(),
  description: z.string().nullable().optional(),
  isRequired: z.boolean().optional().default(false),
  index: z.number().optional(),
  type: fieldTypeModel,
  formId: z.string().uuid(),
});

export const createFieldOutputModel = z.object({
  id: z.string().uuid(),
});

export const deleteFieldInputModel = z.object({
  id: z.string().uuid(),
});

export const deleteFieldOutputModel = z.object({
  id: z.string().uuid(),
});

export const updateFieldInputModel = z.object({
  id: z.string().uuid(),
  label: z.string().min(1).max(100).optional(),
  placeholder: z.string().max(100).nullable().optional(),
  description: z.string().nullable().optional(),
  isRequired: z.boolean().optional().default(false),
  index: z.number().optional(),
  type: fieldTypeModel.optional(),
});

export const updateFieldOutputModel = z.object({
  id: z.string().uuid(),
});

export const getFieldInputModel = z.object({
  id: z.string().uuid(),
});

export const getFieldsByFormIdInputModel = z.object({
  formId: z.string().uuid(),
});

export const formFieldItemModel = z.object({
  id: z.string().uuid(),
  label: z.string(),
  labelKey: z.string(),
  placeholder: z.string().nullable(),
  description: z.string().nullable(),
  isRequired: z.boolean().optional().default(false),
  index: z.string(),
  type: fieldTypeModel,
  formId: z.string().uuid(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export const getFieldOutputModel = formFieldItemModel.nullable();

export const getFieldsByFormIdOutputModel = z.array(formFieldItemModel);
