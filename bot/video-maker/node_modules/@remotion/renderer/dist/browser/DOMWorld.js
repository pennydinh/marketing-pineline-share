"use strict";
/**
 * Copyright 2019 Google Inc. All rights reserved.
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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _DOMWorld_frame, _DOMWorld_contextPromise, _DOMWorld_contextResolveCallback, _DOMWorld_detached, _DOMWorld_waitTasks, _WaitTask_instances, _WaitTask_domWorld, _WaitTask_timeout, _WaitTask_predicateBody, _WaitTask_args, _WaitTask_runCount, _WaitTask_resolve, _WaitTask_reject, _WaitTask_timeoutTimer, _WaitTask_terminated, _WaitTask_browser, _WaitTask_cleanup;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMWorld = void 0;
const assert_1 = require("./assert");
const Errors_1 = require("./Errors");
const util_1 = require("./util");
class DOMWorld {
    get _waitTasks() {
        return __classPrivateFieldGet(this, _DOMWorld_waitTasks, "f");
    }
    constructor(frame) {
        _DOMWorld_frame.set(this, void 0);
        _DOMWorld_contextPromise.set(this, null);
        _DOMWorld_contextResolveCallback.set(this, null);
        _DOMWorld_detached.set(this, false);
        _DOMWorld_waitTasks.set(this, new Set());
        // Keep own reference to client because it might differ from the FrameManager's
        // client for OOP iframes.
        __classPrivateFieldSet(this, _DOMWorld_frame, frame, "f");
        this._setContext(null);
    }
    frame() {
        return __classPrivateFieldGet(this, _DOMWorld_frame, "f");
    }
    _setContext(context) {
        var _a;
        if (context) {
            (0, assert_1.assert)(__classPrivateFieldGet(this, _DOMWorld_contextResolveCallback, "f"), 'Execution Context has already been set.');
            (_a = __classPrivateFieldGet(this, _DOMWorld_contextResolveCallback, "f")) === null || _a === void 0 ? void 0 : _a.call(null, context);
            __classPrivateFieldSet(this, _DOMWorld_contextResolveCallback, null, "f");
            for (const waitTask of this._waitTasks) {
                waitTask.rerun();
            }
        }
        else {
            __classPrivateFieldSet(this, _DOMWorld_contextPromise, new Promise((fulfill) => {
                __classPrivateFieldSet(this, _DOMWorld_contextResolveCallback, fulfill, "f");
            }), "f");
        }
    }
    _hasContext() {
        return !__classPrivateFieldGet(this, _DOMWorld_contextResolveCallback, "f");
    }
    _detach() {
        __classPrivateFieldSet(this, _DOMWorld_detached, true, "f");
        for (const waitTask of this._waitTasks) {
            waitTask.terminate(new Error('waitForFunction failed: frame got detached.'));
        }
    }
    executionContext() {
        if (__classPrivateFieldGet(this, _DOMWorld_detached, "f")) {
            throw new Error(`Execution context is not available in detached frame "${__classPrivateFieldGet(this, _DOMWorld_frame, "f").url()}" (are you trying to evaluate?)`);
        }
        if (__classPrivateFieldGet(this, _DOMWorld_contextPromise, "f") === null) {
            throw new Error(`Execution content promise is missing`);
        }
        return __classPrivateFieldGet(this, _DOMWorld_contextPromise, "f");
    }
    async evaluateHandle(pageFunction, ...args) {
        const context = await this.executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }
    async evaluate(pageFunction, ...args) {
        const context = await this.executionContext();
        return context.evaluate(pageFunction, ...args);
    }
    waitForFunction({ browser, timeout, pageFunction, title, }) {
        return new WaitTask({
            domWorld: this,
            predicateBody: pageFunction,
            title,
            timeout,
            args: [],
            browser,
        });
    }
}
exports.DOMWorld = DOMWorld;
_DOMWorld_frame = new WeakMap(), _DOMWorld_contextPromise = new WeakMap(), _DOMWorld_contextResolveCallback = new WeakMap(), _DOMWorld_detached = new WeakMap(), _DOMWorld_waitTasks = new WeakMap();
const noop = () => undefined;
class WaitTask {
    constructor(options) {
        _WaitTask_instances.add(this);
        _WaitTask_domWorld.set(this, void 0);
        _WaitTask_timeout.set(this, void 0);
        _WaitTask_predicateBody.set(this, void 0);
        _WaitTask_args.set(this, void 0);
        _WaitTask_runCount.set(this, 0);
        _WaitTask_resolve.set(this, noop);
        _WaitTask_reject.set(this, noop);
        _WaitTask_timeoutTimer.set(this, void 0);
        _WaitTask_terminated.set(this, false);
        _WaitTask_browser.set(this, void 0);
        this.onBrowserClose = () => {
            return this.terminate(new Error('Browser was closed'));
        };
        this.onBrowserCloseSilent = () => {
            return this.terminate(null);
        };
        function getPredicateBody(predicateBody) {
            if ((0, util_1.isString)(predicateBody)) {
                return `return (${predicateBody});`;
            }
            return `return (${predicateBody})(...args);`;
        }
        __classPrivateFieldSet(this, _WaitTask_domWorld, options.domWorld, "f");
        __classPrivateFieldSet(this, _WaitTask_timeout, options.timeout, "f");
        __classPrivateFieldSet(this, _WaitTask_predicateBody, getPredicateBody(options.predicateBody), "f");
        __classPrivateFieldSet(this, _WaitTask_args, options.args, "f");
        __classPrivateFieldSet(this, _WaitTask_runCount, 0, "f");
        __classPrivateFieldGet(this, _WaitTask_domWorld, "f")._waitTasks.add(this);
        this.promise = new Promise((resolve, reject) => {
            __classPrivateFieldSet(this, _WaitTask_resolve, resolve, "f");
            __classPrivateFieldSet(this, _WaitTask_reject, reject, "f");
        });
        // Since page navigation requires us to re-install the pageScript, we should track
        // timeout on our end.
        if (options.timeout) {
            const timeoutError = new Errors_1.TimeoutError(`waiting for ${options.title} failed: timeout ${options.timeout}ms exceeded`);
            __classPrivateFieldSet(this, _WaitTask_timeoutTimer, setTimeout(() => {
                return __classPrivateFieldGet(this, _WaitTask_reject, "f").call(this, timeoutError);
            }, options.timeout), "f");
        }
        __classPrivateFieldSet(this, _WaitTask_browser, options.browser, "f");
        __classPrivateFieldGet(this, _WaitTask_browser, "f").on("closed" /* BrowserEmittedEvents.Closed */, this.onBrowserClose);
        __classPrivateFieldGet(this, _WaitTask_browser, "f").on("closed-silent" /* BrowserEmittedEvents.ClosedSilent */, this.onBrowserCloseSilent);
        this.rerun();
    }
    terminate(error) {
        __classPrivateFieldSet(this, _WaitTask_terminated, true, "f");
        if (error) {
            __classPrivateFieldGet(this, _WaitTask_reject, "f").call(this, error);
        }
        __classPrivateFieldGet(this, _WaitTask_instances, "m", _WaitTask_cleanup).call(this);
    }
    async rerun() {
        var _a;
        const runCount = __classPrivateFieldSet(this, _WaitTask_runCount, (_a = __classPrivateFieldGet(this, _WaitTask_runCount, "f"), ++_a), "f");
        let success = null;
        let error = null;
        const context = await __classPrivateFieldGet(this, _WaitTask_domWorld, "f").executionContext();
        if (__classPrivateFieldGet(this, _WaitTask_terminated, "f") || runCount !== __classPrivateFieldGet(this, _WaitTask_runCount, "f")) {
            return;
        }
        if (__classPrivateFieldGet(this, _WaitTask_terminated, "f") || runCount !== __classPrivateFieldGet(this, _WaitTask_runCount, "f")) {
            return;
        }
        try {
            success = await context.evaluateHandle(waitForPredicatePageFunction, __classPrivateFieldGet(this, _WaitTask_predicateBody, "f"), __classPrivateFieldGet(this, _WaitTask_timeout, "f"), ...__classPrivateFieldGet(this, _WaitTask_args, "f"));
        }
        catch (error_) {
            error = error_;
        }
        if (__classPrivateFieldGet(this, _WaitTask_terminated, "f") || runCount !== __classPrivateFieldGet(this, _WaitTask_runCount, "f")) {
            if (success) {
                await success.dispose();
            }
            return;
        }
        // Ignore timeouts in pageScript - we track timeouts ourselves.
        // If the frame's execution context has already changed, `frame.evaluate` will
        // throw an error - ignore this predicate run altogether.
        if (!error &&
            (await __classPrivateFieldGet(this, _WaitTask_domWorld, "f")
                .evaluate((s) => {
                return !s;
            }, success)
                .catch(() => {
                return true;
            }))) {
            if (!success) {
                throw new Error('Assertion: result handle is not available');
            }
            await success.dispose();
            return;
        }
        if (error) {
            if (error.message.includes('TypeError: binding is not a function')) {
                return this.rerun();
            }
            // When frame is detached the task should have been terminated by the DOMWorld.
            // This can fail if we were adding this task while the frame was detached,
            // so we terminate here instead.
            if (error.message.includes('Execution context is not available in detached frame')) {
                this.terminate(new Error('waitForFunction failed: frame got detached.'));
                return;
            }
            // When the page is navigated, the promise is rejected.
            // We will try again in the new execution context.
            if (error.message.includes('Execution context was destroyed')) {
                return;
            }
            // We could have tried to evaluate in a context which was already
            // destroyed.
            if (error.message.includes('Cannot find context with specified id')) {
                return;
            }
            __classPrivateFieldGet(this, _WaitTask_reject, "f").call(this, error);
        }
        else {
            if (!success) {
                throw new Error('Assertion: result handle is not available');
            }
            __classPrivateFieldGet(this, _WaitTask_resolve, "f").call(this, success);
        }
        __classPrivateFieldGet(this, _WaitTask_instances, "m", _WaitTask_cleanup).call(this);
    }
}
_WaitTask_domWorld = new WeakMap(), _WaitTask_timeout = new WeakMap(), _WaitTask_predicateBody = new WeakMap(), _WaitTask_args = new WeakMap(), _WaitTask_runCount = new WeakMap(), _WaitTask_resolve = new WeakMap(), _WaitTask_reject = new WeakMap(), _WaitTask_timeoutTimer = new WeakMap(), _WaitTask_terminated = new WeakMap(), _WaitTask_browser = new WeakMap(), _WaitTask_instances = new WeakSet(), _WaitTask_cleanup = function _WaitTask_cleanup() {
    if (__classPrivateFieldGet(this, _WaitTask_timeoutTimer, "f") !== undefined) {
        clearTimeout(__classPrivateFieldGet(this, _WaitTask_timeoutTimer, "f"));
    }
    __classPrivateFieldGet(this, _WaitTask_browser, "f").off("closed" /* BrowserEmittedEvents.Closed */, this.onBrowserClose);
    __classPrivateFieldGet(this, _WaitTask_browser, "f").off("closed-silent" /* BrowserEmittedEvents.ClosedSilent */, this.onBrowserCloseSilent);
    if (__classPrivateFieldGet(this, _WaitTask_domWorld, "f")._waitTasks.size > 100) {
        throw new Error('Leak detected: Too many WaitTasks');
    }
    __classPrivateFieldGet(this, _WaitTask_domWorld, "f")._waitTasks.delete(this);
};
function waitForPredicatePageFunction(predicateBody, timeout, ...args) {
    // eslint-disable-next-line no-new-func
    const predicate = new Function('...args', predicateBody);
    let timedOut = false;
    if (timeout) {
        setTimeout(() => {
            timedOut = true;
        }, timeout);
    }
    return new Promise((resolve) => {
        async function onRaf() {
            if (timedOut) {
                resolve(undefined);
                return;
            }
            const success = await predicate(...args);
            if (success) {
                resolve(success);
            }
            else {
                requestAnimationFrame(onRaf);
            }
        }
        onRaf();
    });
}
