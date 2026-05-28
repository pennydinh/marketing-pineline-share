"use strict";
/*
    Source code adapted from https://github.com/facebook/create-react-app/tree/main/packages/react-error-overlay and refactored in Typescript. This file is MIT-licensed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmap = exports.getFileContents = void 0;
const remotion_1 = require("remotion");
const get_lines_around_1 = require("./get-lines-around");
const get_source_map_1 = require("./get-source-map");
const getFileContents = async (fileName) => {
    const res = await fetch(fileName);
    const fileContents = await res.text();
    return fileContents;
};
exports.getFileContents = getFileContents;
const unmap = async (frames, contextLines) => {
    const transpiled = frames
        .filter((s) => s.type === 'transpiled')
        .map((s) => s.frame);
    const uniqueFileNames = [
        ...new Set(transpiled.map((f) => f.fileName).filter(remotion_1.Internals.truthy)),
    ];
    const maps = await Promise.all(uniqueFileNames.map(async (fileName) => {
        const fileContents = await (0, exports.getFileContents)(fileName);
        return (0, get_source_map_1.getSourceMap)(fileName, fileContents);
    }));
    const mapValues = {};
    for (let i = 0; i < uniqueFileNames.length; i++) {
        mapValues[uniqueFileNames[i]] = maps[i];
    }
    return frames
        .map((frame) => {
        if (frame.type === 'symbolicated') {
            return frame.frame;
        }
        const map = mapValues[frame.frame.fileName];
        if (!map) {
            return null;
        }
        const pos = (0, get_source_map_1.getOriginalPosition)(map, frame.frame.lineNumber, frame.frame.columnNumber);
        const { functionName } = frame.frame;
        let hasSource = null;
        hasSource = pos.source ? map.sourceContentFor(pos.source, false) : null;
        const scriptCode = hasSource && pos.line
            ? (0, get_lines_around_1.getLinesAround)(pos.line, contextLines, hasSource.split('\n'))
            : null;
        return {
            originalColumnNumber: pos.column,
            originalFileName: pos.source,
            originalFunctionName: functionName,
            originalLineNumber: pos.line,
            originalScriptCode: scriptCode,
        };
    })
        .filter(remotion_1.Internals.truthy);
};
exports.unmap = unmap;
