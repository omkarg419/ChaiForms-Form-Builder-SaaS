"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formFieldService = exports.formService = exports.userService = void 0;
const user_1 = __importDefault(require("@repo/services/user"));
const form_1 = __importDefault(require("@repo/services/form"));
const form_field_1 = __importDefault(require("@repo/services/form-field"));
exports.userService = new user_1.default();
exports.formService = new form_1.default();
exports.formFieldService = new form_field_1.default();
