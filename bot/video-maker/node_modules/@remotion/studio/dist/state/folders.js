"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderContextProvider = exports.FolderContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const persist_open_folders_1 = require("../helpers/persist-open-folders");
exports.FolderContext = (0, react_1.createContext)({
    compositionFoldersExpanded: {},
    setCompositionFoldersExpanded: () => {
        throw new Error('default state');
    },
    assetFoldersExpanded: {},
    setAssetFoldersExpanded: () => {
        throw new Error('default state');
    },
});
const FolderContextProvider = ({ children }) => {
    const [compositionFoldersExpanded, setCompositionFoldersExpanded] = (0, react_1.useState)(() => (0, persist_open_folders_1.loadExpandedFolders)('compositions'));
    const [assetFoldersExpanded, setAssetFoldersExpanded] = (0, react_1.useState)(() => (0, persist_open_folders_1.loadExpandedFolders)('assets'));
    const value = (0, react_1.useMemo)(() => {
        return {
            compositionFoldersExpanded,
            setCompositionFoldersExpanded,
            assetFoldersExpanded,
            setAssetFoldersExpanded,
        };
    }, [assetFoldersExpanded, compositionFoldersExpanded]);
    return ((0, jsx_runtime_1.jsx)(exports.FolderContext.Provider, { value: value, children: children }));
};
exports.FolderContextProvider = FolderContextProvider;
