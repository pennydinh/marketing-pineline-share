"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStackFrame = void 0;
const makeStackFrame = ({ functionName, fileName, lineNumber, columnNumber, }) => {
    if (functionName && functionName.indexOf('Object.') === 0) {
        functionName = functionName.slice('Object.'.length);
    }
    if (
    // Chrome has a bug with inferring function.name:
    // https://github.com/facebook/create-react-app/issues/2097
    // Let's ignore a meaningless name we get for top-level modules.
    functionName === 'friendlySyntaxErrorLabel' ||
        functionName === 'exports.__esModule' ||
        functionName === '<anonymous>' ||
        !functionName) {
        functionName = null;
    }
    return {
        columnNumber,
        fileName,
        functionName,
        lineNumber,
    };
};
exports.makeStackFrame = makeStackFrame;
