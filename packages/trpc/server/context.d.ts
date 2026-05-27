import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { createCookieFactory, getCookieFactory, clearCookieFactory } from "./utils/cookie";
export interface TRPCCtxUser {
    id: string;
}
export interface TRPCContext {
    createCookie: ReturnType<typeof createCookieFactory>;
    getCookie: ReturnType<typeof getCookieFactory>;
    clearCookie: ReturnType<typeof clearCookieFactory>;
    user?: TRPCCtxUser;
}
export declare function createContext({ req, res, }: CreateExpressContextOptions): Promise<TRPCContext>;
export type Context = Awaited<ReturnType<typeof createContext>>;
//# sourceMappingURL=context.d.ts.map