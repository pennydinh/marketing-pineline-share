"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorZoomGesturesContext = exports.loadEditorZoomGesturesOption = exports.persistEditorZoomGesturesOption = void 0;
const react_1 = require("react");
const persistEditorZoomGesturesOption = (option) => {
    localStorage.setItem('remotion.editorZoomGestures', String(option));
};
exports.persistEditorZoomGesturesOption = persistEditorZoomGesturesOption;
const loadEditorZoomGesturesOption = () => {
    const item = localStorage.getItem('remotion.editorZoomGestures');
    return item !== 'false';
};
exports.loadEditorZoomGesturesOption = loadEditorZoomGesturesOption;
exports.EditorZoomGesturesContext = (0, react_1.createContext)({
    editorZoomGestures: (0, exports.loadEditorZoomGesturesOption)(),
    setEditorZoomGestures: () => undefined,
});
