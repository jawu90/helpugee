"use strict";
/**
 * Model to handle user data.
 * @file models/user.model.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @classdesc Class to handle user data.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class User {
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
    constructor(id, username, password, forename, surname, email, isActive, createdAt, createdBy, modifiedAt, modifiedBy, isDeleted) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.modifiedAt = modifiedAt;
        this.modifiedBy = modifiedBy;
        this.isDeleted = isDeleted;
    }
}
exports.default = User;
//# sourceMappingURL=user.model.js.map