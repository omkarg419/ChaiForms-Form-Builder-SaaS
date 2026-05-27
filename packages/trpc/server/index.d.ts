export declare const serverRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("./context").TRPCContext;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    health: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./context").TRPCContext;
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
    auth: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./context").TRPCContext;
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
    form: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./context").TRPCContext;
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
    formField: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./context").TRPCContext;
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
}>>;
export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
//# sourceMappingURL=index.d.ts.map