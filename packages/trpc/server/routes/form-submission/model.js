"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormSubmissionsByFormIdOutputModel =
  exports.getFormSubmissionsByFormIdInputModel =
  exports.createFormSubmissionOutputModel =
  exports.createFormSubmissionInputModel =
    void 0;
const zod_1 = require("zod");
const formSubmissionValueModel = zod_1.z.object({
  formFieldId: zod_1.z.string().uuid(),
  value: zod_1.z.string(),
});
const formSubmissionItemModel = zod_1.z.object({
  id: zod_1.z.string().uuid(),
  formId: zod_1.z.string().uuid(),
  values: zod_1.z.array(formSubmissionValueModel),
  createdAt: zod_1.z.string().nullable(),
  updatedAt: zod_1.z.string().nullable(),
});
exports.createFormSubmissionInputModel = zod_1.z.object({
  formId: zod_1.z.string().uuid(),
  values: zod_1.z.array(formSubmissionValueModel).min(1),
});
exports.createFormSubmissionOutputModel = zod_1.z.object({
  id: zod_1.z.string().uuid(),
});
exports.getFormSubmissionsByFormIdInputModel = zod_1.z.object({
  formId: zod_1.z.string().uuid(),
});
exports.getFormSubmissionsByFormIdOutputModel = zod_1.z.array(formSubmissionItemModel);
