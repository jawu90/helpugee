/**
 * Database to handle PostGreSQL requests.
 * @file databases/postgresql.db.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires pg
 * @requires utils/environment.util
 * @requires databases/db.interface
 * @requires types/tranlatable.error
 */

// import npm-packages
import { Pool } from 'pg';

// import environment instance
import environment from '../utils/environment.util';

// import data models and interfaces
import IDatabase from './db.interface';
import TranslatableError from "../types/translatable.error";
import contextWrapper from "../utils/context.wrapper";

/** 
 * @classdesc Class to handle PostGreSQL requests.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class PostGreSqlDatabase implements IDatabase {

    private pool: Pool;

    // User queries
    private sqlSelectAllUsers = 'SELECT id, username, password, forename, surname, email, is_active as "isActive", created_at as "createdAt", created_by as "createdBy", modified_at as "modifiedAt", modified_by as "modifiedBy", is_deleted as "isDeleted" FROM users WHERE is_deleted = FALSE ORDER BY surname, forename, username';
    private sqlSelectUserById = 'SELECT id, username, password, forename, surname, email, is_active as "isActive", created_at as "createdAt", created_by as "createdBy", modified_at as "modifiedAt", modified_by as "modifiedBy", is_deleted as "isDeleted" FROM users WHERE id = $1 and is_deleted = FALSE';
    private sqlSelectUserByUsername = 'SELECT id, username, password, forename, surname, email, is_active as "isActive", created_at as "createdAt", created_by as "createdBy", modified_at as "modifiedAt", modified_by as "modifiedBy", is_deleted as "isDeleted" FROM users WHERE username = $1 and is_deleted = FALSE';
    private sqlInsertUser = 'INSERT INTO users (username, password, forename, surname, email, created_at, created_by) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $7)';
    private sqlUpdateUser = 'UPDATE users SET username=$1, password=$2, forename=$3, surname=$4, email=$5, is_active=$6, modified_at=CURRENT_TIMESTAMP, modified_by=$7, is_deleted=$8 WHERE id = $9';

    /**
     * @description Default constructor.
     */
    public constructor() {
        this.pool = new Pool ({
            max: 30,
            connectionString: `postgres://${environment.dbUser}:${environment.dbPassword}@${environment.dbHost}:${environment.dbPort}/${environment.dbName}`,
            idleTimeoutMillis: 30000
        });
    }

    /**
     * @description Retrieve user entries.
     * @returns An array of all user entries.
     * @async
     */
    public async selectAllUsers(): Promise<any[]> {
        const client = await this.pool.connect();
        const { rows } = await client.query(this.sqlSelectAllUsers).finally(() => client.release());
        return rows;
    }

    /**
     * @description Retrieve user entry by id.
     * @returns A single user entry.
     * @async
     */
    public async selectUserById(id: number): Promise<any> {
        const client = await this.pool.connect();
        const { rows } = await client.query(this.sqlSelectUserById, [id]).finally(() => client.release());
        if (rows && rows.length != 1) {
            throw new TranslatableError('error.db.user.id_not_present_unique');
        }
        return rows[0];
    }

    /**
     * @description Retrieve user entry by username.
     * @returns A single user entry.
     * @async
     */
    public async selectUserByUsername(username: string): Promise<any> {
        const client = await this.pool.connect();
        const { rows } = await client.query(this.sqlSelectUserByUsername, [username]).finally(() => client.release());
        if (rows && rows.length != 1) {
            throw new TranslatableError('error.db.user.username_not_present_unique');
        }
        return rows[0];
    }

    /** 
     * @description Insert a single user into database.
     * @param user A single user.
     * @async
     */
    public async insertUser(username: string, password: string, forename: string, surname: string,
                            email: string
    ): Promise<void> {
        const client = await this.pool.connect();
        await client.query(this.sqlInsertUser, [
            username, password, forename, surname, email
        ]).catch(reason => {
            if (reason.constraint === 'users_username_key') {
                throw new TranslatableError('error.db.user.username_is_not_unique');
            }
        }).finally(() => client.release());
    }

    /**
     * @description Update a single user from database.
     * @param id ID of the user.
     * @async
     */
    public async updateUser(id: number, username: string, password: string, forename: string, surname: string,
                            email: string, isActive: boolean
    ): Promise<void> {
        const client = await this.pool.connect();
        await client.query(this.sqlUpdateUser, [
            username, password, forename, surname,
            email, isActive, contextWrapper.getUsername, id
        ]).finally(() => client.release());
    }

    /**
     * @description Delete a single user in the database as deleted.
     * @param id ID of the user.
     * @async
     */
    public async deleteUser(id: number): Promise<void> {

    }

}

// create PostGreSQL database instance
const postgresqlDatabase: IDatabase = new PostGreSqlDatabase();

// export PostGreSQL database instance
export default postgresqlDatabase;
