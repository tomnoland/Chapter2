"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_1 = require("../../../common/roles");
const prisma_1 = require("../../src/prisma");
const util_1 = require("./lib/util");
const setupRoles = async ({ ownerId, chapter1AdminId, chapter2AdminId, bannedAdminId, userIds, }, chapterIds) => {
    var _a, _b, _c;
    const chapterRoles = (_a = (await prisma_1.prisma.chapter_roles.findMany())) !== null && _a !== void 0 ? _a : [];
    const administratorRoleId = (_b = chapterRoles.find(({ name }) => name === roles_1.ChapterRoles.administrator)) === null || _b === void 0 ? void 0 : _b.id;
    const memberRoleId = (_c = chapterRoles.find(({ name }) => name === roles_1.ChapterRoles.member)) === null || _c === void 0 ? void 0 : _c.id;
    if (!administratorRoleId || !memberRoleId)
        throw new Error('Missing chapter roles');
    const usersData = [];
    const subscribeIterator = (0, util_1.makeBooleanIterator)();
    const chapter1AdminData = {
        joined_date: new Date(),
        chapter_id: 1,
        user_id: chapter1AdminId,
        chapter_role_id: administratorRoleId,
        subscribed: true,
    };
    usersData.push(chapter1AdminData);
    const chapter2AdminData = {
        joined_date: new Date(),
        chapter_id: 2,
        user_id: chapter2AdminId,
        chapter_role_id: administratorRoleId,
        subscribed: true,
    };
    usersData.push(chapter2AdminData);
    for (const chapterId of chapterIds) {
        const ownerData = {
            joined_date: new Date(),
            chapter_id: chapterId,
            user_id: ownerId,
            chapter_role_id: memberRoleId,
            // so this chapter role should not provide additional permissions beyond
            // those provided by the instance owner role. It is possible for them to
            // be a member of a chapter, though, so this grants them the member role
            // for all chapters.
            subscribed: true,
        };
        usersData.push(ownerData);
        const bannedAdminData = {
            joined_date: new Date(),
            chapter_id: chapterId,
            user_id: bannedAdminId,
            chapter_role_id: administratorRoleId,
            subscribed: false,
        };
        usersData.push(bannedAdminData);
        const [firstUserId] = userIds;
        const memberBanData = {
            user_id: firstUserId,
            chapter_id: chapterId,
        };
        const adminBanData = {
            user_id: bannedAdminId,
            chapter_id: chapterId,
        };
        await prisma_1.prisma.user_bans.createMany({
            data: [memberBanData, adminBanData],
        });
        // makes sure half of each chapter's users are interested, but
        // alternates which half.
        const userSubscribed = (0, util_1.makeBooleanIterator)(subscribeIterator.next().value);
        for (const user of userIds) {
            const userData = {
                joined_date: new Date(),
                chapter_id: chapterId,
                user_id: user,
                chapter_role_id: memberRoleId,
                subscribed: userSubscribed.next().value,
            };
            usersData.push(userData);
        }
    }
    await prisma_1.prisma.chapter_users.createMany({ data: usersData });
};
exports.default = setupRoles;
//# sourceMappingURL=setupRoles.js.map