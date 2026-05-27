export declare const formFieldRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../../context").TRPCContext;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    createField: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            label: string;
            type: "TEXT" | "NUMBER" | "YES_NO" | "Password" | "EMAIL";
            formId: string;
            placeholder?: string | null | undefined;
            description?: string | null | undefined;
            isRequired?: boolean | undefined;
            index?: number | undefined;
        };
        output: {
            id: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    deleteField: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
        };
        output: {
            id: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    updateField: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            label?: string | undefined;
            placeholder?: string | null | undefined;
            description?: string | null | undefined;
            isRequired?: boolean | undefined;
            index?: number | undefined;
            type?: "TEXT" | "NUMBER" | "YES_NO" | "Password" | "EMAIL" | undefined;
        };
        output: {
            id: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getField: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
        };
        output: {
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
        } | null;
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getFieldsByFormId: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            formId: string;
        };
        output: {
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
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
//# sourceMappingURL=route.d.ts.map