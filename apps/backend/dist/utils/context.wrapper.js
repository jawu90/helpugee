"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_http_context_1 = __importDefault(require("express-http-context"));
const context_key_1 = __importDefault(require("./context.key"));
class ContextWrapper {
    setUsername(username) {
        express_http_context_1.default.set(context_key_1.default.username, username);
    }
    getUsername() {
        return express_http_context_1.default.get(context_key_1.default.username);
    }
    setSectionId(sectionId) {
        express_http_context_1.default.set(context_key_1.default.sectionId, sectionId);
    }
    getSectionId() {
        return express_http_context_1.default.get(context_key_1.default.sectionId);
    }
    setRole(role) {
        express_http_context_1.default.set(context_key_1.default.role, role);
    }
    getRole() {
        return express_http_context_1.default.get(context_key_1.default.role);
    }
}
const contextWrapper = new ContextWrapper();
exports.default = contextWrapper;
//# sourceMappingURL=context.wrapper.js.map