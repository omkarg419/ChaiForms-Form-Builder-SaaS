"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formRouter = void 0;
const trpc_1 = require("../../trpc");
const services_1 = require("../../services");
const path_generator_1 = require("../../utils/path-generator");
const model_1 = require("./model");
const TAGS = ["Forms"];
const getPath = (0, path_generator_1.generatePath)("/forms");
exports.formRouter = (0, trpc_1.router)({
    createForm: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "POST",
            path: getPath("/create"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.createFormInputModel)
        .output(model_1.createFormOutputModel)
        .mutation(async ({ input, ctx }) => {
        const { title, description } = input;
        const { id, createdAt } = await services_1.formService.createForm({
            title,
            description: description ?? null,
            createdBy: ctx.user.id,
        });
        return {
            id,
            createdAt: createdAt?.toISOString ? createdAt.toISOString() : String(createdAt),
        };
    }),
    getFormsByUser: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "GET",
            path: getPath("/by-user"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.getFormByUserInputModel)
        .output(model_1.getFormsByUserOutputModel)
        .query(async ({ ctx }) => {
        const list = await services_1.formService.getFormsByUser(ctx.user.id);
        return list.map((it) => ({
            id: it.id,
            title: it.title,
            description: it.description ?? null,
            createdBy: it.createdBy,
            createdAt: it.createdAt?.toISOString ? it.createdAt.toISOString() : String(it.createdAt),
            updatedAt: it.updatedAt ? it.updatedAt.toISOString() : null,
        }));
    }),
    getFormById: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "GET",
            path: getPath("/get"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.getFormByIdInputModel)
        .output(model_1.getFormByIdOutputModel)
        .query(async ({ input, ctx }) => {
        const form = await services_1.formService.getFormById(input.id);
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
    getPublicForm: trpc_1.publicProcedure
        .meta({
        openapi: {
            method: "GET",
            path: getPath("/public"),
            tags: TAGS,
        },
    })
        .input(model_1.getFormByIdInputModel)
        .output(model_1.getFormPublicOutputModel)
        .query(async ({ input }) => {
        const form = await services_1.formService.getFormByIdWithFields(input.id);
        if (!form)
            return null;
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
