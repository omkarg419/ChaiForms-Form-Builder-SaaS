"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formFieldRouter = void 0;
const trpc_1 = require("../../trpc");
const services_1 = require("../../services");
const path_generator_1 = require("../../utils/path-generator");
const model_1 = require("./model");
const TAGS = ["Form Fields"];
const getPath = (0, path_generator_1.generatePath)("/form-fields");
function serializeField(field) {
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
exports.formFieldRouter = (0, trpc_1.router)({
    createField: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "POST",
            path: getPath("/create"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.createFieldInputModel)
        .output(model_1.createFieldOutputModel)
        .mutation(async ({ input }) => {
        const { id } = await services_1.formFieldService.createField({
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
    deleteField: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "DELETE",
            path: getPath("/delete"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.deleteFieldInputModel)
        .output(model_1.deleteFieldOutputModel)
        .mutation(async ({ input }) => {
        const { id } = await services_1.formFieldService.deleteField(input.id);
        return { id };
    }),
    updateField: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "PATCH",
            path: getPath("/update"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.updateFieldInputModel)
        .output(model_1.updateFieldOutputModel)
        .mutation(async ({ input }) => {
        const { id } = await services_1.formFieldService.updateField({
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
    getField: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "GET",
            path: getPath("/get"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.getFieldInputModel)
        .output(model_1.getFieldOutputModel)
        .query(async ({ input }) => {
        const field = await services_1.formFieldService.getField(input.id);
        if (!field) {
            return null;
        }
        return serializeField(field);
    }),
    getFieldsByFormId: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "GET",
            path: getPath("/by-form"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.getFieldsByFormIdInputModel)
        .output(model_1.getFieldsByFormIdOutputModel)
        .query(async ({ input }) => {
        const fields = await services_1.formFieldService.getFieldsByFormId(input.formId);
        return fields.map((field) => serializeField(field));
    }),
});
