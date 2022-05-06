"use strict";
/**
 * Configure and initiate the app.
 * @file app.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @module app
 * @requires express
 * @requires cors
 * @requires api/routes/user.route
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import npm-packages
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_http_context_1 = __importDefault(require("express-http-context"));
// import utils
const logger_util_1 = __importDefault(require("./utils/logger.util"));
// import routes
const login_route_1 = __importDefault(require("./api/routes/login.route"));
const user_route_1 = __importDefault(require("./api/routes/user.route"));
// create express app
const app = (0, express_1.default)();
// use standard middleware for cors, url-parameter and json-body handling
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// use standard middleware for logging
app.use(logger_util_1.default);
// Use any third party middleware that does not need access to the context here, e.g.
app.use(express_http_context_1.default.middleware);
// use api routes
app.use('/login', login_route_1.default);
app.use('/user', user_route_1.default);
// export express app
exports.default = app;
//# sourceMappingURL=app.js.map