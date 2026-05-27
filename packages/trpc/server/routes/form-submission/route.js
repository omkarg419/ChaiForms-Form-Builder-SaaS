"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formSubmissionRouter = void 0;
const trpc_1 = require("../../trpc");
const services_1 = require("../../services");
const path_generator_1 = require("../../utils/path-generator");
const model_1 = require("./model");
const TAGS = ["Form Submissions"];
const getPath = (0, path_generator_1.generatePath)("/form-submissions");
exports.formSubmissionRouter = (0, trpc_1.router)({
  createFormSubmission: trpc_1.publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/submit"),
        tags: TAGS,
      },
    })
    .input(model_1.createFormSubmissionInputModel)
    .output(model_1.createFormSubmissionOutputModel)
    .mutation(async ({ input }) => {
      const { id } = await services_1.formSubmissionService.createFormSubmission(input);
      return { id };
    }),
  getFormSubmissionsByFormId: trpc_1.publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/by-form"),
        tags: TAGS,
      },
    })
    .input(model_1.getFormSubmissionsByFormIdInputModel)
    .output(model_1.getFormSubmissionsByFormIdOutputModel)
    .query(async ({ input }) => {
      const submissions = await services_1.formSubmissionService.getFormSubmissionsByFormId(input);
      return submissions.map((submission) => ({
        id: submission.id,
        formId: submission.formId,
        values: submission.values,
        createdAt: submission.createdAt ? submission.createdAt.toISOString() : null,
        updatedAt: submission.updatedAt ? submission.updatedAt.toISOString() : null,
      }));
    }),
});
