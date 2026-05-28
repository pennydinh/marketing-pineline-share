"use strict";
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrnoException = exports.isErrorLike = exports.waitWithTimeout = exports.pageBindingDeliverErrorValueString = exports.pageBindingDeliverErrorString = exports.pageBindingDeliverResultString = exports.evaluationString = exports.isString = exports.removeEventListeners = exports.addEventListener = exports.releaseObject = exports.valueFromRemoteObject = exports.getExceptionMessage = void 0;
const assert_1 = require("./assert");
const Errors_1 = require("./Errors");
function getExceptionMessage(exceptionDetails) {
    if (exceptionDetails.exception) {
        return (exceptionDetails.exception.description || exceptionDetails.exception.value);
    }
    let message = exceptionDetails.text;
    if (exceptionDetails.stackTrace) {
        for (const callframe of exceptionDetails.stackTrace.callFrames) {
            const location = callframe.url +
                ':' +
                callframe.lineNumber +
                ':' +
                callframe.columnNumber;
            const functionName = callframe.functionName || '<anonymous>';
            message += `\n    at ${functionName} (${location})`;
        }
    }
    return message;
}
exports.getExceptionMessage = getExceptionMessage;
function valueFromRemoteObject(remoteObject) {
    (0, assert_1.assert)(!remoteObject.objectId, 'Cannot extract value when objectId is given');
    if (remoteObject.unserializableValue) {
        if (remoteObject.type === 'bigint' && typeof BigInt !== 'undefined') {
            return BigInt(remoteObject.unserializableValue.replace('n', ''));
        }
        switch (remoteObject.unserializableValue) {
            case '-0':
                return -0;
            case 'NaN':
                return NaN;
            case 'Infinity':
                return Infinity;
            case '-Infinity':
                return -Infinity;
            default:
                throw new Error('Unsupported unserializable value: ' +
                    remoteObject.unserializableValue);
        }
    }
    return remoteObject.value;
}
exports.valueFromRemoteObject = valueFromRemoteObject;
async function releaseObject(client, remoteObject) {
    if (!remoteObject.objectId) {
        return;
    }
    await client
        .send('Runtime.releaseObject', { objectId: remoteObject.objectId })
        .catch(() => {
        // Exceptions might happen in case of a page been navigated or closed.
        // Swallow these since they are harmless and we don't leak anything in this case.
    });
}
exports.releaseObject = releaseObject;
function addEventListener(emitter, eventName, handler) {
    emitter.on(eventName, handler);
    return { emitter, eventName, handler };
}
exports.addEventListener = addEventListener;
function removeEventListeners(listeners) {
    for (const listener of listeners) {
        listener.emitter.off(listener.eventName, listener.handler);
    }
    listeners.length = 0;
}
exports.removeEventListeners = removeEventListeners;
const isString = (obj) => {
    return typeof obj === 'string' || obj instanceof String;
};
exports.isString = isString;
function evaluationString(fun, ...args) {
    if ((0, exports.isString)(fun)) {
        (0, assert_1.assert)(args.length === 0, 'Cannot evaluate a string with arguments');
        return fun;
    }
    function serializeArgument(arg) {
        if (Object.is(arg, undefined)) {
            return 'undefined';
        }
        return JSON.stringify(arg);
    }
    return `(${fun})(${args.map(serializeArgument).join(',')})`;
}
exports.evaluationString = evaluationString;
function pageBindingDeliverResultString(name, seq, result) {
    function deliverResult(_name, _seq, _result) {
        window[_name].callbacks.get(_seq).resolve(_result);
        window[_name].callbacks.delete(_seq);
    }
    return evaluationString(deliverResult, name, seq, result);
}
exports.pageBindingDeliverResultString = pageBindingDeliverResultString;
function pageBindingDeliverErrorString(name, seq, message, stack) {
    function deliverError(_name, _seq, _message, _stack) {
        const error = new Error(_message);
        error.stack = _stack;
        window[_name].callbacks.get(_seq).reject(error);
        window[_name].callbacks.delete(_seq);
    }
    return evaluationString(deliverError, name, seq, message, stack);
}
exports.pageBindingDeliverErrorString = pageBindingDeliverErrorString;
function pageBindingDeliverErrorValueString(name, seq, value) {
    function deliverErrorValue(_name, _seq, _value) {
        window[_name].callbacks.get(_seq).reject(_value);
        window[_name].callbacks.delete(_seq);
    }
    return evaluationString(deliverErrorValue, name, seq, value);
}
exports.pageBindingDeliverErrorValueString = pageBindingDeliverErrorValueString;
async function waitWithTimeout(promise, taskName, timeout, browser) {
    let reject;
    const timeoutError = new Errors_1.TimeoutError(`waiting for ${taskName} failed: timeout ${timeout}ms exceeded`);
    const timeoutPromise = new Promise((_res, rej) => {
        reject = rej;
    });
    let timeoutTimer = null;
    if (timeout) {
        timeoutTimer = setTimeout(() => {
            return reject(timeoutError);
        }, timeout);
    }
    try {
        return await Promise.race([
            new Promise((_, rej) => {
                browser.once("closed" /* BrowserEmittedEvents.Closed */, () => {
                    return rej();
                });
            }),
            promise,
            timeoutPromise,
        ]);
    }
    finally {
        if (timeoutTimer) {
            clearTimeout(timeoutTimer);
        }
    }
}
exports.waitWithTimeout = waitWithTimeout;
function isErrorLike(obj) {
    return (typeof obj === 'object' && obj !== null && 'name' in obj && 'message' in obj);
}
exports.isErrorLike = isErrorLike;
function isErrnoException(obj) {
    return (isErrorLike(obj) &&
        ('errno' in obj || 'code' in obj || 'path' in obj || 'syscall' in obj));
}
exports.isErrnoException = isErrnoException;
