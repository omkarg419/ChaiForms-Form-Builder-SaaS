import { publicProcedure, router } from "../../trpc";
import { formSubmissionService } from "../../services";
import { generatePath } from "../../utils/path-generator";
import {
  createFormSubmissionInputModel,
  createFormSubmissionOutputModel,
  getFormSubmissionsByFormIdInputModel,
  getFormSubmissionsByFormIdOutputModel,
} from "./model";

const TAGS = ["Form Submissions"];
const getPath = generatePath("/form-submissions");

export const formSubmissionRouter = router({
  createFormSubmission: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/submit"),
        tags: TAGS,
      },
    })
    .input(createFormSubmissionInputModel)
    .output(createFormSubmissionOutputModel)
    .mutation(async ({ input }) => {
      const { id } = await formSubmissionService.createFormSubmission(input);
      return { id };
    }),

  getFormSubmissionsByFormId: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/by-form"),
        tags: TAGS,
      },
    })
    .input(getFormSubmissionsByFormIdInputModel)
    .output(getFormSubmissionsByFormIdOutputModel)
    .query(async ({ input }) => {
      const submissions = await formSubmissionService.getFormSubmissionsByFormId(input);
      return submissions.map((submission) => ({
        id: submission.id,
        formId: submission.formId,
        values: submission.values,
        createdAt: submission.createdAt ? submission.createdAt.toISOString() : null,
        updatedAt: submission.updatedAt ? submission.updatedAt.toISOString() : null,
      }));
    }),
});
