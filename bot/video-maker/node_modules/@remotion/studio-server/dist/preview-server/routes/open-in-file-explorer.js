"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOpenInFileExplorer = void 0;
const open_directory_in_finder_1 = require("../../open-directory-in-finder");
const handleOpenInFileExplorer = ({ input: { directory }, remotionRoot }) => {
    return (0, open_directory_in_finder_1.openDirectoryInFinder)(directory, remotionRoot);
};
exports.handleOpenInFileExplorer = handleOpenInFileExplorer;
