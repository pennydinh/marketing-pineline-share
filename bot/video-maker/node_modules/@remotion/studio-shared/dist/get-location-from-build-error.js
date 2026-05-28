"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationFromBuildError = void 0;
const no_react_1 = require("remotion/no-react");
const getLocationFromBuildError = (err) => {
    var _a;
    if (!err.stack) {
        return null;
    }
    if (!err.stack.startsWith('Error: Module build failed') &&
        !err.stack.startsWith('Error: Cannot find module')) {
        return null;
    }
    const split = err.stack.split('\n');
    return ((_a = split
        .map((s) => {
        if (s.startsWith('Error')) {
            return null;
        }
        const matchWebpackOrEsbuild = s.match(/(.*):([0-9]+):([0-9]+): (.*)/);
        if (matchWebpackOrEsbuild) {
            return {
                fileName: matchWebpackOrEsbuild[1],
                lineNumber: Number(matchWebpackOrEsbuild[2]),
                columnNumber: Number(matchWebpackOrEsbuild[3]),
                message: matchWebpackOrEsbuild[4],
            };
        }
        const matchMissingModule = s.match(/\s+at(.*)\s\((.*)\)/);
        if (!matchMissingModule) {
            return null;
        }
        if (s.includes('webpackMissingModule')) {
            return null;
        }
        const [, filename] = matchMissingModule;
        return {
            columnNumber: 0,
            lineNumber: 1,
            message: split[0],
            fileName: filename.trim(),
        };
    })
        .filter(no_react_1.NoReactInternals.truthy)[0]) !== null && _a !== void 0 ? _a : null);
};
exports.getLocationFromBuildError = getLocationFromBuildError;
