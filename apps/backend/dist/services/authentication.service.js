"use strict";
/**
 * Service to handle authentication business logic.
 * @file services/authentication.service.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires bcrypt
 * @requires jsonwebtoken
 * @requires express
 * @requires utils/environment.util
 * @requires types/translatable.error
 * @requires repositories/user.repository
 * @requires repositories/section.repository
 * @requires models/role.enum
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import environment instance
const environment_util_1 = __importDefault(require("../utils/environment.util"));
const translatable_error_1 = __importDefault(require("../types/translatable.error"));
// import data models and controller instances
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const context_wrapper_1 = __importDefault(require("../utils/context.wrapper"));
/**
 * @classdesc Class to handle authentication business logic.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class AuthenticationService {
    /**
     * @description Default constructor.
     * @param AuthenticationService Authentication service instance.
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
        /**
         * @description Middleware to verify access with token.
         * @param req express request object.
         * @param res express response object.
         * @callback next express callback.
         */
        this.verifyAccess = (req, res, next) => {
            try {
                const header = req.headers['authorization'];
                const token = header && header.split(' ')[1];
                if (token === null) {
                    throw new translatable_error_1.default('error.authentication.logout.missing_token');
                }
                jsonwebtoken_1.default.verify(token, environment_util_1.default.accessTokenSecret, (err, payload) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (err) {
                            throw err;
                        }
                        if (typeof payload === 'undefined') {
                            throw new translatable_error_1.default('error.authentication.logout.undefined_payload');
                        }
                        req.id = payload.id;
                        req.username = payload.username;
                        context_wrapper_1.default.setUsername(payload.username);
                        yield this.checkAccount(req);
                        next();
                    }
                    catch (err) {
                        res.status(403).send({
                            error_code: 403,
                            error_msg: err.message,
                            translatable: (err instanceof translatable_error_1.default) ? err.translatable : 'error.unknown',
                        });
                    }
                }));
            }
            catch (err) {
                res.status(403).send({
                    error_code: 403,
                    error_msg: err.message,
                    translatable: (err instanceof translatable_error_1.default) ? err.translatable : 'error.unknown',
                });
            }
        };
        /**
         * @description Middleware to restrict access of a route to specific roles.
         * The authenticated user must at least have one of the roles.
         * @param roles Roles which are allowed to access the route.
         * @param explicit Allow also GET request only for Role.
         */
        this.authorize = (roles = [], explicit = false) => {
            return (req, res, next) => {
                if ((req.method != 'GET' || explicit) && roles.length && !roles.includes(req.role)) {
                    res.status(500).send({
                        error_code: 500,
                        error_msg: 'Unauthorized!',
                        translatable: 'error.unauthorized',
                    });
                }
                else {
                    // authentication and authorization successful
                    next();
                }
            };
        };
    }
    /**
     * @description Hashes a string.
     * @param string String being hashed.
     * @async
     */
    hash(string) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(string, salt);
            return hash;
        });
    }
    /**
     * @description Verify user credentials and generate JWT.
     * @param username String that represents the username.
     * @param password String that represents the password.
     * @returns Valid JSONWebToken.
     * @async
     */
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByUsername(username);
            if (!user.isActive) {
                throw new translatable_error_1.default('error.authentication.user_not_active');
            }
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match) {
                throw new translatable_error_1.default('error.authentication.wrong_credentials');
            }
            return jsonwebtoken_1.default.sign({
                id: user.id,
                username: user.username
            }, environment_util_1.default.accessTokenSecret);
        });
    }
    checkAccount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield user_repository_1.default.findById(request.id);
            }
            catch (e) {
                throw new translatable_error_1.default('error.authentication.logout.user_not_present');
            }
            if (!user.isActive) {
                throw new translatable_error_1.default('error.authentication.logout.user_not_active');
            }
        });
    }
}
// create authentication service instance
const authenticationService = new AuthenticationService(user_repository_1.default);
// export authentication service instance
exports.default = authenticationService;
//# sourceMappingURL=authentication.service.js.map