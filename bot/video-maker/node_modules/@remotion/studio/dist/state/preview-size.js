"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewSizeProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const editor_zoom_gestures_1 = require("./editor-zoom-gestures");
const key = 'remotion.previewSize';
const persistPreviewSizeOption = (option) => {
    localStorage.setItem(key, JSON.stringify(option));
};
const loadPreviewSizeOption = () => {
    const item = localStorage.getItem(key);
    if (item === null) {
        return {
            size: 'auto',
            translation: {
                x: 0,
                y: 0,
            },
        };
    }
    return JSON.parse(item);
};
const PreviewSizeProvider = ({ children }) => {
    const [size, setSizeState] = (0, react_1.useState)(() => loadPreviewSizeOption());
    const [translation, setTranslation] = (0, react_1.useState)(() => {
        return {
            x: 0,
            y: 0,
        };
    });
    const { editorZoomGestures } = (0, react_1.useContext)(editor_zoom_gestures_1.EditorZoomGesturesContext);
    const setSize = (0, react_1.useCallback)((newValue) => {
        setSizeState((prevState) => {
            const newVal = newValue(prevState);
            persistPreviewSizeOption(newVal);
            return newVal;
        });
    }, []);
    const previewSizeCtx = (0, react_1.useMemo)(() => {
        return {
            size: editorZoomGestures
                ? size
                : {
                    size: size.size,
                    translation: {
                        x: 0,
                        y: 0,
                    },
                },
            setSize,
            translation,
            setTranslation,
        };
    }, [editorZoomGestures, size, setSize, translation]);
    return ((0, jsx_runtime_1.jsx)(remotion_1.Internals.PreviewSizeContext.Provider, { value: previewSizeCtx, children: children }));
};
exports.PreviewSizeProvider = PreviewSizeProvider;
