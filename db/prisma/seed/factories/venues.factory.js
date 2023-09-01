"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const prisma_1 = require("../../../src/prisma");
const util_1 = require("../lib/util");
const { company, address } = faker_1.faker;
const createVenues = async (chapterIds) => {
    const chapterIdToVenueIds = chapterIds
        .map((id) => ({ [id]: [] }))
        .reduce((acc, curr) => ({ ...acc, ...curr }));
    for (const chapterId of chapterIds) {
        for (let i = 0; i < 4; i++) {
            const tagsCount = Math.round(Math.random() * 4);
            const selectedTags = (0, util_1.selectTags)(tagsCount);
            const connectOrCreateTags = selectedTags.map((name) => ({
                tag: { connectOrCreate: { where: { name }, create: { name } } },
            }));
            const venueData = {
                name: company.companyName(),
                city: address.city(),
                region: address.state(),
                postal_code: address.zipCode(),
                country: address.country(),
                street_address: Math.random() > 0.5 ? address.streetAddress() : undefined,
                chapter: { connect: { id: chapterId } },
                venue_tags: { create: connectOrCreateTags },
            };
            // TODO: batch this once createMany returns the records.
            const venue = await prisma_1.prisma.venues.create({ data: venueData });
            chapterIdToVenueIds[chapterId].push(venue.id);
        }
    }
    return chapterIdToVenueIds;
};
exports.default = createVenues;
//# sourceMappingURL=venues.factory.js.map