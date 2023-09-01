"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const roles_1 = require("../../../../common/roles");
const prisma_1 = require("../../../src/prisma");
const { name, internet } = faker_1.faker;
const createUsers = async () => {
    var _a, _b, _c;
    // TODO: query once and pass this on to setupRoles
    const instanceRoles = await prisma_1.prisma.instance_roles.findMany();
    const ownerRoleId = (_a = instanceRoles.find(({ name }) => name === roles_1.InstanceRoles.owner)) === null || _a === void 0 ? void 0 : _a.id;
    const chapterAdministratorRoleId = (_b = instanceRoles.find(({ name }) => name === roles_1.InstanceRoles.chapter_administrator)) === null || _b === void 0 ? void 0 : _b.id;
    const memberRoleId = (_c = instanceRoles.find(({ name }) => name === roles_1.InstanceRoles.member)) === null || _c === void 0 ? void 0 : _c.id;
    if (!ownerRoleId || !chapterAdministratorRoleId || !memberRoleId)
        throw new Error('Missing instance roles');
    const ownerData = {
        email: 'foo@bar.com',
        name: 'The Owner',
        instance_role: { connect: { id: ownerRoleId } },
    };
    const owner = await prisma_1.prisma.users.create({ data: ownerData });
    const chapter1AdminData = {
        email: 'admin@of.chapter.one',
        name: 'Chapter One Admin',
        instance_role: { connect: { id: chapterAdministratorRoleId } },
    };
    const chapter1Admin = await prisma_1.prisma.users.create({ data: chapter1AdminData });
    const chapter2AdminData = {
        email: 'admin@of.chapter.two',
        name: 'Chapter Two Admin',
        instance_role: { connect: { id: chapterAdministratorRoleId } },
    };
    const chapter2Admin = await prisma_1.prisma.users.create({ data: chapter2AdminData });
    const bannedAdminData = {
        email: 'banned@chapter.admin',
        name: 'Banned Chapter Admin',
        instance_role: { connect: { id: chapterAdministratorRoleId } },
    };
    const bannedAdmin = await prisma_1.prisma.users.create({ data: bannedAdminData });
    const testUserData = {
        email: 'test@user.org',
        name: 'Test User',
        instance_role: { connect: { id: memberRoleId } },
    };
    await prisma_1.prisma.users.create({ data: testUserData });
    const othersData = Array.from(new Array(9), () => ({
        email: internet.email(),
        name: `${name.firstName()} ${name.lastName()}`,
        instance_role: { connect: { id: memberRoleId } },
    }));
    const otherIds = (await Promise.all(othersData.map((other) => prisma_1.prisma.users.create({ data: other })))).map((other) => other.id);
    return {
        ownerId: owner.id,
        chapter1AdminId: chapter1Admin.id,
        chapter2AdminId: chapter2Admin.id,
        bannedAdminId: bannedAdmin.id,
        userIds: otherIds,
    };
};
exports.default = createUsers;
//# sourceMappingURL=user.factory.js.map