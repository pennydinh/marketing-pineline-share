"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorShowGuidesContext = exports.loadGuidesList = exports.persistGuidesList = exports.loadEditorShowGuidesOption = exports.persistEditorShowGuidesOption = void 0;
const react_1 = require("react");
const persistEditorShowGuidesOption = (option) => {
    localStorage.setItem('remotion.editorShowGuides', String(option));
};
exports.persistEditorShowGuidesOption = persistEditorShowGuidesOption;
const loadEditorShowGuidesOption = () => {
    const item = localStorage.getItem('remotion.editorShowGuides');
    return item === 'true';
};
exports.loadEditorShowGuidesOption = loadEditorShowGuidesOption;
const persistGuidesList = (guides) => {
    localStorage.setItem('remotion.guidesList', JSON.stringify(guides));
};
exports.persistGuidesList = persistGuidesList;
const loadGuidesList = () => {
    const item = localStorage.getItem('remotion.guidesList');
    return item ? JSON.parse(item) : [];
};
exports.loadGuidesList = loadGuidesList;
exports.EditorShowGuidesContext = (0, react_1.createContext)({
    editorShowGuides: false,
    setEditorShowGuides: () => undefined,
    guidesList: [],
    setGuidesList: () => undefined,
    selectedGuideId: null,
    setSelectedGuideId: () => undefined,
    shouldCreateGuideRef: { current: false },
    shouldDeleteGuideRef: { current: false },
    hoveredGuideId: null,
    setHoveredGuideId: () => undefined,
});
