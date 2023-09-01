"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma_1 = require("../../../src/prisma");
const random_1 = require("../lib/random");
const util_1 = require("../lib/util");
const { company, internet, lorem, image } = faker_1.faker;
const createEvents = async (chapterIds, chapterIdToVenueIds, sponsorIds, count) => {
    const events = [];
    const halfCount = Math.floor(count + 1 / 2);
    const inviteOnly = [
        ...new Array(halfCount).fill(false),
        ...new Array(halfCount).fill(true),
    ];
    const canceled = [
        ...new Array(halfCount).fill(false),
        ...new Array(halfCount).fill(true),
    ];
    (0, random_1.shuffle)(inviteOnly);
    (0, random_1.shuffle)(canceled);
    for (let i = 0; i < count; i++) {
        const date = new Date();
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        const start_at = (0, date_fns_1.add)(date, {
            days: (0, random_1.random)(10) + 1,
            hours: (0, random_1.random)(5),
            minutes: (0, random_1.random)(4) * 15,
        });
        const chapterId = i === 0 ? 1 : (0, random_1.randomItem)(chapterIds);
        const venueIds = chapterIdToVenueIds[chapterId];
        const venueType = (0, random_1.randomEnum)(client_1.events_venue_type_enum);
        const venueData = {
            ...(venueType !== client_1.events_venue_type_enum.Physical && {
                streaming_url: internet.url(),
            }),
            ...(venueType !== client_1.events_venue_type_enum.Online && {
                venue: { connect: { id: (0, random_1.randomItem)(venueIds) } },
            }),
        };
        const eventData = {
            name: company.companyName(),
            chapter: { connect: { id: chapterId } },
            description: lorem.words(),
            url: internet.url(),
            venue_type: venueType,
            capacity: 10 + (0, random_1.random)(1000),
            canceled: canceled[i],
            // Setting the first event to be open, so that we can test the user attend flow
            invite_only: i == 0 ? false : inviteOnly[i],
            start_at,
            ends_at: (0, date_fns_1.addHours)(start_at, 1 + (0, random_1.random)(5)),
            image_url: image.imageUrl(640, 480, 'nature', true, true),
            ...venueData,
        };
        const event = await prisma_1.prisma.events.create({ data: eventData });
        await Promise.all((0, random_1.randomItems)(sponsorIds, 2).map(async (sponsor) => {
            const eventSponsorData = {
                event: { connect: { id: event.id } },
                sponsor: { connect: { id: sponsor } },
            };
            return prisma_1.prisma.event_sponsors.create({ data: eventSponsorData });
        }));
        const tagsCount = Math.round(Math.random() * 4);
        const selectedTags = (0, util_1.selectTags)(tagsCount);
        const connectOrCreateTags = selectedTags.map((name) => ({
            tag: {
                connectOrCreate: {
                    where: { name },
                    create: { name },
                },
            },
        }));
        await prisma_1.prisma.events.update({
            where: { id: event.id },
            data: { event_tags: { create: connectOrCreateTags } },
        });
        events.push(event.id);
    }
    return events;
};
exports.default = createEvents;
//# sourceMappingURL=events.factory.js.map