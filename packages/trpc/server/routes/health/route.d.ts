export declare const healthRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../../context").TRPCContext;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    getHealth: import("@trpc/server").TRPCQueryProcedure<{
        input: undefined;
        output: {
            status: "healthy";
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
//# sourceMappingURL=route.d.ts.map