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

// import npm-packages
import bcrypt from 'bcrypt';
import jwt, {JwtPayload, VerifyErrors} from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

// import environment instance
import environment from "../utils/environment.util";
import TranslatableError from "../types/translatable.error";

// import data models and controller instances
import userRepository, {UserRepository} from "../repositories/user.repository";
import Role from "../models/role.enum";
import contextWrapper from "../utils/context.wrapper";

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
    public constructor(private userRepository: UserRepository) {}

    /**
     * @description Hashes a string.
     * @param string String being hashed.
     * @async
     */
    public async hash(string: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(string, salt);
        return hash;
    }

    /**
     * @description Verify user credentials and generate JWT.
     * @param username String that represents the username.
     * @param password String that represents the password.
     * @returns Valid JSONWebToken.
     * @async
     */
    public async login(username: string, password: string): Promise<string> {
        const user = await this.userRepository.findByUsername(username);
        if (!user.isActive) {
            throw new TranslatableError('error.authentication.user_not_active');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new TranslatableError('error.authentication.wrong_credentials');
        }

        return jwt.sign({
                id: user.id,
                username: user.username
            },
            environment.accessTokenSecret
        );
    }

    /**
     * @description Middleware to verify access with token.
     * @param req express request object.
     * @param res express response object.
     * @callback next express callback.
     */
    public verifyAccess = (req: Request, res: Response, next: NextFunction) => {
        try {
            const header = req.headers['authorization'];
            const token = header && header.split(' ')[1];
            if (token === null) {
                throw new TranslatableError('error.authentication.logout.missing_token');
            }

            jwt.verify(
                token,
                environment.accessTokenSecret,
                async (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
                    try {
                        if (err) {
                            throw err;
                        }
                        if (typeof payload === 'undefined') {
                            throw new TranslatableError('error.authentication.logout.undefined_payload');
                        }
                        req.id = payload.id;
                        req.username = payload.username;
                        contextWrapper.setUsername(payload.username);
                        await this.checkAccount(req);
                        next();
                    } catch (err) {
                        res.status(403).send({
                            error_code: 403,
                            error_msg: err.message,
                            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown',
                        });
                    }
                }
            );
        } catch(err) {
            res.status(403).send({
                error_code: 403,
                error_msg: err.message,
                translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown',
            });
        }
    }

    /**
     * @description Middleware to restrict access of a route to specific roles.
     * The authenticated user must at least have one of the roles.
     * @param roles Roles which are allowed to access the route.
     * @param explicit Allow also GET request only for Role.
     */
    public authorize = (roles: Role[] = [], explicit=false) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if ((req.method != 'GET' || explicit) && roles.length && !roles.includes(req.role)) {
                res.status(500).send({
                    error_code: 500,
                    error_msg: 'Unauthorized!',
                    translatable: 'error.unauthorized',
                });
            } else {
                // authentication and authorization successful
                next();
            }
        }
    }

    async checkAccount(request: Request): Promise<void> {
        let user;
        try {
            user = await userRepository.findById(request.id);
        } catch (e) {
            throw new TranslatableError('error.authentication.logout.user_not_present');
        }
        if (!user.isActive) {
            throw new TranslatableError('error.authentication.logout.user_not_active');
        }
    }
}

// create authentication service instance
const authenticationService: AuthenticationService = new AuthenticationService(userRepository);

// export authentication service instance
export default authenticationService;