import type { CookieOptions, Response, Request } from "express";
import { TRPCContext } from "../context";
export declare function createCookieFactory(res: Response): (name: string, value: string, opts?: CookieOptions) => Response<any, Record<string, any>>;
export declare function getCookieFactory(req: Request): (name: string) => any;
export declare function clearCookieFactory(res: Response): (name: string) => Response<any, Record<string, any>>;
export declare function setAuthanticationCookie(ctx: TRPCContext, accessToken: string): void;
export declare function getAuthanticationCookie(ctx: TRPCContext): any;
export declare function clearAuthanticationCookie(ctx: TRPCContext): void;
//# sourceMappingURL=cookie.d.ts.map