"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeClientFileExistenceWatchers = exports.unsubscribeFromFileExistenceWatchers = exports.subscribeToFileExistenceWatchers = void 0;
const node_path_1 = __importDefault(require("node:path"));
const file_watcher_1 = require("../file-watcher");
const live_events_1 = require("./live-events");
const fileExistenceWatchers = {};
const subscribeToFileExistenceWatchers = ({ file: relativeFile, remotionRoot, clientId, }) => {
    const file = node_path_1.default.resolve(remotionRoot, relativeFile);
    const { unwatch, exists } = (0, file_watcher_1.installFileWatcher)({
        file,
        onChange: (type) => {
            if (type === 'created') {
                (0, live_events_1.waitForLiveEventsListener)().then((listener) => {
                    listener.sendEventToClient({
                        type: 'watched-file-undeleted',
                        // Must be relative file because that's what the client expects
                        file: relativeFile,
                    });
                });
            }
            if (type === 'deleted') {
                (0, live_events_1.waitForLiveEventsListener)().then((listener) => {
                    listener.sendEventToClient({
                        type: 'watched-file-deleted',
                        // Must be relative file because that's what the client expects
                        file: relativeFile,
                    });
                });
            }
        },
    });
    if (!fileExistenceWatchers[clientId]) {
        fileExistenceWatchers[clientId] = {};
    }
    fileExistenceWatchers[clientId][file] = unwatch;
    return { exists };
};
exports.subscribeToFileExistenceWatchers = subscribeToFileExistenceWatchers;
const unsubscribeFromFileExistenceWatchers = ({ file, remotionRoot, clientId, }) => {
    var _a, _b;
    const actualPath = node_path_1.default.resolve(remotionRoot, file);
    if (!fileExistenceWatchers[clientId]) {
        return;
    }
    (_b = (_a = fileExistenceWatchers[clientId])[actualPath]) === null || _b === void 0 ? void 0 : _b.call(_a);
    delete fileExistenceWatchers[clientId][actualPath];
};
exports.unsubscribeFromFileExistenceWatchers = unsubscribeFromFileExistenceWatchers;
const unsubscribeClientFileExistenceWatchers = (clientId) => {
    if (!fileExistenceWatchers[clientId]) {
        return;
    }
    Object.values(fileExistenceWatchers[clientId]).forEach((unwatch) => {
        unwatch();
    });
    delete fileExistenceWatchers[clientId];
};
exports.unsubscribeClientFileExistenceWatchers = unsubscribeClientFileExistenceWatchers;
