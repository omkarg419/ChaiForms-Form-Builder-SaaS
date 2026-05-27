export declare const authRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../../context").TRPCContext;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    createUserWithEmailAndPassword: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            fullName: string;
            email: string;
            password: string;
        };
        output: {
            id: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    signinUserWithEmailAndPassword: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email: string;
            password: string;
        };
        output: {
            id: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getLoggedInUserInfo: import("@trpc/server").TRPCQueryProcedure<{
        input: undefined;
        output: {
            id: string;
            fullName: string;
            email: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
//# sourceMappingURL=route.d.ts.map