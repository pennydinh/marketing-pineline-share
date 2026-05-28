"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOriginalSourceAttribution = void 0;
const getOriginalSourceAttribution = (originalLocation) => {
    if (!originalLocation.source) {
        return '';
    }
    const split = originalLocation.source.split('/');
    const last = split[split.length - 1];
    if (last.startsWith('index')) {
        const lastTwo = split[split.length - 2];
        return `${lastTwo}/${last}:${originalLocation.line}`;
    }
    return `${last}:${originalLocation.line}`;
};
exports.getOriginalSourceAttribution = getOriginalSourceAttribution;
