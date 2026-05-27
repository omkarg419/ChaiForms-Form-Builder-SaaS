"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCookieFactory = createCookieFactory;
exports.getCookieFactory = getCookieFactory;
exports.clearCookieFactory = clearCookieFactory;
exports.setAuthanticationCookie = setAuthanticationCookie;
exports.getAuthanticationCookie = getAuthanticationCookie;
exports.clearAuthanticationCookie = clearAuthanticationCookie;
const ONE_MINUTE = 60 * 1000; // in milliseconds
const ONE_HOUR = 60 * ONE_MINUTE; // in milliseconds
const ONE_DAY = 24 * ONE_HOUR; // in milliseconds
const ONE_WEEK = 7 * ONE_DAY; // in milliseconds
const ONE_MONTH = 30 * ONE_DAY; // in milliseconds
const ONE_YEAR = 365 * ONE_DAY; // in milliseconds
const defaultCookieOptions = {
    path: "/", // Cookie is valid for the entire site
    httpOnly: true, // Set to true to prevent client-side JavaScript from accessing the cookie
    secure: false, // Set to true if using HTTPS
    sameSite: "strict", // Adjust as needed: "strict", "lax", or "none"
    maxAge: ONE_YEAR, // Default to 1 year
};
function createCookieFactory(res) {
    return function createCookie(name, value, opts = defaultCookieOptions) {
        return res.cookie(name, value, opts);
    };
}
function getCookieFactory(req) {
    return function getcookie(name) {
        return req.cookies?.[name];
    };
}
function clearCookieFactory(res) {
    return function clearCookie(name) {
        return res.clearCookie(name);
    };
}
// authantication cookie utils
const AUTH_COOKIE_NAME = "authentication-token";
function setAuthanticationCookie(ctx, accessToken) {
    ctx.createCookie(AUTH_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: ONE_WEEK, // Set the cookie to expire in 1 week
    });
}
function getAuthanticationCookie(ctx) {
    return ctx.getCookie(AUTH_COOKIE_NAME);
}
function clearAuthanticationCookie(ctx) {
    ctx.clearCookie(AUTH_COOKIE_NAME);
}
