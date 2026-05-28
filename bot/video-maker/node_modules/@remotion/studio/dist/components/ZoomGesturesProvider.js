"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomGesturesProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const editor_zoom_gestures_1 = require("../state/editor-zoom-gestures");
const ZoomGesturesProvider = ({ children }) => {
    const [editorZoomGestures, setEditorZoomGesturesState] = (0, react_1.useState)(() => (0, editor_zoom_gestures_1.loadEditorZoomGesturesOption)());
    const setEditorZoomGestures = (0, react_1.useCallback)((newValue) => {
        setEditorZoomGesturesState((prevState) => {
            const newVal = newValue(prevState);
            (0, editor_zoom_gestures_1.persistEditorZoomGesturesOption)(newVal);
            return newVal;
        });
    }, []);
    const editorZoomGesturesCtx = (0, react_1.useMemo)(() => {
        return {
            editorZoomGestures,
            setEditorZoomGestures,
        };
    }, [editorZoomGestures, setEditorZoomGestures]);
    return ((0, jsx_runtime_1.jsx)(editor_zoom_gestures_1.EditorZoomGesturesContext.Provider, { value: editorZoomGesturesCtx, children: children }));
};
exports.ZoomGesturesProvider = ZoomGesturesProvider;
