/**
 * Repository to handle user database requests.
 * @file repository/user.repository.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires models/user.model
 * @requires models/user.interface
 * @requires databases/postgresql.db
 * @requires databases/db.interface
 * @requires services/userService
 * @requires types/tranlatable.error
 */

// import data models and controller instances
import IUser from '../models/user.interface';
import User from '../models/user.model';
import IDatabase from '../databases/db.interface';
import postgresql from "../databases/postgresql.db";
import userService from "../services/user.service";
import TranslatableError from "../types/translatable.error";
import {randomUUID} from "crypto";

/**
 * @classdesc Class to handle user database requests.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export class UserRepository {

    /**
     * @description Default constructor.
     * @param database Database instance.
     */
    public constructor(private database: IDatabase) { }

    /**
     * @description Retrieve all users from database.
     * @returns A array of all user instances.
     * @async
     */
    public async findAll(): Promise<IUser[]> {
        const users = await this.database.selectAllUsers();
        return users ? users.map((user: any) => {
            this.checkDatatype(user);
            return new User(
                user.id, user.username, '', user.forename, user.surname, user.email, user.isActive,
                user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted
            );
        }) : [];
    }

    /**
     * @description Retrieve a user from database by id.
     * @returns A single user instances.
     * @async
     */
    public async findById(id: number): Promise<IUser> {
        const user = await this.database.selectUserById(id);
        this.checkDatatype(user);
        return new User(
            user.id, user.username, '', user.forename, user.surname, user.email, user.isActive,
            user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted
        );
    }

    /**
     * @description Retrieve a user from database by username.
     * @returns A single user instances.
     * @async
     */
    public async findByUsername(username: string): Promise<IUser> {
        const user =  await this.database.selectUserByUsername(username);
        this.checkDatatype(user);
        return new User(
            user.id, user.username, user.password, user.forename, user.surname, user.email, user.isActive,
            user.createdAt, user.createdBy, user.modifiedAt, user.modifiedBy, user.isDeleted
        );
    }

    /**
     * @description Add a single user into the database.
     * @param user A single user.
     * @async
     */
    public async add(user: IUser): Promise<void> {
        const newUser = Object.assign({}, user);
        this.checkConstraints(newUser);
        await this.database.insertUser(
            newUser.username, newUser.password, newUser.forename, newUser.surname, newUser.email
        );
    }

    /**
     * @description Edit a single user from database.
     * @param user A single user.
     * @async
     */
    public async edit(user: IUser): Promise<void> {
        const newUser = Object.assign({}, user);
        const oldUser = await this.database.selectUserById(user.id);
        this.checkDatatype(user);
        newUser.password = oldUser.password;
        newUser.isDeleted = oldUser.isDeleted;
        this.checkConstraints(newUser);
        await this.database.updateUser(
            newUser.id, newUser.username, newUser.password, newUser.forename, newUser.surname, newUser.email, newUser.isActive
        );
    }

    /**
     * @description Change password of a single user from database.
     * @param user A single user.
     * @async
     */
    public async changePassword(user: IUser): Promise<void> {
        const oldUser = await this.database.selectUserById(user.id);
        this.checkDatatype(user);
        oldUser.password = user.password;
        this.checkConstraints(oldUser);
        await this.database.updateUser(
            oldUser.id, oldUser.username, oldUser.password, oldUser.forename, oldUser.surname,
            oldUser.email, oldUser.isActive
        );
    }

    /**
     * @description Mark a single user from database as deleted.
     * @param id ID of a user.
     * @async
     */
    public async remove(id: number): Promise<void> {
        const user = await this.database.selectUserById(id);
        this.checkDatatype(user);
        user.isDeleted = true;
        this.suppressUserDetails(user);
        await this.database.updateUser(
            user.id, user.username, user.password, user.forename, user.surname, user.email, user.isActive
        );
    }

    /**
     * Suppresses user information after deletion.
     * @param user The user where the privacy should be protected
     */
    suppressUserDetails(user: IUser) {
        user.username = randomUUID() + "_" + user.username;
        // DB field can hold at most 50 letters
        user.username = user.username.length > 50 ? user.username.substring(0, 49) : user.username;
        user.isActive = false;
        user.surname = null;
        user.forename = null;
        user.password = "";
        user.email = null;
    }

    /**
     * @description Check model constraints.
     * @param user User whose constraints are checked.
     * @throws Will throw an error if the username or password is empty.
     */
    private checkConstraints(user: IUser): void {
        if (user.username.length <= 0) {
            throw new TranslatableError('error.repository.user.username_is_empty');
        }
        if (user.password.length <= 0) {
            throw new TranslatableError('error.repository.user.password_is_empty');
        }
    }

    /**
     * @description Check if datatype is user interface.
     * @param obj Object that is checked to see if it is a user interface.
     * @throws Will throw an error if obj is not a user interface.
     */
    private checkDatatype(obj: any): void {
        if (!userService.isInterface(obj)) {
            throw new TranslatableError('error.repository.user.is_not_valid');
        }
    }

}

// create user repository instance
const userRepository: UserRepository = new UserRepository(postgresql);

// export user repository instance
export default userRepository;