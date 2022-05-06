"use strict";
/**
 * Read .env-file and create environment instance.
 * @file utils/environment.util.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires dotenv
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import npm-packages
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * @classdesc Class that reads the .env file and provides its variables typed.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class Environment {
    /**
     * @description Default constructor.
     */
    constructor() {
        dotenv_1.default.config;
        this.port = this.readPort();
        this.ip = this.readIp();
        this.accessTokenSecret = this.readAccessTokenSecret();
        this.dbUser = this.readDbUser();
        this.dbPassword = this.readDbPassword();
        this.dbHost = this.readDbHost();
        this.dbPort = this.readDbPort();
        this.dbName = this.readDbName();
    }
    /**
     * @description Read port number from env.
     * @returns PORT from env or default value 3030.
     */
    readPort() {
        const envPort = parseInt(process.env.PORT || '');
        return Number.isInteger(envPort) ? envPort : 3030;
    }
    /**
     * @description Read ip address string from env.
     * @returns IP from env or default value 'localhost'.
     */
    readIp() {
        return process.env.IP || 'localhost';
    }
    /**
     * @description Read database user from env.
     * @returns Database user from env or default value 'admin'.
     */
    readDbUser() {
        return process.env.DB_USER || 'admin';
    }
    /**
     * @description Read database password from env.
     * @returns Database password from env or default value 'pass'.
     */
    readDbPassword() {
        return process.env.DB_PASSWORD || 'pass';
    }
    /**
     * @description Read database host from env.
     * @returns Database host from env or default value 'localhost'.
     */
    readDbHost() {
        return process.env.DB_HOST || 'localhost';
    }
    /**
     * @description Read database port from env.
     * @returns Database port from env or default value '5432'.
     */
    readDbPort() {
        return process.env.DB_PORT || '5432';
    }
    /**
     * @description Read database name from env.
     * @returns Database name from env or default value '5432'.
     */
    readDbName() {
        return process.env.DB_NAME || 'flood';
    }
    /**
     * @description Read secret from env, which is used to create the access token.
     * @returns Secret from env or default value 'secret'.
     */
    readAccessTokenSecret() {
        return process.env.ACCESS_TOKEN_SECRET || 'secret';
    }
}
// create environment instance
const environment = new Environment();
// export environment instance
exports.default = environment;
//# sourceMappingURL=environment.util.js.map