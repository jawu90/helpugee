"use strict";
/**
 * Configure and initiate the server.
 * @file api/routes/user.route.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires express
 * @requires models/user.model
 * @requires service/user.service
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
// import data models, interfaces and controllers
const user_service_1 = __importDefault(require("../../services/user.service"));
const authentication_service_1 = __importDefault(require("../../services/authentication.service"));
const translatable_error_1 = __importDefault(require("../../types/translatable.error"));
// create router object
const router = express_1.default.Router();
/**
 * @api {post} /login login
 * @apiName postlogin
 * @apiVersion 0.0.0
 * @apiGroup Login
 *
 * @apiBody {String} username username
 * @apiBody {String} password password
 *
 * @apiSuccess (200) {Object} response response
 * @apiSuccess (200) {String} response.jwt JWT token
 */
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = user_service_1.default.getUsernameFromAny(req.body);
        const password = user_service_1.default.getPasswordFromAny(req.body);
        const jwt = yield authentication_service_1.default.login(username, password);
        res.json({ jwt });
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
//# sourceMappingURL=login.route.js.map