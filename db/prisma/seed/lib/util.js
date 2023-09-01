"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTags = exports.makeBooleanIterator = void 0;
const random_1 = require("./random");
const makeBooleanIterator = (flip = false) => {
    return {
        next() {
            flip = !flip;
            return { value: flip, done: false };
        },
    };
};
exports.makeBooleanIterator = makeBooleanIterator;
const tagNames = [
    'GraphQl',
    'NodeJs',
    'JavaScript',
    'TypeScript',
    'HTML',
    'CSS',
    'Cypress',
    'Tailwind',
    'Sass',
    'BootStrap',
    'React',
    'Vue',
    'NextJs',
    'NuxtJs',
    'Angular',
    'Svelte',
    'SvelteKit',
    'Vite',
    'Prisma',
    'Ruby',
    'Rust',
];
const selectTags = (count) => (0, random_1.randomItems)(tagNames, count, true);
exports.selectTags = selectTags;
//# sourceMappingURL=util.js.map