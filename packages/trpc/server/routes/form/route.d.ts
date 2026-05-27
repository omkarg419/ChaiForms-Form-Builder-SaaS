export declare const formRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../../context").TRPCContext;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    createForm: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            title: string;
            description?: string | null | undefined;
        };
        output: {
            id: string;
            createdAt: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getFormsByUser: import("@trpc/server").TRPCQueryProcedure<{
        input: undefined;
        output: {
            id: string;
            title: string;
            description: string | null;
            createdBy: string;
            createdAt: string;
            updatedAt: string | null;
        }[];
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getFormById: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
        };
        output: {
            id: string;
            title: string;
            description: string | null;
            createdBy: string;
            createdAt: string;
            updatedAt: string | null;
        } | null;
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getPublicForm: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
        };
        output: {
            id: string;
            title: string;
            description: string | null;
            fields: {
                id: string;
                label: string;
                labelKey: string;
                placeholder: string | null;
                description: string | null;
                isRequired: boolean;
                index: string;
                type: "TEXT" | "NUMBER" | "YES_NO" | "Password" | "EMAIL";
                formId: string;
                createdAt: string | null;
                updatedAt: string | null;
            }[];
        } | null;
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
//# sourceMappingURL=route.d.ts.map