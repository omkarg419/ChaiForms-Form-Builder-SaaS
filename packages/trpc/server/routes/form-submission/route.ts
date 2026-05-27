import { publicProcedure, router } from "../../trpc";
import { formSubmissionService } from "../../services";
import { generatePath } from "../../utils/path-generator";
import { createFormSubmissionInputModel, createFormSubmissionOutputModel } from "./model";

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
});
