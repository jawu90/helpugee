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
     * @description WebApp URL when statically built.
     */
    readonly frontendAdminAppDevServiceUrl: string;

    /**
     * @description WebAdmin path when statically built.
     */
    readonly frontendAdminAppPath: string;

    /**
     * @description WebApp URL when statically built.
     */
    readonly frontendWebAppDevServiceUrl: string;

    /**
     * @description WebApp path when statically built.
     */
    readonly frontendWebAppPath: string;

    /**
     * @description Is running in development mode.
     */
    readonly development: boolean;

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
        this.development = this.readDevelopment();
        this.frontendAdminAppDevServiceUrl = this.readFrontendAdminAppDevServiceUrl();
        this.frontendAdminAppPath = this.readFrontendAdminAppPath();
        this.frontendWebAppDevServiceUrl = this.readFrontendWebAppDevServiceUrl();
        this.frontendWebAppPath = this.readFrontendWebAppPath();
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

    /**
     * @description Read secret from env, which is used to read the webadmin url.
     * @returns Secret from env or default value ''.
     */
    private readFrontendAdminAppDevServiceUrl(): string {
        return process.env.FRONTEND_ADMIN_DEV_URL || '';
    }

    /**
     * @description Read secret from env, which is used to read the webadmin path.
     * @returns Secret from env or default value '/app/webadmin/build'.
     */
    private readFrontendAdminAppPath(): string {
        return process.env.FRONTEND_ADMIN_STATIC_PATH || '/app/webadmin/build';
    }

    /**
     * @description Read secret from env, which is used to read the webapp url.
     * @returns Secret from env or default value ''.
     */
    private readFrontendWebAppDevServiceUrl(): string {
        return process.env.FRONTEND_WEB_DEV_URL || '';
    }

    /**
     * @description Read secret from env, which is used to read the webapp path.
     * @returns Secret from env or default value '/app/webapp/build'.
     */
    private readFrontendWebAppPath(): string {
        return process.env.FRONTEND_WEB_STATIC_PATH || '/app/webapp/build';
    }

    /**
     * @description Read secret from env, which is used to read the development mode flag.
     * @returns Secret from env or default value 'true'.
     */
    private readDevelopment(): boolean {
        return process.env.NODE_ENV === 'development' || false;
    }

}

// create environment instance
const environment: Environment = new Environment();

// export environment instance
export default environment;
