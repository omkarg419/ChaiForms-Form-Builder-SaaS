import { protectedProcedure, router } from "../../trpc";
import { formFieldService } from "../../services";
import { generatePath } from "../../utils/path-generator";
import {
  createFieldInputModel,
  createFieldOutputModel,
  deleteFieldInputModel,
  deleteFieldOutputModel,
  formFieldItemModel,
  getFieldsByFormIdInputModel,
  getFieldsByFormIdOutputModel,
  getFieldInputModel,
  getFieldOutputModel,
  updateFieldInputModel,
  updateFieldOutputModel,
} from "./model";

const TAGS = ["Form Fields"];
const getPath = generatePath("/form-fields");

function serializeField(field: {
  id: string;
  label: string;
  labelKey: string;
  placeholder: string | null;
  description: string | null;
  isRequired: boolean;
  index: string | number;
  type: "TEXT" | "NUMBER" | "YES_NO" | "Password" | "EMAIL";
  formId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}) {
  return {
    id: field.id,
    label: field.label,
    labelKey: field.labelKey,
    placeholder: field.placeholder ?? null,
    description: field.description ?? null,
    isRequired: field.isRequired,
    index: String(field.index),
    type: field.type,
    formId: field.formId,
    createdAt: field.createdAt ? field.createdAt.toISOString() : null,
    updatedAt: field.updatedAt ? field.updatedAt.toISOString() : null,
  };
}

export const formFieldRouter = router({
  createField: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFieldInputModel)
    .output(createFieldOutputModel)
    .mutation(async ({ input }) => {
      const { id } = await formFieldService.createField({
        label: input.label,
        placeholder: input.placeholder ?? null,
        description: input.description ?? null,
        isRequired: input.isRequired ?? false,
        index: input.index,
        type: input.type,
        formId: input.formId,
      });

      return { id };
    }),

  deleteField: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: getPath("/delete"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(deleteFieldInputModel)
    .output(deleteFieldOutputModel)
    .mutation(async ({ input }) => {
      const { id } = await formFieldService.deleteField(input.id);
      return { id };
    }),

  updateField: protectedProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: getPath("/update"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(updateFieldInputModel)
    .output(updateFieldOutputModel)
    .mutation(async ({ input }) => {
      const { id } = await formFieldService.updateField({
        id: input.id,
        label: input.label,
        placeholder: input.placeholder,
        description: input.description,
        isRequired: input.isRequired,
        index: input.index,
        type: input.type,
      });

      return { id };
    }),

  getField: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/get"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFieldInputModel)
    .output(getFieldOutputModel)
    .query(async ({ input }) => {
      const field = await formFieldService.getField(input.id);
      if (!field) {
        return null;
      }

      return serializeField(field);
    }),

  getFieldsByFormId: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/by-form"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFieldsByFormIdInputModel)
    .output(getFieldsByFormIdOutputModel)
    .query(async ({ input }) => {
      const fields = await formFieldService.getFieldsByFormId(input.formId);
      return fields.map((field) => serializeField(field));
    }),
});
