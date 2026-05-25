import type { CookieOptions, Response, Request } from "express";
import { TRPCContext } from "../context";

const ONE_MINUTE = 60 * 1000; // in milliseconds
const ONE_HOUR = 60 * ONE_MINUTE; // in milliseconds
const ONE_DAY = 24 * ONE_HOUR; // in milliseconds
const ONE_WEEK = 7 * ONE_DAY; // in milliseconds
const ONE_MONTH = 30 * ONE_DAY; // in milliseconds
const ONE_YEAR = 365 * ONE_DAY; // in milliseconds

const defaultCookieOptions: CookieOptions = {
  path: "/", // Cookie is valid for the entire site
  httpOnly: true, // Set to true to prevent client-side JavaScript from accessing the cookie
  secure: false, // Set to true if using HTTPS
  sameSite: "strict", // Adjust as needed: "strict", "lax", or "none"
  maxAge: ONE_YEAR, // Default to 1 year
};

export function createCookieFactory(res: Response) {
  return function createCookie(
    name: string,
    value: string,
    opts: CookieOptions = defaultCookieOptions,
  ) {
    return res.cookie(name, value, opts);
  };
}

export function getCookieFactory(req: Request) {
  return function getcookie(name: string) {
    return req.cookies?.[name];
  };
}

export function clearCookieFactory(res: Response) {
  return function clearCookie(name: string) {
    return res.clearCookie(name);
  };
}


// authantication cookie utils

const AUTH_COOKIE_NAME = "authentication-token";

export function setAuthanticationCookie(ctx: TRPCContext,accessToken: string){
        ctx.createCookie(AUTH_COOKIE_NAME, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: ONE_WEEK, // Set the cookie to expire in 1 week
        });
}

export function getAuthanticationCookie(ctx: TRPCContext){
  return ctx.getCookie(AUTH_COOKIE_NAME);
}

export function clearAuthanticationCookie(ctx: TRPCContext){
  ctx.clearCookie(AUTH_COOKIE_NAME);
}
