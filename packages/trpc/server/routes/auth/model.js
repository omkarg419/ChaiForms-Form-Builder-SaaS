"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUserOutputModel = exports.getLoggedInUserInputModel = exports.signinUserWithEmailAndPasswordOutputModel = exports.signinUserWithEmailAndPasswordInputModel = exports.createUserWithEmailAndPasswordOutputModel = exports.createUserWithEmailAndPasswordInputModel = void 0;
const zod_1 = require("zod");
exports.createUserWithEmailAndPasswordInputModel = zod_1.z.object({
    fullName: zod_1.z.string().describe("Full name is required"),
    email: zod_1.z.email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
exports.createUserWithEmailAndPasswordOutputModel = zod_1.z.object({
    id: zod_1.z.string().describe("User ID of the newly created user"),
});
exports.signinUserWithEmailAndPasswordInputModel = zod_1.z.object({
    email: zod_1.z.email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
exports.signinUserWithEmailAndPasswordOutputModel = zod_1.z.object({
    id: zod_1.z.string().describe("User ID of the signed in user"),
});
exports.getLoggedInUserInputModel = zod_1.z.undefined();
exports.getLoggedInUserOutputModel = zod_1.z.object({
    id: zod_1.z.string().describe("User ID of the logged in user"),
    fullName: zod_1.z.string().describe("Full name of the logged in user"),
    email: zod_1.z.email().describe("Email of the logged in user"),
});
