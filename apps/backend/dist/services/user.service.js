"use strict";
/**
 * Service to handle user business logic.
 * @file services/user.service.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires bcrypt
 * @requires models/user.model
 * @requires models/user.interface
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import npm-packages
const bcrypt_1 = __importDefault(require("bcrypt"));
// import data models and controller instances
const user_model_1 = __importDefault(require("../models/user.model"));
const translatable_error_1 = __importDefault(require("../types/translatable.error"));
/**
 * @classdesc Class to handle user business logic.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class UserService {
    /**
     * @description Default constructor.
     * @param userService User service instance.
     */
    constructor() {
        // pass
    }
    /**
     * @description Checks whether any object is a user interface.
     * @param obj Any object
     * @returns Checks if obj is a valid user interface.
     */
    isInterface(obj) {
        return typeof obj.id === "number"
            && typeof obj.username === "string"
            && typeof obj.password === "string"
            && (obj.forename === null || typeof obj.forename === "string")
            && (obj.surname === null || typeof obj.surname === "string")
            && (obj.email === null || typeof obj.email === "string")
            && typeof obj.isActive === "boolean"
            && typeof obj.isDeleted === "boolean";
    }
    /**
     * @description Converts a user interface into a user object.
     * @param user A user interface.
     */
    getInstanceFromInterface(user) {
        return new user_model_1.default(user.id, user.username, user.password, user.forename, user.surname, user.email, user.isActive, user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted);
    }
    /**
     * @description Converts any object into a user object.
     * @param obj Object of any type.
     * @returns User created from any object.
     * @throws Will throw an error if obj is not a valid user interface.
     */
    getInstanceFromAny(obj) {
        if (!this.isInterface(obj)) {
            throw new translatable_error_1.default('error.service.user.is_not_valid');
        }
        return this.getInstanceFromInterface(obj);
    }
    /**
     * @description Parse username from body properties.
     * @param obj Object of any type.
     * @returns Username as string type.
     * @throws Will throw an error if username is not valid.
     */
    getUsernameFromAny(obj) {
        const username = obj.username;
        if (typeof username !== 'string' && username.length <= 0) {
            throw new translatable_error_1.default('error.service.user.username_is_not_body_property');
        }
        return username;
    }
    /**
     * @description Parse password from body properties.
     * @param obj Object of any type.
     * @returns Password as string type.
     * @throws Will throw an error if password is not valid.
     */
    getPasswordFromAny(obj) {
        const password = obj.password;
        if (typeof password !== 'string' && password.length < 6) {
            throw new translatable_error_1.default('error.service.user.password_is_not_body_property');
        }
        return password;
    }
    /**
     * @description Generate password.
     * @returns Password as string type.
     */
    generatePassword() {
        return Math.random().toString(36).substr(2, 8);
    }
    /**
     * @description Set new password.
     * @returns User with new password.
     */
    setNewPassword(user) {
        const password = this.generatePassword();
        return new user_model_1.default(user.id, user.username, password, user.forename, user.surname, user.email, user.isActive, user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted);
    }
    /**
     * @description Hash password string.
     * @param password String that represents the password.
     * @returns Hashed password.
     * @async
     */
    hashPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            return new user_model_1.default(user.id, user.username, hash, user.forename, user.surname, user.email, user.isActive, user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted);
        });
    }
}
// create user service instance
const userService = new UserService();
// export user service instance
exports.default = userService;
//# sourceMappingURL=user.service.js.map