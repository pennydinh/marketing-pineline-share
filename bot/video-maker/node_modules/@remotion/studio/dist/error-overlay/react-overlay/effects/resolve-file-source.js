"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFileSource = void 0;
const resolveFileSource = async (location, contextLines) => {
    const res = await fetch(`/api/file-source?f=${encodeURIComponent(location.fileName)}`);
    const text = await res.text();
    const lines = text
        .split('\n')
        .map((l, i) => {
        const oneIndexedLineNumber = i + 1;
        return [oneIndexedLineNumber, l];
    })
        .filter(([oneIndexedLineNumber]) => {
        return (Math.abs(oneIndexedLineNumber - location.lineNumber) <= contextLines);
    });
    const scriptCode = lines.map(([num, line]) => {
        return {
            content: line,
            highlight: location.lineNumber === num,
            lineNumber: num,
        };
    });
    return {
        originalColumnNumber: location.columnNumber,
        originalFunctionName: null,
        originalFileName: location.fileName,
        originalLineNumber: location.lineNumber,
        originalScriptCode: scriptCode,
    };
};
exports.resolveFileSource = resolveFileSource;
