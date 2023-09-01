"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const prisma_1 = require("../../../src/prisma");
const random_1 = require("../lib/random");
const { company, internet, system } = faker_1.faker;
var SponsorTypes;
(function (SponsorTypes) {
    SponsorTypes[SponsorTypes["FOOD"] = 0] = "FOOD";
    SponsorTypes[SponsorTypes["VENUE"] = 1] = "VENUE";
    SponsorTypes[SponsorTypes["OTHER"] = 2] = "OTHER";
})(SponsorTypes || (SponsorTypes = {}));
const createSponsors = async () => {
    const sponsors = [];
    for (let i = 0; i < 4; i++) {
        const name = company.companyName();
        const website = internet.url();
        const logo_path = system.commonFileName('png');
        const type = String((0, random_1.randomEnum)(SponsorTypes));
        const sponsorData = {
            name,
            website,
            logo_path,
            type,
        };
        // TODO: batch this once createMany returns the records.
        const sponsor = await prisma_1.prisma.sponsors.create({ data: sponsorData });
        sponsors.push(sponsor.id);
    }
    return sponsors;
};
exports.default = createSponsors;
//# sourceMappingURL=sponsors.factory.js.map