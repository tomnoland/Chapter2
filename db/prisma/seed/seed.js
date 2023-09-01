"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("/Users/tomn/Chapter2/db/prisma/node_modules/prisma");
const attendance_factory_1 = __importDefault(require("./factories/attendance.factory"));
const chapters_factory_1 = __importDefault(require("./factories/chapters.factory"));
const events_factory_1 = __importDefault(require("./factories/events.factory"));
const sponsors_factory_1 = __importDefault(require("./factories/sponsors.factory"));
const user_factory_1 = __importDefault(require("./factories/user.factory"));
const venues_factory_1 = __importDefault(require("./factories/venues.factory"));
const setupRoles_1 = __importDefault(require("./setupRoles"));
async function truncateTables() {
    const ignoredTables = [
        '_prisma_migrations',
        'instance_roles',
        'instance_permissions',
        'instance_role_permissions',
        'chapter_roles',
        'chapter_permissions',
        'chapter_role_permissions',
        'event_roles',
        'event_permissions',
        'event_role_permissions',
        'attendance',
    ];
    const tablenames = await prisma_1.prisma.$queryRaw `SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    for (const { tablename } of tablenames) {
        if (!ignoredTables.includes(tablename)) {
            try {
                await prisma_1.prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" RESTART IDENTITY CASCADE;`);
            }
            catch (error) {
                console.log({ error });
            }
        }
    }
}
async function seed() {
    const { ownerId, chapter1AdminId, chapter2AdminId, bannedAdminId, userIds } = await (0, user_factory_1.default)();
    const sponsorIds = await (0, sponsors_factory_1.default)();
    const chapterIds = await (0, chapters_factory_1.default)(ownerId);
    const chapterIdToVenueIds = await (0, venues_factory_1.default)(chapterIds);
    const eventIds = await (0, events_factory_1.default)(chapterIds, chapterIdToVenueIds, sponsorIds, 15);
    await (0, attendance_factory_1.default)(eventIds, userIds);
    await (0, setupRoles_1.default)({ ownerId, chapter1AdminId, chapter2AdminId, bannedAdminId, userIds }, chapterIds);
}
const myArgs = process.argv.slice(2);
// Truncation, rather than resetting, is necessary in testing, because the
// database needs to be initialized before use. However, if we recreate the
// schema, cached queries targetting the old schema will fail with ERROR: cached
// plan must not change result type.
if (myArgs.length === 1 && myArgs[0] === '--truncate-only') {
    truncateTables();
}
else if (myArgs.length === 0) {
    truncateTables().then(seed);
}
else {
    console.error(`--To execute:
    node seed.js
or
    node seed.js --truncate-only
--All other arguments are invalid
`);
}
//# sourceMappingURL=seed.js.map