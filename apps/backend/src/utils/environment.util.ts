/**
 * Read .env-file and create environment instance.
 * @file utils/environment.util.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires dotenv
 */

// import npm-packages
import dotenv from 'dotenv';

/** 
 * @classdesc Class that reads the .env file and provides its variables typed.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class Environment {

    /** 
     * @description Port on which the server is running. 
     */
    readonly port: number;

    /** 
     * @description IP address on which the server is running. 
     */
    readonly ip: string;

    /**
     * @description Database user.
     */
    readonly dbUser: string;

    /**
     * @description Database password.
     */
    readonly dbPassword: string;

    /**
     * @description Database host address.
     */
    readonly dbHost: string;

    /**
     * @description Database port address.
     */
    readonly dbPort: string;

    /**
     * @description Database name.
     */
    readonly dbName: string;

    /**
     * @description Secret on which the access token is generated.
     */
    readonly accessTokenSecret: string;

    /** 
     * @description Default constructor.
     */
    public constructor() {
        dotenv.config;
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
    private readPort(): number {
        const envPort: (number | string) = parseInt(process.env.PORT || '')
        return Number.isInteger(envPort) ? envPort : 3030;
    }

    /** 
     * @description Read ip address string from env.
     * @returns IP from env or default value 'localhost'.
     */
    private readIp(): string { 
        return process.env.IP || 'localhost';
    }

    /**
     * @description Read database user from env.
     * @returns Database user from env or default value 'admin'.
     */
    private readDbUser(): string {
        return process.env.DB_USER || 'admin';
    }

    /**
     * @description Read database password from env.
     * @returns Database password from env or default value 'pass'.
     */
    private readDbPassword(): string {
        return process.env.DB_PASSWORD || 'pass';
    }

    /**
     * @description Read database host from env.
     * @returns Database host from env or default value 'localhost'.
     */
    private readDbHost(): string {
        return process.env.DB_HOST || 'localhost';
    }

    /**
     * @description Read database port from env.
     * @returns Database port from env or default value '5432'.
     */
    private readDbPort(): string {
        return process.env.DB_PORT || '5432';
    }

    /**
     * @description Read database name from env.
     * @returns Database name from env or default value '5432'.
     */
    private readDbName(): string {
        return process.env.DB_NAME || 'helpugee';
    }

    /**
     * @description Read secret from env, which is used to create the access token.
     * @returns Secret from env or default value 'secret'.
     */
    private readAccessTokenSecret(): string {
        return process.env.ACCESS_TOKEN_SECRET || 'secret';
    }

}

// create environment instance
const environment: Environment = new Environment();

// export environment instance
export default environment;
