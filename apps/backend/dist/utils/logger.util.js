"use strict";
/**
 * Winston logger for express.
 * @file utils/logger.util.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires winston
 * @requires expressWinston
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import npm-packages
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
// create express winston logger instance
const expressWinstonLogger = express_winston_1.default.logger({
    transports: [
        new winston_1.default.transports.Console()
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; },
});
// Export express winston logger instance
exports.default = expressWinstonLogger;
//# sourceMappingURL=logger.util.js.map