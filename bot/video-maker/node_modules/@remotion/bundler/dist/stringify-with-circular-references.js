"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonStringifyWithCircularReferences = void 0;
const jsonStringifyWithCircularReferences = (circ) => {
    let seen = [];
    const val = JSON.stringify(circ, (_, value) => {
        if (typeof value === 'object' && value !== null && seen) {
            if (seen.includes(value)) {
                return '[Circular]';
            }
            seen.push(value);
        }
        return value;
    });
    seen = null;
    return val;
};
exports.jsonStringifyWithCircularReferences = jsonStringifyWithCircularReferences;
