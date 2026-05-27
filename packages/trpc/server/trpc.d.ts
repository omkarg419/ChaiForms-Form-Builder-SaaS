import { OpenApiMeta } from "trpc-to-openapi";
export declare const tRPCContext: import("@trpc/server").TRPCRootObject<import("./context").TRPCContext, OpenApiMeta, {}, {
    ctx: import("./context").TRPCContext;
    meta: OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const router: import("@trpc/server").TRPCRouterBuilder<{
    ctx: import("./context").TRPCContext;
    meta: OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const publicProcedure: import("@trpc/server").TRPCProcedureBuilder<import("./context").TRPCContext, OpenApiMeta, object, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const protectedProcedure: import("@trpc/server").TRPCProcedureBuilder<import("./context").TRPCContext, OpenApiMeta, {
    createCookie: (name: string, value: string, opts?: import("express").CookieOptions) => import("express").Response<any, Record<string, any>>;
    getCookie: (name: string) => any;
    clearCookie: (name: string) => import("express").Response<any, Record<string, any>>;
    user: {
        id: string;
    };
}, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
//# sourceMappingURL=trpc.d.ts.map