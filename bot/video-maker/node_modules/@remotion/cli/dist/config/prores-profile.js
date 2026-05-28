"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProResProfile = exports.getProResProfile = void 0;
let proResProfile;
const getProResProfile = () => {
    return proResProfile;
};
exports.getProResProfile = getProResProfile;
const setProResProfile = (profile) => {
    proResProfile = profile;
};
exports.setProResProfile = setProResProfile;
