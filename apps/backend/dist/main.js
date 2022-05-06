"use strict";
/**
 * Configure and initiate the server.
 * @file main.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires utils/environment.utils
 * @requires http
 * @requires app
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import npm-packages
const http_1 = __importDefault(require("http"));
// import environment instance
const environment_util_1 = __importDefault(require("./utils/environment.util"));
// import app object
const app_1 = __importDefault(require("./app"));
// create server
const server = http_1.default.createServer(app_1.default);
// start server
server.listen(environment_util_1.default.port, environment_util_1.default.ip, () => {
    console.log(`Server is listening to ${environment_util_1.default.ip}:${environment_util_1.default.port}`);
});
//# sourceMappingURL=main.js.map