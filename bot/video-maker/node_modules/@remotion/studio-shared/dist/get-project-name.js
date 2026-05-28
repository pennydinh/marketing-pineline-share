"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectName = void 0;
const getProjectName = ({ gitSource, resolvedRemotionRoot, basename, }) => {
    // Directory name
    if (!gitSource) {
        return basename(resolvedRemotionRoot);
    }
    // Subfolder name of a Git repo, e.g `example`
    if (gitSource.relativeFromGitRoot.trim()) {
        return basename(gitSource.relativeFromGitRoot.trim());
    }
    // Name of the repo
    return gitSource.name;
};
exports.getProjectName = getProjectName;
