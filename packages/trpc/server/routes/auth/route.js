"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const services_1 = require("../../services");
const trpc_1 = require("../../trpc");
const cookie_1 = require("../../utils/cookie");
const path_generator_1 = require("../../utils/path-generator");
const model_1 = require("./model");
const TAGS = ["Authentication"];
const getPath = (0, path_generator_1.generatePath)("/authentication");
exports.authRouter = (0, trpc_1.router)({
    createUserWithEmailAndPassword: trpc_1.publicProcedure
        .meta({
        openapi: {
            method: "POST",
            path: getPath("/createUserWithEmailAndPassword"),
            tags: TAGS,
        },
    })
        .input(model_1.createUserWithEmailAndPasswordInputModel)
        .output(model_1.createUserWithEmailAndPasswordOutputModel)
        .mutation(async ({ input, ctx }) => {
        const { fullName, email, password } = input;
        const { id, token } = await services_1.userService.creatUserWithEmailAndPassword({
            fullName,
            email,
            password,
        });
        (0, cookie_1.setAuthanticationCookie)(ctx, token);
        return { id };
    }),
    signinUserWithEmailAndPassword: trpc_1.publicProcedure
        .meta({
        openapi: {
            method: "POST",
            path: getPath("/signinUserWithEmailAndPassword"),
            tags: TAGS,
        },
    })
        .input(model_1.signinUserWithEmailAndPasswordInputModel)
        .output(model_1.signinUserWithEmailAndPasswordOutputModel)
        .mutation(async ({ input, ctx }) => {
        const { email, password } = input;
        const { id, token } = await services_1.userService.signinUserWithEmailAndPassword({
            email,
            password,
        });
        (0, cookie_1.setAuthanticationCookie)(ctx, token);
        return { id };
    }),
    getLoggedInUserInfo: trpc_1.protectedProcedure
        .meta({
        openapi: {
            method: "GET",
            path: getPath("/getLoggedInUserInfo"),
            tags: TAGS,
            protect: true,
        },
    })
        .input(model_1.getLoggedInUserInputModel)
        .output(model_1.getLoggedInUserOutputModel)
        .query(async ({ ctx }) => {
        const { id, email, fullName } = await services_1.userService.getUserInfoById(ctx.user.id);
        return { id, email, fullName };
    }),
});
