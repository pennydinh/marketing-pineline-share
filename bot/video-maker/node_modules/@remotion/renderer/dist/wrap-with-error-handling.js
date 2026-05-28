"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapWithErrorHandling = void 0;
const print_useful_error_message_1 = require("./print-useful-error-message");
const wrapWithErrorHandling = (fn) => {
    return async (...args) => {
        try {
            return await fn(...args);
        }
        catch (err) {
            const { indent } = args[0];
            const { logLevel } = args[0];
            (0, print_useful_error_message_1.printUsefulErrorMessage)(err, logLevel, indent);
            throw err;
        }
    };
};
exports.wrapWithErrorHandling = wrapWithErrorHandling;
