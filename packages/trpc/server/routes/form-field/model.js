"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldsByFormIdOutputModel = exports.getFieldOutputModel = exports.formFieldItemModel = exports.getFieldsByFormIdInputModel = exports.getFieldInputModel = exports.updateFieldOutputModel = exports.updateFieldInputModel = exports.deleteFieldOutputModel = exports.deleteFieldInputModel = exports.createFieldOutputModel = exports.createFieldInputModel = void 0;
const zod_1 = require("zod");
const fieldTypeModel = zod_1.z.enum(["TEXT", "NUMBER", "YES_NO", "Password", "EMAIL"]);
exports.createFieldInputModel = zod_1.z.object({
    label: zod_1.z.string().min(1).max(100),
    placeholder: zod_1.z.string().max(100).nullable().optional(),
    description: zod_1.z.string().nullable().optional(),
    isRequired: zod_1.z.boolean().optional().default(false),
    index: zod_1.z.number().optional(),
    type: fieldTypeModel,
    formId: zod_1.z.string().uuid(),
});
exports.createFieldOutputModel = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.deleteFieldInputModel = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.deleteFieldOutputModel = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.updateFieldInputModel = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    label: zod_1.z.string().min(1).max(100).optional(),
    placeholder: zod_1.z.string().max(100).nullable().optional(),
    description: zod_1.z.string().nullable().optional(),
    isRequired: zod_1.z.boolean().optional().default(false),
    index: zod_1.z.number().optional(),
    type: fieldTypeModel.optional(),
});
exports.updateFieldOutputModel = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.getFieldInputModel = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.getFieldsByFormIdInputModel = zod_1.z.object({
    formId: zod_1.z.string().uuid(),
});
exports.formFieldItemModel = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    label: zod_1.z.string(),
    labelKey: zod_1.z.string(),
    placeholder: zod_1.z.string().nullable(),
    description: zod_1.z.string().nullable(),
    isRequired: zod_1.z.boolean().optional().default(false),
    index: zod_1.z.string(),
    type: fieldTypeModel,
    formId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.string().nullable(),
    updatedAt: zod_1.z.string().nullable(),
});
exports.getFieldOutputModel = exports.formFieldItemModel.nullable();
exports.getFieldsByFormIdOutputModel = zod_1.z.array(exports.formFieldItemModel);
