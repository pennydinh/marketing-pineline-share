"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeFromFileExistence = void 0;
const file_existence_watchers_1 = require("../file-existence-watchers");
const unsubscribeFromFileExistence = ({ input, remotionRoot }) => {
    (0, file_existence_watchers_1.unsubscribeFromFileExistenceWatchers)({
        file: input.file,
        clientId: input.clientId,
        remotionRoot,
    });
    return Promise.resolve(undefined);
};
exports.unsubscribeFromFileExistence = unsubscribeFromFileExistence;
