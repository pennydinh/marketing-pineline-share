"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinConcurrency = exports.getMaxConcurrency = exports.validateConcurrency = void 0;
const get_cpu_count_1 = require("./get-cpu-count");
const validateConcurrency = ({ setting, value, checkIfValidForCurrentMachine, }) => {
    if (typeof value === 'undefined') {
        return;
    }
    if (value === null) {
        return;
    }
    if (typeof value !== 'number' && typeof value !== 'string') {
        throw new Error(setting + ' must a number or a string but is ' + value);
    }
    if (typeof value === 'number') {
        if (value % 1 !== 0) {
            throw new Error(setting + ' must be an integer, but is ' + value);
        }
        if (checkIfValidForCurrentMachine) {
            if (value < (0, exports.getMinConcurrency)()) {
                throw new Error(`${setting} must be at least ${(0, exports.getMinConcurrency)()}, but is ${JSON.stringify(value)}`);
            }
            if (value > (0, exports.getMaxConcurrency)()) {
                throw new Error(`${setting} is set higher than the amount of CPU cores available. Available CPU cores: ${(0, exports.getMaxConcurrency)()}, value set: ${value}`);
            }
        }
    }
    else if (!/^\d+(\.\d+)?%$/.test(value)) {
        throw new Error(`${setting} must be a number or percentage, but is ${JSON.stringify(value)}`);
    }
};
exports.validateConcurrency = validateConcurrency;
const getMaxConcurrency = () => {
    return (0, get_cpu_count_1.getCpuCount)();
};
exports.getMaxConcurrency = getMaxConcurrency;
const getMinConcurrency = () => 1;
exports.getMinConcurrency = getMinConcurrency;
