"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNumberOfSharedAudioTags = exports.getNumberOfSharedAudioTags = void 0;
let numberOfSharedAudioTags = 0;
const getNumberOfSharedAudioTags = () => {
    return numberOfSharedAudioTags;
};
exports.getNumberOfSharedAudioTags = getNumberOfSharedAudioTags;
const setNumberOfSharedAudioTags = (audioTags) => {
    numberOfSharedAudioTags = audioTags;
};
exports.setNumberOfSharedAudioTags = setNumberOfSharedAudioTags;
