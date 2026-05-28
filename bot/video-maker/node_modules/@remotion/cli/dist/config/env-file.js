"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDotEnvLocation = exports.setDotEnvLocation = void 0;
let envFile = null;
const setDotEnvLocation = (file) => {
    envFile = file;
};
exports.setDotEnvLocation = setDotEnvLocation;
const getDotEnvLocation = () => envFile;
exports.getDotEnvLocation = getDotEnvLocation;
