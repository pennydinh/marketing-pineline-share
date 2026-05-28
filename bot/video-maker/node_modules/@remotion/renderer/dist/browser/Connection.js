"use strict";
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
var _Connection_instances, _Connection_lastId, _Connection_sessions, _Connection_closed, _Connection_callbacks, _Connection_onMessage, _Connection_onClose, _CDPSession_sessionId, _CDPSession_targetType, _CDPSession_callbacks, _CDPSession_connection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDPSession = exports.CDPSessionEmittedEvents = exports.Connection = void 0;
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
const logger_1 = require("../logger");
const Errors_1 = require("./Errors");
const EventEmitter_1 = require("./EventEmitter");
const ConnectionEmittedEvents = {
    Disconnected: Symbol('Connection.Disconnected'),
};
class Connection extends EventEmitter_1.EventEmitter {
    constructor(transport) {
        super();
        _Connection_instances.add(this);
        _Connection_lastId.set(this, 0);
        _Connection_sessions.set(this, new Map());
        _Connection_closed.set(this, false);
        _Connection_callbacks.set(this, new Map());
        this.transport = transport;
        this.transport.onmessage = __classPrivateFieldGet(this, _Connection_instances, "m", _Connection_onMessage).bind(this);
        this.transport.onclose = __classPrivateFieldGet(this, _Connection_instances, "m", _Connection_onClose).bind(this);
    }
    static fromSession(session) {
        return session.connection();
    }
    session(sessionId) {
        return __classPrivateFieldGet(this, _Connection_sessions, "f").get(sessionId) || null;
    }
    send(method, ...paramArgs) {
        // There is only ever 1 param arg passed, but the Protocol defines it as an
        // array of 0 or 1 items See this comment:
        // https://github.com/ChromeDevTools/devtools-protocol/pull/113#issuecomment-412603285
        // which explains why the protocol defines the params this way for better
        // type-inference.
        // So now we check if there are any params or not and deal with them accordingly.
        const params = paramArgs.length ? paramArgs[0] : undefined;
        const id = this._rawSend({ method, params });
        return new Promise((resolve, reject) => {
            var _a;
            __classPrivateFieldGet(this, _Connection_callbacks, "f").set(id, {
                resolve,
                reject,
                method,
                returnSize: true,
                stack: (_a = new Error().stack) !== null && _a !== void 0 ? _a : '',
                fn: method + JSON.stringify(params),
            });
        });
    }
    _rawSend(message) {
        var _a;
        const id = __classPrivateFieldSet(this, _Connection_lastId, (_a = __classPrivateFieldGet(this, _Connection_lastId, "f"), ++_a), "f");
        const stringifiedMessage = JSON.stringify({ ...message, id });
        this.transport.send(stringifiedMessage);
        return id;
    }
    dispose() {
        __classPrivateFieldGet(this, _Connection_instances, "m", _Connection_onClose).call(this);
        this.transport.close();
    }
    /**
     * @param targetInfo - The target info
     * @returns The CDP session that is created
     */
    async createSession(targetInfo) {
        const { value: { sessionId }, } = await this.send('Target.attachToTarget', {
            targetId: targetInfo.targetId,
            flatten: true,
        });
        const session = __classPrivateFieldGet(this, _Connection_sessions, "f").get(sessionId);
        if (!session) {
            throw new Error('CDPSession creation failed.');
        }
        return session;
    }
}
exports.Connection = Connection;
_Connection_lastId = new WeakMap(), _Connection_sessions = new WeakMap(), _Connection_closed = new WeakMap(), _Connection_callbacks = new WeakMap(), _Connection_instances = new WeakSet(), _Connection_onMessage = function _Connection_onMessage(message) {
    const object = JSON.parse(message);
    if (object.method === 'Target.attachedToTarget') {
        const { sessionId } = object.params;
        const session = new CDPSession(this, object.params.targetInfo.type, sessionId);
        __classPrivateFieldGet(this, _Connection_sessions, "f").set(sessionId, session);
        this.emit('sessionattached', session);
        const parentSession = __classPrivateFieldGet(this, _Connection_sessions, "f").get(object.sessionId);
        if (parentSession) {
            parentSession.emit('sessionattached', session);
        }
    }
    else if (object.method === 'Target.detachedFromTarget') {
        const session = __classPrivateFieldGet(this, _Connection_sessions, "f").get(object.params.sessionId);
        if (session) {
            session._onClosed();
            __classPrivateFieldGet(this, _Connection_sessions, "f").delete(object.params.sessionId);
            this.emit('sessiondetached', session);
            const parentSession = __classPrivateFieldGet(this, _Connection_sessions, "f").get(object.sessionId);
            if (parentSession) {
                parentSession.emit('sessiondetached', session);
            }
        }
    }
    if (object.sessionId) {
        const session = __classPrivateFieldGet(this, _Connection_sessions, "f").get(object.sessionId);
        if (session) {
            session._onMessage(object, message.length);
        }
    }
    else if (object.id) {
        const callback = __classPrivateFieldGet(this, _Connection_callbacks, "f").get(object.id);
        // Callbacks could be all rejected if someone has called `.dispose()`.
        if (callback) {
            __classPrivateFieldGet(this, _Connection_callbacks, "f").delete(object.id);
            if (object.error) {
                callback.reject(createProtocolError(callback.method, object));
            }
            else if (callback.returnSize) {
                callback.resolve({ value: object.result, size: message.length });
            }
            else {
                callback.resolve(object.result);
            }
        }
    }
    else {
        this.emit(object.method, object.params);
    }
}, _Connection_onClose = function _Connection_onClose() {
    if (__classPrivateFieldGet(this, _Connection_closed, "f")) {
        return;
    }
    this.transport.onmessage = undefined;
    this.transport.onclose = undefined;
    for (const callback of __classPrivateFieldGet(this, _Connection_callbacks, "f").values()) {
        callback.reject(rewriteError(new Errors_1.ProtocolError(), `Protocol error (${callback.method}): Target closed. https://www.remotion.dev/docs/target-closed`));
    }
    __classPrivateFieldGet(this, _Connection_callbacks, "f").clear();
    for (const session of __classPrivateFieldGet(this, _Connection_sessions, "f").values()) {
        session._onClosed();
    }
    __classPrivateFieldGet(this, _Connection_sessions, "f").clear();
    this.emit(ConnectionEmittedEvents.Disconnected);
};
exports.CDPSessionEmittedEvents = {
    Disconnected: Symbol('CDPSession.Disconnected'),
};
class CDPSession extends EventEmitter_1.EventEmitter {
    constructor(connection, targetType, sessionId) {
        super();
        _CDPSession_sessionId.set(this, void 0);
        _CDPSession_targetType.set(this, void 0);
        _CDPSession_callbacks.set(this, new Map());
        _CDPSession_connection.set(this, void 0);
        __classPrivateFieldSet(this, _CDPSession_connection, connection, "f");
        __classPrivateFieldSet(this, _CDPSession_targetType, targetType, "f");
        __classPrivateFieldSet(this, _CDPSession_sessionId, sessionId, "f");
    }
    connection() {
        return __classPrivateFieldGet(this, _CDPSession_connection, "f");
    }
    send(method, ...paramArgs) {
        if (!__classPrivateFieldGet(this, _CDPSession_connection, "f")) {
            return Promise.reject(new Error(`Protocol error (${method}): Session closed. Most likely the ${__classPrivateFieldGet(this, _CDPSession_targetType, "f")} has been closed.`));
        }
        // See the comment in Connection#send explaining why we do this.
        const params = paramArgs.length ? paramArgs[0] : undefined;
        const id = __classPrivateFieldGet(this, _CDPSession_connection, "f")._rawSend({
            sessionId: __classPrivateFieldGet(this, _CDPSession_sessionId, "f"),
            method,
            params,
        });
        return new Promise((resolve, reject) => {
            var _a;
            if (__classPrivateFieldGet(this, _CDPSession_callbacks, "f").size > 100) {
                for (const callback of __classPrivateFieldGet(this, _CDPSession_callbacks, "f").values()) {
                    logger_1.Log.info({ indent: false, logLevel: 'info' }, callback.fn);
                }
                throw new Error('Leak detected: Too many callbacks');
            }
            __classPrivateFieldGet(this, _CDPSession_callbacks, "f").set(id, {
                resolve,
                reject,
                method,
                returnSize: true,
                stack: (_a = new Error().stack) !== null && _a !== void 0 ? _a : '',
                fn: method + JSON.stringify(params),
            });
        });
    }
    _onMessage(object, size) {
        const callback = object.id ? __classPrivateFieldGet(this, _CDPSession_callbacks, "f").get(object.id) : undefined;
        if (object.id && callback) {
            __classPrivateFieldGet(this, _CDPSession_callbacks, "f").delete(object.id);
            if (object.error) {
                callback.reject(createProtocolError(callback.method, object));
            }
            else if (callback.returnSize) {
                callback.resolve({ value: object.result, size });
            }
            else {
                callback.resolve(object.result);
            }
        }
        else {
            this.emit(object.method, object.params);
        }
    }
    _onClosed() {
        __classPrivateFieldSet(this, _CDPSession_connection, undefined, "f");
        for (const callback of __classPrivateFieldGet(this, _CDPSession_callbacks, "f").values()) {
            callback.reject(rewriteError(new Errors_1.ProtocolError(), `Protocol error (${callback.method}): Target closed. https://www.remotion.dev/docs/target-closed`));
        }
        __classPrivateFieldGet(this, _CDPSession_callbacks, "f").clear();
        this.emit(exports.CDPSessionEmittedEvents.Disconnected);
    }
    id() {
        return __classPrivateFieldGet(this, _CDPSession_sessionId, "f");
    }
}
exports.CDPSession = CDPSession;
_CDPSession_sessionId = new WeakMap(), _CDPSession_targetType = new WeakMap(), _CDPSession_callbacks = new WeakMap(), _CDPSession_connection = new WeakMap();
function createProtocolError(method, object) {
    let message = `Protocol error (${method}): ${object.error.message}`;
    if ('data' in object.error) {
        message += ` ${object.error.data}`;
    }
    return rewriteError(new Errors_1.ProtocolError(), message, object.error.message);
}
function rewriteError(error, message, originalMessage) {
    error.message = message;
    error.originalMessage = originalMessage !== null && originalMessage !== void 0 ? originalMessage : error.originalMessage;
    return error;
}
