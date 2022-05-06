/**
 * Interface to handle database requests.
 * @file databases/db.interface.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

/**
 * Interface to handle database requests.
 * @interface IDatabase
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default interface IDatabase {
    selectAllUsers(): Promise<any[]>;
    selectUserById(id: number): Promise<any>;
    selectUserByUsername(username: string): Promise<any>;
    insertUser(username: string, password: string, forename: string, surname: string, email: string): void;
    updateUser(id: number, username: string, password: string, forename: string, surname: string, email: string, isActive: boolean): void;
    deleteUser(id: number): void;
}