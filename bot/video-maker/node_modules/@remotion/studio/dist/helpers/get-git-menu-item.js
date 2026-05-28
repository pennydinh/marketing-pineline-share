"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitMenuItem = exports.getGitRefUrl = exports.getGitSourceBranchUrl = exports.getGitSourceName = void 0;
const getGitSourceName = (gitSource) => {
    if (gitSource.type === 'github') {
        return 'GitHub';
    }
    throw new Error('Unknown git source type');
};
exports.getGitSourceName = getGitSourceName;
const getGitSourceBranchUrl = (gitSource) => {
    if (gitSource.type === 'github') {
        return `https://github.com/${gitSource.org}/${gitSource.name}/tree/${gitSource.ref}${gitSource.relativeFromGitRoot ? `/${gitSource.relativeFromGitRoot}` : ''}`;
    }
    throw new Error('Unknown git source type');
};
exports.getGitSourceBranchUrl = getGitSourceBranchUrl;
const getGitRefUrl = (gitSource, originalLocation) => {
    if (gitSource.type === 'github') {
        return `https://github.com/${gitSource.org}/${gitSource.name}/tree/${gitSource.ref}/${gitSource.relativeFromGitRoot ? `${gitSource.relativeFromGitRoot}/` : ''}${originalLocation.source}#L${originalLocation.line}`;
    }
    throw new Error('Unknown git source type');
};
exports.getGitRefUrl = getGitRefUrl;
const getGitMenuItem = () => {
    if (!window.remotion_gitSource) {
        return null;
    }
    return {
        id: 'open-git-source',
        value: 'open-git-source',
        label: `Open ${(0, exports.getGitSourceName)(window.remotion_gitSource)} Repo`,
        onClick: () => {
            window.open((0, exports.getGitSourceBranchUrl)(window.remotion_gitSource), '_blank');
        },
        type: 'item',
        keyHint: null,
        leftItem: null,
        subMenu: null,
        quickSwitcherLabel: `Open ${(0, exports.getGitSourceName)(window.remotion_gitSource)} repo`,
    };
};
exports.getGitMenuItem = getGitMenuItem;
