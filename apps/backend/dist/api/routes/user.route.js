"use strict";
/**
 * Configure and initiate the server.
 * @file api/routes/user.route.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires express
 * @requires models/user.model
 * @requires models/role.model
 * @requires service/user.service
 * @requires service/utils.service
 * @requires service/authentication.service
 * @requires repositories/user.repository
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
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const user_repository_1 = __importDefault(require("../../repositories/user.repository"));
const authentication_service_1 = __importDefault(require("../../services/authentication.service"));
const utils_service_1 = __importDefault(require("../../services/utils.service"));
const role_enum_1 = __importDefault(require("../../models/role.enum"));
const translatable_error_1 = __importDefault(require("../../types/translatable.error"));
// create router object
const router = express_1.default.Router();
// register middleware for route protection
router.use('/', authentication_service_1.default.verifyAccess);
router.use('/', authentication_service_1.default.authorize([role_enum_1.default.ADMINISTRATOR], true));
/**
 * @api {get} /user get users
 * @apiName getusers
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 *
 * @apiSuccess {Object[]} user list of users
 * @apiUse UserInResponse
 */
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_repository_1.default.findAll();
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof translatable_error_1.default) ? err.translatable : 'error.unknown_error',
        });
    }
}));
/**
 * @api {get} /user/:id get user by id
 * @apiName getuser
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 *
 * @apiParam {Number} id user id
 *
 * @apiSuccess {Object} user user by id
 * @apiUse UserInResponse
 */
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = utils_service_1.default.getIdFromAny(req.params.id);
        const user = yield user_repository_1.default.findById(id);
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof translatable_error_1.default) ? err.translatable : 'error.unknown_error',
        });
    }
}));
/**
 * @api {post} /user post new user
 * @apiName postuser
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 *
 * @apiUse UserInRequest
 *
 * @apiSuccess {String} msg "OK"
 * @apiSuccess {Object} user user
 * @apiSuccess {String} user.username username
 * @apiSuccess {String} user.password generated password
 */
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = user_service_1.default.getInstanceFromAny(req.body);
        const userWithNewPassword = user_service_1.default.setNewPassword(user);
        const userWithHashedPw = yield user_service_1.default.hashPassword(userWithNewPassword);
        yield user_repository_1.default.add(userWithHashedPw);
        res.status(200).send({
            msg: "OK",
            user: {
                username: userWithNewPassword.username,
                password: userWithNewPassword.password
            }
        });
    }
    catch (err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof translatable_error_1.default) ? err.translatable : 'error.unknown_error',
        });
    }
}));
/**
 * @api {put} /user edit user
 * @apiName putuser
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 *
 * @apiUse UserInRequest
 *
 * @apiUse Success
 */
router.put('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = user_service_1.default.getInstanceFromAny(req.body);
        yield user_repository_1.default.edit(user);
        if (user.password.length >= 6) {
            const userWithHashedPassword = yield user_service_1.default.hashPassword(user);
            yield user_repository_1.default.changePassword(userWithHashedPassword);
        }
        res.send({ msg: "OK" });
    }
    catch (err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof translatable_error_1.default) ? err.translatable : 'error.unknown_error',
        });
    }
}));
/**
 * @api {delete} /user delete user
 * @apiName putuser
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 *
 * @apiParam {Number} id user id
 *
 * @apiUse Success
 */
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = utils_service_1.default.getIdFromAny(req.params.id);
        yield user_repository_1.default.remove(id);
        res.status(200).send({ msg: "OK" });
    }
    catch (err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof translatable_error_1.default) ? err.translatable : 'error.unknown_error',
        });
    }
}));
exports.default = router;
//# sourceMappingURL=user.route.js.map