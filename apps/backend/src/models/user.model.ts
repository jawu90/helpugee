/**
 * Model to handle user data.
 * @file models/user.model.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

// import data interface
import IUser from '../models/user.interface';

/** 
 * @classdesc Class to handle user data.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default class User implements IUser {

    /** 
     * @description Default constructor.
     * @param id ID of the user.
     * @param username Username of the user.
     * @param password Password of the user.
     * @param forename Forename of the user.
     * @param surname Surname of the user.
     * @param email Email of the user.
     * @param isActive Is user active.
     * @param createdAt Date on which the user was created.
     * @param createdBy User which has the user created.
     * @param modifiedAt Date on which the user was modified.
     * @param modifiedBy User which has the user modified.
     * @param isDeleted Is user deleted.
     */
    public constructor(
        readonly id: number,
        readonly username: string,
        readonly password: string,
        public forename: string,
        public surname: string,
        public email: string,
        public isActive: boolean,
        readonly createdAt: Date,
        readonly createdBy: string,
        readonly modifiedAt: Date,
        readonly modifiedBy: string,
        public isDeleted: boolean
    ) {}

}