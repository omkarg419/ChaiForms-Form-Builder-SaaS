import { userService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { setAuthanticationCookie } from "../../utils/cookie";
import { generatePath } from "../../utils/path-generator";
import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
  signinUserWithEmailAndPasswordInputModel,
} from "./model";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input,ctx }) => {
      const { fullName, email, password } = input;

      const { id , token} = await userService.creatUserWithEmailAndPassword({
        fullName,
        email,
        password,
      });

      setAuthanticationCookie(ctx,token);
      return { id };
    }),
  signinUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/signinUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(signinUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input,ctx }) => {
      const { email, password } = input;

      const { id , token} = await userService.signinUserWithEmailAndPassword({
        email,
        password,
      });

      setAuthanticationCookie(ctx,token);
      return { id };
    }),
    
});
