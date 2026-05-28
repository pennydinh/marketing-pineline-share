"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLocation = void 0;
const formatLocation = (location) => {
    if (location.startsWith('webpack://')) {
        return location.replace('webpack://', '');
    }
    return location;
};
exports.formatLocation = formatLocation;
