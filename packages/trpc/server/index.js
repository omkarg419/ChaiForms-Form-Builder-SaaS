"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.serverRouter = void 0;
const trpc_1 = require("./trpc");
const route_1 = require("./routes/health/route");
const route_2 = require("./routes/auth/route");
const route_3 = require("./routes/form/route");
const route_4 = require("./routes/form-field/route");
exports.serverRouter = (0, trpc_1.router)({
    health: route_1.healthRouter,
    auth: route_2.authRouter,
    form: route_3.formRouter,
    formField: route_4.formFieldRouter,
});
var context_1 = require("./context");
Object.defineProperty(exports, "createContext", { enumerable: true, get: function () { return context_1.createContext; } });
