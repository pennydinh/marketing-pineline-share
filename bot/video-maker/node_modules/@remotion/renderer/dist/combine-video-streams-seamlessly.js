"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineVideoStreamsSeamlessly = void 0;
const combineVideoStreamsSeamlessly = ({ files }) => {
    const fileList = `concat:${files.join('|')}`;
    return fileList;
};
exports.combineVideoStreamsSeamlessly = combineVideoStreamsSeamlessly;
