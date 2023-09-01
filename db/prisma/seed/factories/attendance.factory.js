"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const attendance_1 = require("../../../../common/attendance");
const prisma_1 = require("../../../src/prisma");
const random_1 = require("../lib/random");
const createAttendance = async (eventIds, userIds) => {
    for (const eventId of eventIds) {
        const eventUserIds = (0, random_1.randomItems)(userIds, userIds.length / 2);
        const numberWaiting = 1 + (0, random_1.random)(eventUserIds.length - 2);
        const numberCanceled = 1 + (0, random_1.random)(eventUserIds.length - numberWaiting - 1);
        for (let i = 0; i < eventUserIds.length; i++) {
            const on_waitlist = i < numberWaiting;
            const canceled = !on_waitlist && i < numberWaiting + numberCanceled;
            const subscribed = true; // TODO: have some unsubscribed users
            const attendanceName = on_waitlist
                ? attendance_1.AttendanceNames.waitlist
                : canceled
                    ? attendance_1.AttendanceNames.canceled
                    : attendance_1.AttendanceNames.confirmed;
            await prisma_1.prisma.event_users.create({
                data: {
                    event: { connect: { id: eventId } },
                    user: { connect: { id: eventUserIds[i] } },
                    event_role: {
                        connect: {
                            name: 'member',
                        },
                    },
                    attendance: {
                        connect: {
                            name: attendanceName,
                        },
                    },
                    subscribed: subscribed,
                },
            });
            if (subscribed && attendanceName === attendance_1.AttendanceNames.confirmed) {
                const event = await prisma_1.prisma.events.findUniqueOrThrow({
                    where: { id: eventId },
                });
                if (!event.canceled) {
                    await prisma_1.prisma.event_reminders.create({
                        data: {
                            event_user: {
                                connect: {
                                    user_id_event_id: {
                                        event_id: eventId,
                                        user_id: eventUserIds[i],
                                    },
                                },
                            },
                            remind_at: (0, date_fns_1.sub)(event.start_at, { days: 1 }),
                        },
                    });
                }
            }
        }
    }
};
exports.default = createAttendance;
//# sourceMappingURL=attendance.factory.js.map