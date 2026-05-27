"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const schema_1 = require("../../schema");
const trpc_1 = require("../../trpc");
exports.healthRouter = (0, trpc_1.router)({
    getHealth: trpc_1.publicProcedure
        .meta({ openapi: { method: "GET", path: "/health" } })
        .input(schema_1.zodUndefinedModel)
        .output(schema_1.z.object({
        status: schema_1.z.literal("healthy").describe("status of the server"),
    }))
        .query(async () => {
        return {
            status: "healthy",
        };
    }),
});
