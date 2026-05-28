"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTTPRequest_isNavigationRequest, _HTTPRequest_frame;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPRequest = void 0;
class HTTPRequest {
    constructor(frame, event) {
        this._response = null;
        this._url = null;
        this._fromMemoryCache = false;
        _HTTPRequest_isNavigationRequest.set(this, void 0);
        _HTTPRequest_frame.set(this, void 0);
        this._requestId = event.requestId;
        __classPrivateFieldSet(this, _HTTPRequest_isNavigationRequest, event.requestId === event.loaderId && event.type === 'Document', "f");
        __classPrivateFieldSet(this, _HTTPRequest_frame, frame, "f");
        this._url = event.request.url;
    }
    response() {
        return this._response;
    }
    frame() {
        return __classPrivateFieldGet(this, _HTTPRequest_frame, "f");
    }
    isNavigationRequest() {
        return __classPrivateFieldGet(this, _HTTPRequest_isNavigationRequest, "f");
    }
}
exports.HTTPRequest = HTTPRequest;
_HTTPRequest_isNavigationRequest = new WeakMap(), _HTTPRequest_frame = new WeakMap();
