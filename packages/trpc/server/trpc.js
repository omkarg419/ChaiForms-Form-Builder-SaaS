"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.publicProcedure = exports.router = exports.tRPCContext = void 0;
const server_1 = require("@trpc/server");
const cookie_1 = require("./utils/cookie");
const services_1 = require("./services");
exports.tRPCContext = server_1.initTRPC.meta().context().create({});
exports.router = exports.tRPCContext.router;
exports.publicProcedure = exports.tRPCContext.procedure;
exports.protectedProcedure = exports.tRPCContext.procedure.use(async (options) => {
    const { ctx } = options;
    const userToken = (0, cookie_1.getAuthanticationCookie)(ctx);
    if (!userToken) {
        throw new server_1.TRPCError({ code: "UNAUTHORIZED", message: "User is not authenticated" });
    }
    const { id } = await services_1.userService.verifyAndDecodeUserToken(userToken);
    return options.next({
        ctx: {
            ...ctx,
            user: { id },
        },
    });
});
