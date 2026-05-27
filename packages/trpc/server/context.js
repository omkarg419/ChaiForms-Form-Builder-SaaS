"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const cookie_1 = require("./utils/cookie");
async function createContext({ req, res, }) {
    const ctx = {
        createCookie: (0, cookie_1.createCookieFactory)(res),
        getCookie: (0, cookie_1.getCookieFactory)(req),
        clearCookie: (0, cookie_1.clearCookieFactory)(res),
        user: undefined,
    };
    return ctx;
}
