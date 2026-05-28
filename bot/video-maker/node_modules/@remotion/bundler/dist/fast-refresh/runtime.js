"use strict";
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/**
 * Source code is adapted from https://github.com/WebHotelier/webpack-fast-refresh#readme and rewritten in Typescript. This file is MIT licensed.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RefreshRuntime = require('react-refresh/runtime');
const helpers_1 = __importDefault(require("./helpers"));
// Hook into ReactDOM initialization
RefreshRuntime.injectIntoGlobalHook(self);
// noop fns to prevent runtime errors during initialization
self.$RefreshReg$ = () => undefined;
self.$RefreshSig$ = () => (type) => type;
// Register global helpers
self.$RefreshHelpers$ = helpers_1.default;
// Register a helper for module execution interception
self.$RefreshInterceptModuleExecution$ = function (webpackModuleId) {
    const prevRefreshReg = self.$RefreshReg$;
    const prevRefreshSig = self.$RefreshSig$;
    self.$RefreshReg$ = (type, id) => {
        RefreshRuntime.register(type, webpackModuleId + ' ' + id);
    };
    self.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
    // Modeled after `useEffect` cleanup pattern:
    return () => {
        self.$RefreshReg$ = prevRefreshReg;
        self.$RefreshSig$ = prevRefreshSig;
    };
};
