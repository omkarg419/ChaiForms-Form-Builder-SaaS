"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.zodUndefinedModel = void 0;
const zod_1 = require("zod");
Object.defineProperty(exports, "z", { enumerable: true, get: function () { return zod_1.z; } });
exports.zodUndefinedModel = zod_1.z.undefined().describe("undefined");
