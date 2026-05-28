"use strict";
/* eslint-disable no-console */
/*
    Source code adapted from https://github.com/facebook/create-react-app/tree/main/packages/react-error-overlay and refactored in Typescript. This file is MIT-licensed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregisterReactStack = exports.registerReactStack = exports.permanentRegister = void 0;
const reactFrameStack = [];
// This is a stripped down barebones version of this proposal:
// https://gist.github.com/sebmarkbage/bdefa100f19345229d526d0fdd22830f
// We're implementing just enough to get the invalid element type warnings
// to display the component stack in React 15.6+:
// https://github.com/facebook/react/pull/9679
const registerReactStack = () => {
    if (typeof console !== 'undefined') {
        // @ts-expect-error
        console.reactStack = (frames) => reactFrameStack.push(frames);
        // @ts-expect-error
        console.reactStackEnd = () => reactFrameStack.pop();
    }
};
exports.registerReactStack = registerReactStack;
const unregisterReactStack = () => {
    if (typeof console !== 'undefined') {
        // @ts-expect-error
        console.reactStack = undefined;
        // @ts-expect-error
        console.reactStackEnd = undefined;
    }
};
exports.unregisterReactStack = unregisterReactStack;
const permanentRegister = function (type, callback) {
    if (typeof console !== 'undefined') {
        const orig = console[type];
        if (typeof orig === 'function') {
            console[type] = function (...args) {
                try {
                    const message = args[0];
                    if (typeof message === 'string' && reactFrameStack.length > 0) {
                        callback({
                            type: 'webpack-error',
                            message,
                            frames: reactFrameStack[reactFrameStack.length - 1],
                        });
                    }
                    if (message instanceof Error) {
                        callback({
                            type: 'build-error',
                            error: message,
                        });
                    }
                }
                catch (err) {
                    // Warnings must never crash. Rethrow with a clean stack.
                    setTimeout(() => {
                        throw err;
                    });
                }
                return orig.apply(this, args);
            };
        }
    }
};
exports.permanentRegister = permanentRegister;
