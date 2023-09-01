"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const prisma_1 = require("../../../src/prisma");
const util_1 = require("../lib/util");
const { company, lorem, address, image } = faker_1.faker;
const createChapters = async (userId) => {
    const chapterIds = [];
    for (let i = 0; i < 4; i++) {
        const name = company.companyName();
        const description = lorem.words();
        const category = lorem.word();
        const tagsCount = Math.round(Math.random() * 4);
        const selectedTags = (0, util_1.selectTags)(tagsCount);
        const connectOrCreateTags = selectedTags.map((name) => ({
            tag: { connectOrCreate: { where: { name }, create: { name } } },
        }));
        // TODO: we shouldn't need to use the unchecked type here. The database
        // schema may need modifying.
        const chapterData = {
            name,
            description,
            category,
            creator_id: userId,
            country: address.country(),
            city: address.city(),
            region: address.state(),
            logo_url: image.imageUrl(150, 150, 'tech', true, true),
            banner_url: image.imageUrl(640, 480, 'tech', true, true),
            chapter_tags: { create: connectOrCreateTags },
        };
        // TODO: batch this once createMany returns the records.
        const chapter = await prisma_1.prisma.chapters.create({ data: chapterData });
        chapterIds.push(chapter.id);
    }
    return chapterIds;
};
exports.default = createChapters;
//# sourceMappingURL=chapters.factory.js.map