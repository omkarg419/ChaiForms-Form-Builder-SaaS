import { protectedProcedure, router } from "../../trpc";
import { formService } from "../../services";
import { generatePath } from "../../utils/path-generator";
import { createFormInputModel, createFormOutputModel } from "./model";

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
});
