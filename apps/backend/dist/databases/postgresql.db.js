"use strict";
/**
 * Database to handle PostGreSQL requests.
 * @file databases/postgresql.db.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires pg
 * @requires utils/environment.util
 * @requires databases/db.interface
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
// import npm-packages
const pg_1 = require("pg");
// import environment instance
const environment_util_1 = __importDefault(require("../utils/environment.util"));
const translatable_error_1 = __importDefault(require("../types/translatable.error"));
const context_wrapper_1 = __importDefault(require("../utils/context.wrapper"));
/**
 * @classdesc Class to handle PostGreSQL requests.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class PostGreSqlDatabase {
    /**
     * @description Default constructor.
     */
    constructor() {
        // User queries
        this.sqlSelectAllUsers = 'SELECT id, username, password, forename, surname, email, is_active as "isActive", created_at as "createdAt", created_by as "createdBy", modified_at as "modifiedAt", modified_by as "modifiedBy", is_deleted as "isDeleted" FROM users WHERE is_deleted = FALSE ORDER BY surname, forename, username';
        this.sqlSelectUserById = 'SELECT id, username, password, forename, surname, email, is_active as "isActive", created_at as "createdAt", created_by as "createdBy", modified_at as "modifiedAt", modified_by as "modifiedBy", is_deleted as "isDeleted" FROM users WHERE id = $1 and is_deleted = FALSE';
        this.sqlSelectUserByUsername = 'SELECT id, username, password, forename, surname, email, is_active as "isActive", created_at as "createdAt", created_by as "createdBy", modified_at as "modifiedAt", modified_by as "modifiedBy", is_deleted as "isDeleted" FROM users WHERE username = $1 and is_deleted = FALSE';
        this.sqlInsertUser = 'INSERT INTO users (username, password, forename, surname, email, created_at, created_by) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $7)';
        this.sqlUpdateUser = 'UPDATE users SET username=$1, password=$2, forename=$3, surname=$4, email=$5, is_active=$6, modified_at=CURRENT_TIMESTAMP, modified_by=$7, is_deleted=$8 WHERE id = $9';
        this.pool = new pg_1.Pool({
            max: 30,
            connectionString: `postgres://${environment_util_1.default.dbUser}:${environment_util_1.default.dbPassword}@${environment_util_1.default.dbHost}:${environment_util_1.default.dbPort}/${environment_util_1.default.dbName}`,
            idleTimeoutMillis: 30000
        });
    }
    /**
     * @description Retrieve user entries.
     * @returns An array of all user entries.
     * @async
     */
    selectAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const { rows } = yield client.query(this.sqlSelectAllUsers).finally(() => client.release());
            return rows;
        });
    }
    /**
     * @description Retrieve user entry by id.
     * @returns A single user entry.
     * @async
     */
    selectUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const { rows } = yield client.query(this.sqlSelectUserById, [id]).finally(() => client.release());
            if (rows && rows.length != 1) {
                throw new translatable_error_1.default('error.db.user.id_not_present_unique');
            }
            return rows[0];
        });
    }
    /**
     * @description Retrieve user entry by username.
     * @returns A single user entry.
     * @async
     */
    selectUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const { rows } = yield client.query(this.sqlSelectUserByUsername, [username]).finally(() => client.release());
            if (rows && rows.length != 1) {
                throw new translatable_error_1.default('error.db.user.username_not_present_unique');
            }
            return rows[0];
        });
    }
    /**
     * @description Insert a single user into database.
     * @param user A single user.
     * @async
     */
    insertUser(username, password, forename, surname, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            yield client.query(this.sqlInsertUser, [
                username, password, forename, surname, email
            ]).catch(reason => {
                if (reason.constraint === 'users_username_key') {
                    throw new translatable_error_1.default('error.db.user.username_is_not_unique');
                }
            }).finally(() => client.release());
        });
    }
    /**
     * @description Update a single user from database.
     * @param id ID of the user.
     * @async
     */
    updateUser(id, username, password, forename, surname, email, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            yield client.query(this.sqlUpdateUser, [
                username, password, forename, surname,
                email, isActive, context_wrapper_1.default.getUsername, id
            ]).finally(() => client.release());
        });
    }
    /**
     * @description Delete a single user in the database as deleted.
     * @param id ID of the user.
     * @async
     */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
// create PostGreSQL database instance
const postgresqlDatabase = new PostGreSqlDatabase();
// export PostGreSQL database instance
exports.default = postgresqlDatabase;
//# sourceMappingURL=postgresql.db.js.map