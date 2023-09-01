"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = exports.randomEnum = exports.randomItems = exports.randomItem = exports.random = void 0;
const random = (n) => Math.floor(Math.random() * n);
exports.random = random;
const randomItem = (arr) => {
    return arr[(0, exports.random)(arr.length)];
};
exports.randomItem = randomItem;
const randomItems = (arr, n, uniq = true) => {
    if (n > arr.length && uniq) {
        throw new Error('Cant find more uniq items than there are items in the array');
    }
    if (n === arr.length) {
        return arr;
    }
    const newArr = [...arr];
    const out = [];
    for (let i = 0; i < n; i++) {
        const randomIndex = (0, exports.random)(newArr.length);
        out.push(newArr[randomIndex]);
        newArr.splice(randomIndex, 1);
    }
    return out;
};
exports.randomItems = randomItems;
const randomEnum = (anEnum) => {
    const numericKeys = Object.keys(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n));
    const stringKeys = Object.keys(anEnum).filter((s) => Number.isNaN(Number(s)));
    if (numericKeys.length && stringKeys.length !== numericKeys.length)
        throw new Error(`This enum appears to be heterogeneous, if you're sure you need one, you should probably
create a randomHeterogeneousEnum function`);
    const randomIndex = Math.floor(Math.random() * stringKeys.length);
    // String enums cannot have numeric keys, so if numeric keys exist, we can
    // assume it is a numeric enum.
    const keys = numericKeys.length ? numericKeys : stringKeys;
    return anEnum[keys[randomIndex]];
};
exports.randomEnum = randomEnum;
function shuffle(xs) {
    for (let i = xs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [xs[i], xs[j]] = [xs[j], xs[i]];
    }
}
exports.shuffle = shuffle;
//# sourceMappingURL=random.js.map