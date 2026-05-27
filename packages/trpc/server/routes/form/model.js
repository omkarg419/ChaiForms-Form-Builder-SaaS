"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormPublicOutputModel = exports.getFormByIdOutputModel = exports.getFormByIdInputModel = exports.getFormByUserInputModel = exports.getFormsByUserOutputModel = exports.formItemModel = exports.createFormOutputModel = exports.createFormInputModel = void 0;
const zod_1 = require("zod");
const model_1 = require("../form-field/model");
exports.createFormInputModel = zod_1.z.object({
    title: zod_1.z.string().min(1).max(55, { message: "Title must be at most 55 characters" }),
    description: zod_1.z.string().max(300).nullable().optional(),
});
exports.createFormOutputModel = zod_1.z.object({
    id: zod_1.z.string().describe("Form id"),
    createdAt: zod_1.z.string().describe("ISO timestamp when form was created"),
});
exports.formItemModel = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    createdBy: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string().nullable(),
});
exports.getFormsByUserOutputModel = zod_1.z.array(exports.formItemModel);
exports.getFormByUserInputModel = zod_1.z.undefined();
exports.getFormByIdInputModel = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.getFormByIdOutputModel = exports.formItemModel.nullable();
// Public view of a form (includes fields) for sharing without authentication
exports.getFormPublicOutputModel = zod_1.z
    .object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    fields: model_1.getFieldsByFormIdOutputModel,
})
    .nullable();
