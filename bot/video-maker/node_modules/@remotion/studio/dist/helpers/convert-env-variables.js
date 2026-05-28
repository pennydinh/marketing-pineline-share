"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariablesArrayToObject = exports.envVariablesObjectToArray = void 0;
const envVariablesObjectToArray = (envVariables) => {
    return Object.entries(envVariables).map(([key, one]) => [
        key.trim().toUpperCase(),
        one.trim(),
    ]);
};
exports.envVariablesObjectToArray = envVariablesObjectToArray;
const envVariablesArrayToObject = (envVariables) => {
    return envVariables
        .map(([key, val]) => [key.trim(), val.trim()])
        .filter(([key, val]) => key && val)
        .reduce((acc, [key, value]) => {
        acc[key.toUpperCase()] = value;
        return acc;
    }, {});
};
exports.envVariablesArrayToObject = envVariablesArrayToObject;
