"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startReportingRuntimeErrors = exports.didUnmountReactApp = void 0;
const remotion_1 = require("remotion");
const listen_to_runtime_errors_1 = require("./listen-to-runtime-errors");
let stopListeningToRuntimeErrors = null;
const didUnmountReactApp = () => {
    var _a;
    return !((_a = remotion_1.Internals.getPreviewDomElement()) === null || _a === void 0 ? void 0 : _a.hasChildNodes());
};
exports.didUnmountReactApp = didUnmountReactApp;
function startReportingRuntimeErrors(onError) {
    if (stopListeningToRuntimeErrors !== null) {
        throw new Error('Already listening');
    }
    const handleRuntimeError = () => {
        onError();
    };
    stopListeningToRuntimeErrors = (0, listen_to_runtime_errors_1.listenToRuntimeErrors)(handleRuntimeError);
}
exports.startReportingRuntimeErrors = startReportingRuntimeErrors;
