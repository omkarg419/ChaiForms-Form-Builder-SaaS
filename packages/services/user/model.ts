import { z } from "zod";

export const creatUserWithEmailAndPasswordInput = z.object({
  fullName: z.string().describe("The full name of the user"),
  email: z.email().describe("The email of the user"),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type CreatUserWithEmailAndPasswordInputType = z.infer<
  typeof creatUserWithEmailAndPasswordInput
>;
