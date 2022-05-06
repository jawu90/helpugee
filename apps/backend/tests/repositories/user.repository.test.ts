import userRepository from "../../src/repositories/user.repository";
import postgresql from "../../src/databases/postgresql.db";
import User from "../../src/models/user.model";
import IUser from "../../src/models/user.interface";
import userService from "../../src/services/user.service";
import Role from "../../src/models/role.enum";
import sectionRepository from "../../src/repositories/section.repository";
import ISection from "../../src/models/section.interface";
import TranslatableError from "../../src/types/translatable.error";
import contextWrapper from "../../src/utils/context.wrapper";

jest.mock("../../src/databases/postgresql.db");
jest.mock("../../src/services/user.service");

beforeEach(() => {
    jest.clearAllMocks();
});

test("test selectUsersByRole to return database objects as IUser", async () => {
    jest.spyOn(postgresql, 'selectUsersByRole').mockImplementation(() => Promise.resolve([
        {id: 1, username: "smeier", password: "pw123456"}
    ]));
    jest.spyOn(userService, "isInterface").mockReturnValue(true);

    await expect(userRepository.findUsersByRole(Role.ADMINISTRATOR)).resolves.toHaveLength(1);

    expect(postgresql.selectUsersByRole).toHaveBeenCalledWith(Role.ADMINISTRATOR);
});

test("test findAll to return database objects as IUser", () => {
    jest.spyOn(postgresql, 'selectAllUsers').mockImplementation(() => Promise.resolve([
        {id: 1, username: "smeier", password: "pw123456"},
        {id: 2, username: "ukeller", password: "pw456123"}
    ]));
    jest.spyOn(userService, "isInterface").mockReturnValue(true);

    return userRepository.findAll().then(users => {
        expect(users).toHaveLength(2);
        expect(users).toEqual([
                new User(1, "smeier", "", undefined, undefined, undefined, undefined, undefined,undefined,undefined,undefined,undefined, undefined, undefined),
                new User(2, "ukeller", "", undefined, undefined, undefined, undefined,undefined,undefined,undefined,undefined, undefined, undefined, undefined)
            ]
        );
    });
});


test("test remove user by id", async () => {
    const userId = 1;
    const modifiedAt = new Date();
    const modifiedBy = "test";
    const user = {id: userId, username: "smeier", password: "pw123456", section: 1, modifiedAt: modifiedAt, modifiedBy: modifiedBy} as IUser;
    const section: ISection = {id:1, name: "ff", isDeleted: false, role: Role.ORDERER} as ISection;

    jest.spyOn(postgresql, 'selectUserById').mockImplementation(() => Promise.resolve(user));
    jest.spyOn(userService, "isInterface").mockReturnValue(true);
    jest.spyOn(sectionRepository, "findById").mockReturnValue(Promise.resolve(section));
    jest.spyOn(contextWrapper, "getUsername").mockImplementation(() => modifiedBy);

    await userRepository.remove(userId);

    expect(postgresql.updateUser).toHaveBeenCalledWith(userId, user.username, user.password, user.forename, user.surname,
        user.phone, user.radioCallName, user.section, user.isActive, expect.any(Date), modifiedBy, user.isDeleted);
});

test("test successful edit", async () => {
    const modifiedAt = new Date();
    const modifiedBy = "test";
    const user: IUser = {id: 1, username: "smeier", password: "pw123456", modifiedAt: modifiedAt, modifiedBy: modifiedBy, isDeleted: false} as IUser;
    jest.spyOn(postgresql, 'selectUserById').mockImplementation(() => Promise.resolve(user));
    jest.spyOn(userService, "isInterface").mockReturnValue(true);
    jest.spyOn(contextWrapper, "getUsername").mockImplementation(() => modifiedBy);

    await userRepository.edit(Object.assign(user, {isDeleted: true}) as IUser);

    expect(postgresql.updateUser).toHaveBeenCalledWith(user.id, user.username, user.password, user.forename, user.surname,
        user.phone, user.radioCallName, user.section, user.isActive, expect.any(Date), user.modifiedBy, user.isDeleted);
});

test("test admin must remain constraint edit", async () => {
    const user = {id: 1, username: "smeier", password: "pw123456", isDeleted: false, section: 1} as IUser;
    const section: ISection = {id:1, name: "ff", isDeleted: false, role: Role.ADMINISTRATOR} as ISection;

    jest.spyOn(postgresql, 'selectUserById').mockImplementation(() => Promise.resolve(user));
    jest.spyOn(userService, "isInterface").mockReturnValue(true);
    jest.spyOn(sectionRepository, "findById").mockReturnValue(Promise.resolve(section));
    jest.spyOn(userRepository, "findUsersByRole").mockReturnValue(Promise.resolve([user]));

    await expect(userRepository.edit({id: 1, username: "smeier", password: "pw123456", isDeleted: false, section: 2} as IUser))
        .rejects.toThrow(TranslatableError);
});

test("test successful add", async () => {
    const createdAt = new Date();
    const createdBy = "test";
    const user: IUser = {id: 1, username: "kmueller", password: "pw123456", createdAt: createdAt, createdBy: createdBy} as IUser;
    jest.spyOn(userService, "isInterface").mockReturnValue(true);
    jest.spyOn(contextWrapper, "getUsername").mockImplementation(() => createdBy);

    await userRepository.add(user);

    expect(postgresql.insertUser).toHaveBeenCalledWith(user.username, user.password, user.forename, user.surname,
        user.phone, user.radioCallName, user.section, expect.any(Date), user.createdBy);
});

test("test findById", () => {
    const user: IUser = {id:1, username: "kmueller", password: "", isDeleted: false} as IUser;
    jest.spyOn(postgresql, 'selectUserById').mockImplementation(() => Promise.resolve(user));
    jest.spyOn(userService, "isInterface").mockReturnValue(true);

    expect(userRepository.findById(user.id)).resolves.toEqual(user);
});

test("test findUsersBySection to return database objects as IUser", () => {
    jest.spyOn(postgresql, 'selectUsersBySection').mockImplementation(() => Promise.resolve([
        {id: 1, username: "smeier", password: "pw123456"}
    ]));
    jest.spyOn(userService, "isInterface").mockReturnValue(true);

    userRepository.findUsersBySection(1).then(users => {
        expect(users).toHaveLength(1);
        expect(users).toEqual([
                new User(1, "smeier", "", undefined, undefined, undefined,undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
            ]
        );
    });

    expect(postgresql.selectUsersBySection).toHaveBeenCalledWith(1);
});

test("test suppressUserDetails", () => {
    const user: IUser = {id:1, username: "kmueller", password: "123", radioCallName: "test", surname: "Mueller", forename: "Klaus", isDeleted: false} as IUser;
    userRepository.suppressUserDetails(user);
    expect(user.username).toContain("kmueller");
    expect(user.username).not.toEqual("kmueller");
    expect(user.password).toEqual("");
    expect(user.radioCallName).toEqual(null);
    expect(user.surname).toEqual(null);
    expect(user.forename).toEqual(null);
});