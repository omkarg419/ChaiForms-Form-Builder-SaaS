import { z } from "zod";
export declare const createUserWithEmailAndPasswordInputModel: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createUserWithEmailAndPasswordOutputModel: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const signinUserWithEmailAndPasswordInputModel: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signinUserWithEmailAndPasswordOutputModel: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const getLoggedInUserInputModel: z.ZodUndefined;
export declare const getLoggedInUserOutputModel: z.ZodObject<{
    id: z.ZodString;
    fullName: z.ZodString;
    email: z.ZodEmail;
}, z.core.$strip>;
//# sourceMappingURL=model.d.ts.map