import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { formService } from "../../services";
import { generatePath } from "../../utils/path-generator";
import {
  createFormInputModel,
  createFormOutputModel,
  getFormByIdInputModel,
  getFormByIdOutputModel,
  getFormByUserInputModel,
  getFormsByUserOutputModel,
  getFormPublicOutputModel,
} from "./model";

const TAGS = ["Forms"];
const getPath = generatePath("/forms");

export const formRouter = router({
  createForm: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { title, description } = input;

      const { id, createdAt } = await formService.createForm({
        title,
        description: description ?? null,
        createdBy: ctx.user.id,
      });

      return {
        id,
        createdAt: createdAt?.toISOString ? createdAt.toISOString() : String(createdAt),
      };
    }),
  getFormsByUser: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/by-user"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFormByUserInputModel)
    .output(getFormsByUserOutputModel)
    .query(async ({ ctx }) => {
      const list = await formService.getFormsByUser(ctx.user.id);
      return list.map((it) => ({
        id: it.id,
        title: it.title,
        description: it.description ?? null,
        createdBy: it.createdBy,
        createdAt: it.createdAt?.toISOString ? it.createdAt.toISOString() : String(it.createdAt),
        updatedAt: it.updatedAt ? (it.updatedAt as Date).toISOString() : null,
      }));
    }),

  getFormById: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/get"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFormByIdInputModel)
    .output(getFormByIdOutputModel)
    .query(async ({ input, ctx }) => {
      const form = await formService.getFormById(input.id);

      if (!form || form.createdBy !== ctx.user.id) {
        return null;
      }

      return {
        id: form.id,
        title: form.title,
        description: form.description ?? null,
        createdBy: form.createdBy,
        createdAt: form.createdAt?.toISOString?.() ?? new Date().toISOString(),
        updatedAt: form.updatedAt ? form.updatedAt.toISOString() : null,
      };
    }),

  getPublicForm: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/public"),
        tags: TAGS,
      },
    })
    .input(getFormByIdInputModel)
    .output(getFormPublicOutputModel)
    .query(async ({ input }) => {
      const form = await formService.getFormByIdWithFields(input.id);
      if (!form) return null;

      return {
        id: form.id,
        title: form.title,
        description: form.description ?? null,
        fields: form.fields.map((field) => ({
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
        })),
      };
    }),
});
