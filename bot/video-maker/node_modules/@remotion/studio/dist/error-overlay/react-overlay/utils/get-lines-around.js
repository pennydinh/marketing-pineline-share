"use strict";
/*
    Source code adapted from https://github.com/facebook/create-react-app/tree/main/packages/react-error-overlay and refactored in Typescript. This file is MIT-licensed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinesAround = void 0;
/**
 *
 * @param {number} line The line number to provide context around.
 * @param {number} count The number of lines you'd like for context.
 * @param {string[] | string} lines The source code.
 */
function getLinesAround(line, count, lines) {
    const result = [];
    for (let index = Math.max(0, line - 1 - count); index <= Math.min(lines.length - 1, line - 1 + count); ++index) {
        result.push({
            lineNumber: index + 1,
            content: lines[index],
            highlight: index === line - 1,
        });
    }
    return result;
}
exports.getLinesAround = getLinesAround;
