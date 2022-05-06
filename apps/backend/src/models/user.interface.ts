/**
 * Interface to handle user data.
 * @file models/user.interface.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

import IBase from "./base.interface";

/**
 * Interface to handle user data.
 * @interface IUser
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default interface IUser extends IBase {
    username: string,
    password: string,
    forename: string, 
    surname: string,
    email: string,
    isActive: boolean,
    isDeleted: boolean
 }