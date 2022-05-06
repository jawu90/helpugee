/**
 * Tests for UserService.
 * @file tests/user.service.test.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires services/user.service
 */

import userService from "../../src/services/user.service";
import User from "../../src/models/user.model";
import IUser from "../../src/models/user.interface";
import TranslatableError from "../../src/types/translatable.error";
import postgresql from "../../src/databases/postgresql.db";
import userRepository from "../../src/repositories/user.repository";
import authenticationService from "../../src/services/authentication.service";
import ISection from "../../src/models/section.interface";
import sectionService from "../../src/services/section.service";
import mock = jest.mock;
import Role from "../../src/models/role.enum";

jest.mock("../../src/databases/postgresql.db");
jest.mock("../../src/services/user.service");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("test authentication service", () => {

    test("test login method",  async () => {

        const user = {id: 1, username: "smeier", password: "$2b$10$xQS7qUg1SMH1yuCnaldOUuyIW/BYslnQyyU8EjhOS0b6XnKeqomjK", section: 2, isActive: true} as IUser
        const section: ISection = {id:2, name: "ff", description: "desc", isActive: true} as ISection;

        jest.spyOn(postgresql, 'selectUserByUsername').mockImplementation(() => Promise.resolve(user));
        jest.spyOn(postgresql, 'selectSectionById').mockImplementation(() => Promise.resolve(section));
        jest.spyOn(userService, "isInterface").mockReturnValue(true);
        jest.spyOn(sectionService, "isInterface").mockReturnValue(true);

        return expect(authenticationService.login(user.username, "pw123456")).resolves.toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzbWVpZXIiLCJzZWN0aW9uSWQiOjIs");
    });

    test("test login not active",  async () => {
        const user = {id: 1, username: "smeier", password: "$2b$10$xQS7qUg1SMH1yuCnaldOUuyIW/BYslnQyyU8EjhOS0b6XnKeqomjK", section: 2, isActive: false} as IUser
        jest.spyOn(postgresql, 'selectUserByUsername').mockImplementation(() => Promise.resolve(user));
        return expect(authenticationService.login(user.username, "pw123456")).rejects.toThrow(TranslatableError);
    });

    test("test login wrong credentials",  async () => {
        const user = {id: 1, username: "smeier", password: "123", section: 2, isActive: true} as IUser
        jest.spyOn(postgresql, 'selectUserByUsername').mockImplementation(() => Promise.resolve(user));
        return expect(authenticationService.login(user.username, "pw123456")).rejects.toThrow(TranslatableError);
    });

    test("test login not active",  async () => {

        const user = {id: 1, username: "smeier", password: "$2b$10$xQS7qUg1SMH1yuCnaldOUuyIW/BYslnQyyU8EjhOS0b6XnKeqomjK", section: 2, isActive: true} as IUser
        const section: ISection = {id:2, name: "ff", description: "desc", isActive: false, role: Role.ORDERER} as ISection;

        jest.spyOn(postgresql, 'selectUserByUsername').mockImplementation(() => Promise.resolve(user));
        jest.spyOn(postgresql, 'selectSectionById').mockImplementation(() => Promise.resolve(section));
        jest.spyOn(userService, "isInterface").mockReturnValue(true);
        jest.spyOn(sectionService, "isInterface").mockReturnValue(true);

        return expect(authenticationService.login(user.username, "pw123456")).rejects.toThrow(TranslatableError);
    });

    test("test login not active admin",  async () => {

        const user = {id: 1, username: "smeier", password: "$2b$10$xQS7qUg1SMH1yuCnaldOUuyIW/BYslnQyyU8EjhOS0b6XnKeqomjK", section: 2, isActive: true} as IUser
        const section: ISection = {id:2, name: "ff", description: "desc", isActive: false, role: Role.ADMINISTRATOR} as ISection;

        jest.spyOn(postgresql, 'selectUserByUsername').mockImplementation(() => Promise.resolve(user));
        jest.spyOn(postgresql, 'selectSectionById').mockImplementation(() => Promise.resolve(section));
        jest.spyOn(userService, "isInterface").mockReturnValue(true);
        jest.spyOn(sectionService, "isInterface").mockReturnValue(true);

        return expect(authenticationService.login(user.username, "pw123456")).resolves.toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzbWVpZXIiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsIn");
    });
});
