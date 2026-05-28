"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToFileExistence = void 0;
const file_existence_watchers_1 = require("../file-existence-watchers");
const subscribeToFileExistence = ({ input: { file, clientId }, remotionRoot }) => {
    const { exists } = (0, file_existence_watchers_1.subscribeToFileExistenceWatchers)({
        file,
        remotionRoot,
        clientId,
    });
    return Promise.resolve({ exists });
};
exports.subscribeToFileExistence = subscribeToFileExistence;
