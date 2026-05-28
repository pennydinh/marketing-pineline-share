"use strict";
/*
    Source code adapted from https://github.com/facebook/create-react-app/tree/main/packages/react-error-overlay and refactored in Typescript. This file is MIT-licensed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.massageWarning = void 0;
function stripInlineStacktrace(message) {
    return message
        .split('\n')
        .filter((line) => !line.match(/^\s*in/))
        .join('\n'); // "  in Foo"
}
function massageWarning(warning, frames) {
    const message = stripInlineStacktrace(warning);
    // Reassemble the stack with full filenames provided by React
    let stack = '';
    let lastFilename;
    let lastLineNumber;
    for (let index = 0; index < frames.length; ++index) {
        const { fileName, lineNumber } = frames[index];
        if (fileName === null ||
            lineNumber === null ||
            lineNumber === undefined ||
            fileName === undefined) {
            continue;
        }
        if (fileName === lastFilename &&
            typeof lineNumber === 'number' &&
            typeof lastLineNumber === 'number' &&
            Math.abs(lineNumber - lastLineNumber) < 3) {
            continue;
        }
        lastFilename = fileName;
        lastLineNumber = lineNumber;
        let { name } = frames[index];
        name = name || '(anonymous function)';
        stack += `in ${name} (at ${fileName}:${lineNumber})\n`;
    }
    return { message, stack };
}
exports.massageWarning = massageWarning;
