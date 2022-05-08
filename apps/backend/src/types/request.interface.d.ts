import type Role from '../models/role.enum';
declare module 'express' {
    interface Request {
        id?: number,
        username?: string,
        role?: Role,
    }
}