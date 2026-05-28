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
let boundErrorHandler = null;
function errorHandler(callback, e) {
    // @ts-expect-error
    if (!e.error) {
        return;
    }
    // @ts-expect-error
    const { error } = e;
    if (error instanceof Error) {
        callback(error);
    }
    else {
        // A non-error was thrown, we don't have a trace. :(
        // Look in your browser's devtools for more information
        callback(new Error(error));
    }
}
function registerUnhandledError(target, callback) {
    if (boundErrorHandler !== null) {
        return;
    }
    boundErrorHandler = errorHandler.bind(undefined, callback);
    target.addEventListener('error', boundErrorHandler);
}
exports.register = registerUnhandledError;
function unregisterUnhandledError(target) {
    if (boundErrorHandler === null) {
        return;
    }
    target.removeEventListener('error', boundErrorHandler);
    boundErrorHandler = null;
}
exports.unregister = unregisterUnhandledError;
