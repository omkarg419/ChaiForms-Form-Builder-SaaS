import { z } from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
  fullName: z.string().describe("Full name is required"),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const createUserWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("User ID of the newly created user"),
});

export const signinUserWithEmailAndPasswordInputModel = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const signinUserWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("User ID of the signed in user"),
});

export const getLoggedInUserInputModel = z.undefined();
export const getLoggedInUserOutputModel = z.object({
  id: z.string().describe("User ID of the logged in user"),
  fullName: z.string().describe("Full name of the logged in user"),
  email: z.email().describe("Email of the logged in user"),
});
