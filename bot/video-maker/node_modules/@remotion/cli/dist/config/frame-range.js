"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRange = exports.setFrameRangeFromCli = exports.setFrameRange = void 0;
const renderer_1 = require("@remotion/renderer");
let range = null;
const setFrameRange = (newFrameRange) => {
    renderer_1.RenderInternals.validateFrameRange(newFrameRange);
    range = newFrameRange;
};
exports.setFrameRange = setFrameRange;
const setFrameRangeFromCli = (newFrameRange) => {
    if (typeof newFrameRange === 'number') {
        (0, exports.setFrameRange)(newFrameRange);
        range = newFrameRange;
        return;
    }
    if (typeof newFrameRange === 'string') {
        const parsed = newFrameRange.split('-').map((f) => Number(f));
        if (parsed.length > 2 || parsed.length <= 0) {
            throw new Error(`--frames flag must be a number or 2 numbers separated by '-', instead got ${parsed.length} numbers`);
        }
        if (parsed.length === 2 && parsed[1] < parsed[0]) {
            throw new Error('The second number of the --frames flag number should be greater or equal than first number');
        }
        for (const value of parsed) {
            if (isNaN(value)) {
                throw new Error('--frames flag must be a single number, or 2 numbers separated by `-`');
            }
        }
        (0, exports.setFrameRange)(parsed);
    }
};
exports.setFrameRangeFromCli = setFrameRangeFromCli;
const getRange = () => range;
exports.getRange = getRange;
