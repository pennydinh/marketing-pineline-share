"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShouldOpenBrowser = exports.setShouldOpenBrowser = void 0;
let should = true;
const setShouldOpenBrowser = (_should) => {
    if (typeof _should !== 'boolean') {
        throw new TypeError(`Expected a boolean, got ${typeof _should} (${should})`);
    }
    should = _should;
};
exports.setShouldOpenBrowser = setShouldOpenBrowser;
const getShouldOpenBrowser = () => {
    return should;
};
exports.getShouldOpenBrowser = getShouldOpenBrowser;
