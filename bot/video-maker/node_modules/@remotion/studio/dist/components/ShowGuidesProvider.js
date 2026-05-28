"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowGuidesProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const editor_guides_1 = require("../state/editor-guides");
const ShowGuidesProvider = ({ children }) => {
    const [guidesList, setGuidesList] = (0, react_1.useState)(() => (0, editor_guides_1.loadGuidesList)());
    const [selectedGuideId, setSelectedGuideId] = (0, react_1.useState)(null);
    const [hoveredGuideId, setHoveredGuideId] = (0, react_1.useState)(null);
    const [editorShowGuides, setEditorShowGuidesState] = (0, react_1.useState)(() => (0, editor_guides_1.loadEditorShowGuidesOption)());
    const shouldCreateGuideRef = (0, react_1.useRef)(false);
    const shouldDeleteGuideRef = (0, react_1.useRef)(false);
    const setEditorShowGuides = (0, react_1.useCallback)((newValue) => {
        setEditorShowGuidesState((prevState) => {
            const newVal = newValue(prevState);
            (0, editor_guides_1.persistEditorShowGuidesOption)(newVal);
            return newVal;
        });
    }, []);
    const editorShowGuidesCtx = (0, react_1.useMemo)(() => {
        return {
            editorShowGuides,
            setEditorShowGuides,
            guidesList,
            setGuidesList,
            selectedGuideId,
            setSelectedGuideId,
            shouldCreateGuideRef,
            shouldDeleteGuideRef,
            hoveredGuideId,
            setHoveredGuideId,
        };
    }, [
        editorShowGuides,
        setEditorShowGuides,
        guidesList,
        selectedGuideId,
        hoveredGuideId,
    ]);
    return ((0, jsx_runtime_1.jsx)(editor_guides_1.EditorShowGuidesContext.Provider, { value: editorShowGuidesCtx, children: children }));
};
exports.ShowGuidesProvider = ShowGuidesProvider;
