import Role from "../models/role.enum";

export {};

declare module 'express-serve-static-core' {
    interface Request {
        id?: number,
        username?: string,
        role?: Role,
    }
}