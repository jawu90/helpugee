/**
 * Service to handle user business logic.
 * @file services/user.service.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires bcrypt
 * @requires models/user.model
 * @requires models/user.interface
 */

// import npm-packages
import bcrypt from 'bcrypt';

// import data models and controller instances
import User from '../models/user.model';
import IUser from '../models/user.interface';
import TranslatableError from "../types/translatable.error";


/**
 * @classdesc Class to handle user business logic.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class UserService {

    /**
     * @description Default constructor.
     * @param userService User service instance.
     */
    public constructor() {
        // pass
    }

    /**
     * @description Checks whether any object is a user interface.
     * @param obj Any object
     * @returns Checks if obj is a valid user interface.
     */
    public isInterface(obj: any): obj is IUser {
        return typeof obj.id === "number"
            && typeof obj.username === "string"
            && typeof obj.password === "string"
            && (obj.forename === null || typeof obj.forename === "string")
            && (obj.surname === null || typeof obj.surname === "string")
            && (obj.email === null || typeof obj.email === "string")
            && typeof obj.isActive === "boolean"
            && typeof obj.isDeleted === "boolean";
    }

    /**
     * @description Converts a user interface into a user object.
     * @param user A user interface.
     */
    public getInstanceFromInterface(user: IUser): IUser {
        return new User(
            user.id,
            user.username,
            user.password,
            user.forename,
            user.surname,
            user.email,
            user.isActive,
            user.createdAt,
            user.createdBy,
            user.modifiedAt,
            user.modifiedBy,
            user.isDeleted,
        );
    }

    /**
     * @description Converts any object into a user object.
     * @param obj Object of any type.
     * @returns User created from any object.
     * @throws Will throw an error if obj is not a valid user interface.
     */
    public getInstanceFromAny(obj: any): IUser {
        if (!this.isInterface(obj)) {
            throw new TranslatableError('error.service.user.is_not_valid');
        }
        return this.getInstanceFromInterface(obj as IUser);
    }

    /**
     * @description Parse username from body properties.
     * @param obj Object of any type.
     * @returns Username as string type.
     * @throws Will throw an error if username is not valid.
     */
    public getUsernameFromAny(obj: any): string {
        const username = obj.username;
        if (typeof username !== 'string' && username.length <= 0) {
            throw new TranslatableError('error.service.user.username_is_not_body_property');
        }
        return username;
    }

    /**
     * @description Parse password from body properties.
     * @param obj Object of any type.
     * @returns Password as string type.
     * @throws Will throw an error if password is not valid.
     */
    public getPasswordFromAny(obj: any): string {
        const password = obj.password;
        if (typeof password !== 'string' && password.length < 6) {
            throw new TranslatableError('error.service.user.password_is_not_body_property');
        }
        return password;
    }

    /**
     * @description Generate password.
     * @returns Password as string type.
     */
    public generatePassword(): string {
        return Math.random().toString(36).substr(2, 8);
    }

    /**
     * @description Set new password.
     * @returns User with new password.
     */
    public setNewPassword(user: IUser): IUser {
        const password = this.generatePassword();
        return new User(
            user.id,
            user.username,
            password,
            user.forename,
            user.surname,
            user.email,
            user.isActive,
            user.createdAt,
            user.createdBy,
            user.modifiedAt,
            user.modifiedBy,
            user.isDeleted,
        );
    }

    /**
     * @description Hash password string.
     * @param password String that represents the password.
     * @returns Hashed password.
     * @async
     */
    public async hashPassword(user: IUser): Promise<IUser> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        return new User(
            user.id,
            user.username,
            hash,
            user.forename,
            user.surname,
            user.email,
            user.isActive,
            user.createdAt,
            user.createdBy,
            user.modifiedAt,
            user.modifiedBy,
            user.isDeleted,
        );
    }

}

// create user service instance
const userService: UserService = new UserService();

// export user service instance
export default userService;