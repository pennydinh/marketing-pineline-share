"use strict";
/*
    Source code adapted from https://github.com/facebook/create-react-app/tree/main/packages/react-error-overlay and refactored in Typescript. This file is MIT-licensed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregister = exports.register = void 0;
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
let boundRejectionHandler = null;
function rejectionHandler(callback, e) {
    if (!(e === null || e === void 0 ? void 0 : e.reason)) {
        return callback(new Error('Unknown'));
    }
    const { reason } = e;
    if (reason instanceof Error) {
        return callback(reason);
    }
    // A non-error was rejected, we don't have a trace :(
    // Look in your browser's devtools for more information
    return callback(new Error(reason));
}
function registerUnhandledRejection(target, callback) {
    if (boundRejectionHandler !== null) {
        return;
    }
    boundRejectionHandler = rejectionHandler.bind(undefined, callback);
    target.addEventListener('unhandledrejection', boundRejectionHandler);
}
exports.register = registerUnhandledRejection;
function unregisterUnhandledRejection(target) {
    if (boundRejectionHandler === null) {
        return;
    }
    target.removeEventListener('unhandledrejection', boundRejectionHandler);
    boundRejectionHandler = null;
}
exports.unregister = unregisterUnhandledRejection;
