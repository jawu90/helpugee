"use strict";
/**
 * Repository to handle user database requests.
 * @file repository/user.repository.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires models/user.model
 * @requires models/user.interface
 * @requires databases/postgresql.db
 * @requires databases/db.interface
 * @requires services/userService
 * @requires types/tranlatable.error
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
exports.UserRepository = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const postgresql_db_1 = __importDefault(require("../databases/postgresql.db"));
const user_service_1 = __importDefault(require("../services/user.service"));
const translatable_error_1 = __importDefault(require("../types/translatable.error"));
const crypto_1 = require("crypto");
/**
 * @classdesc Class to handle user database requests.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class UserRepository {
    /**
     * @description Default constructor.
     * @param database Database instance.
     */
    constructor(database) {
        this.database = database;
    }
    /**
     * @description Retrieve all users from database.
     * @returns A array of all user instances.
     * @async
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.database.selectAllUsers();
            return users ? users.map((user) => {
                this.checkDatatype(user);
                return new user_model_1.default(user.id, user.username, '', user.forename, user.surname, user.email, user.isActive, user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted);
            }) : [];
        });
    }
    /**
     * @description Retrieve a user from database by id.
     * @returns A single user instances.
     * @async
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.database.selectUserById(id);
            this.checkDatatype(user);
            return new user_model_1.default(user.id, user.username, '', user.forename, user.surname, user.email, user.isActive, user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted);
        });
    }
    /**
     * @description Retrieve a user from database by username.
     * @returns A single user instances.
     * @async
     */
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.database.selectUserByUsername(username);
            this.checkDatatype(user);
            return new user_model_1.default(user.id, user.username, user.password, user.forename, user.surname, user.email, user.isActive, user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted);
        });
    }
    /**
     * @description Add a single user into the database.
     * @param user A single user.
     * @async
     */
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = Object.assign({}, user);
            this.checkConstraints(newUser);
            yield this.database.insertUser(newUser.username, newUser.password, newUser.forename, newUser.surname, newUser.email);
        });
    }
    /**
     * @description Edit a single user from database.
     * @param user A single user.
     * @async
     */
    edit(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = Object.assign({}, user);
            const oldUser = yield this.database.selectUserById(user.id);
            this.checkDatatype(user);
            newUser.password = oldUser.password;
            newUser.isDeleted = oldUser.isDeleted;
            this.checkConstraints(newUser);
            yield this.database.updateUser(newUser.id, newUser.username, newUser.password, newUser.forename, newUser.surname, newUser.email, newUser.isActive);
        });
    }
    /**
     * @description Change password of a single user from database.
     * @param user A single user.
     * @async
     */
    changePassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldUser = yield this.database.selectUserById(user.id);
            this.checkDatatype(user);
            oldUser.password = user.password;
            this.checkConstraints(oldUser);
            yield this.database.updateUser(oldUser.id, oldUser.username, oldUser.password, oldUser.forename, oldUser.surname, oldUser.email, oldUser.isActive);
        });
    }
    /**
     * @description Mark a single user from database as deleted.
     * @param id ID of a user.
     * @async
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.database.selectUserById(id);
            this.checkDatatype(user);
            user.isDeleted = true;
            this.suppressUserDetails(user);
            yield this.database.updateUser(user.id, user.username, user.password, user.forename, user.surname, user.email, user.isActive);
        });
    }
    /**
     * Suppresses user information after deletion.
     * @param user The user where the privacy should be protected
     */
    suppressUserDetails(user) {
        user.username = (0, crypto_1.randomUUID)() + "_" + user.username;
        // DB field can hold at most 50 letters
        user.username = user.username.length > 50 ? user.username.substring(0, 49) : user.username;
        user.isActive = false;
        user.surname = null;
        user.forename = null;
        user.password = "";
        user.email = null;
    }
    /**
     * @description Check model constraints.
     * @param user User whose constraints are checked.
     * @throws Will throw an error if the username or password is empty.
     */
    checkConstraints(user) {
        if (user.username.length <= 0) {
            throw new translatable_error_1.default('error.repository.user.username_is_empty');
        }
        if (user.password.length <= 0) {
            throw new translatable_error_1.default('error.repository.user.password_is_empty');
        }
    }
    /**
     * @description Check if datatype is user interface.
     * @param obj Object that is checked to see if it is a user interface.
     * @throws Will throw an error if obj is not a user interface.
     */
    checkDatatype(obj) {
        if (!user_service_1.default.isInterface(obj)) {
            throw new translatable_error_1.default('error.repository.user.is_not_valid');
        }
    }
}
exports.UserRepository = UserRepository;
// create user repository instance
const userRepository = new UserRepository(postgresql_db_1.default);
// export user repository instance
exports.default = userRepository;
//# sourceMappingURL=user.repository.js.map