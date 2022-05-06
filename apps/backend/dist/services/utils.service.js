"use strict";
/**
 * Service to handle utils business logic.
 * @file services/utils.service.ts
 * @license MIT
 * @since 0.1.0
 * @author Florian Strohmeier
 * @requires types/translatable.error
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const translatable_error_1 = __importDefault(require("../types/translatable.error"));
/**
 * @classdesc Class to handle business logic that is used by different entities.
 */
class UtilsService {
    /**
     * @description Parse ID from URL parameters.
     * @param obj Object of any type.
     * @returns ID as number type.
     * @throws Will throw an error if id is not an integer.
     */
    getIdFromAny(obj) {
        const id = parseInt(obj);
        if (!Number.isInteger(id)) {
            throw new translatable_error_1.default('error.service.util.id_is_not_url_parameter');
        }
        return id;
    }
    /**
     * Convert strings to dates of the base entity fields.
     * @param obj Any entity that implements base entity
     */
    getBaseFromAny(obj) {
        if (typeof obj.createdAt === "string") {
            obj.createdAt = new Date(obj.createdAt);
        }
        if (typeof obj.modifiedAt === "string") {
            obj.modifiedAt = new Date(obj.modifiedAt);
        }
    }
    /**
     * Checks if a given obj fulfills the base entity requirements.
     * @param obj Any entity that implements base entity
     */
    isBaseInterface(obj) {
        return typeof obj.id === "number"
            && typeof obj.isDeleted === "boolean"
            && (obj.createdAt === null || (typeof obj.createdAt === "object" && obj.createdAt instanceof Date))
            && typeof obj.createdBy === "string"
            && (obj.modifiedAt === null || (typeof obj.modifiedAt === "object" && obj.modifiedAt instanceof Date))
            && typeof obj.modifiedBy === "string";
    }
}
const utilsService = new UtilsService();
exports.default = utilsService;
//# sourceMappingURL=utils.service.js.map