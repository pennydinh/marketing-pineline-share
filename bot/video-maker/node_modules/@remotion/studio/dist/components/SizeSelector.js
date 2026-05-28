"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeSelector = exports.getUniqueSizes = exports.getPreviewSizeLabel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const Checkmark_1 = require("../icons/Checkmark");
const ControlButton_1 = require("./ControlButton");
const ComboBox_1 = require("./NewComposition/ComboBox");
const Preview_1 = require("./Preview");
const commonPreviewSizes = [
    {
        size: 'auto',
        translation: {
            x: 0,
            y: 0,
        },
    },
    {
        size: 0.25,
        translation: {
            x: 0,
            y: 0,
        },
    },
    {
        size: 0.5,
        translation: {
            x: 0,
            y: 0,
        },
    },
    {
        size: 1,
        translation: {
            x: 0,
            y: 0,
        },
    },
];
const getPreviewSizeLabel = (previewSize) => {
    if (previewSize.size === 'auto') {
        return 'Fit';
    }
    return `${(previewSize.size * 100).toFixed(0)}%`;
};
exports.getPreviewSizeLabel = getPreviewSizeLabel;
const accessibilityLabel = 'Preview Size';
const comboStyle = { width: 80 };
const getUniqueSizes = (size) => {
    const customPreviewSizes = [size, ...commonPreviewSizes];
    const uniqueSizes = [];
    customPreviewSizes.forEach((p) => {
        if (!uniqueSizes.find((s) => s.size === p.size)) {
            uniqueSizes.push(p);
        }
    });
    return uniqueSizes.sort((a, b) => {
        if (a.size === 'auto') {
            return -1;
        }
        if (b.size === 'auto') {
            return 1;
        }
        return a.size - b.size;
    });
};
exports.getUniqueSizes = getUniqueSizes;
const zoomableFileTypes = ['video', 'image'];
const SizeSelector = () => {
    const { size, setSize } = (0, react_1.useContext)(remotion_1.Internals.PreviewSizeContext);
    const { canvasContent } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const style = (0, react_1.useMemo)(() => {
        return {
            padding: ControlButton_1.CONTROL_BUTTON_PADDING,
        };
    }, []);
    const zoomable = (0, react_1.useMemo)(() => {
        if (!canvasContent) {
            return null;
        }
        if (canvasContent.type === 'composition') {
            return true;
        }
        if (canvasContent.type === 'asset' &&
            zoomableFileTypes.includes((0, Preview_1.getPreviewFileType)(canvasContent.asset))) {
            return true;
        }
        if (canvasContent.type === 'output' &&
            zoomableFileTypes.includes((0, Preview_1.getPreviewFileType)(canvasContent.path))) {
            return true;
        }
        return false;
    }, [canvasContent]);
    const items = (0, react_1.useMemo)(() => {
        return (0, exports.getUniqueSizes)(size).map((newSize) => {
            return {
                id: String(newSize.size),
                label: (0, exports.getPreviewSizeLabel)(newSize),
                onClick: () => {
                    return setSize(() => {
                        return newSize;
                    });
                },
                type: 'item',
                value: newSize.size,
                keyHint: newSize.size === 'auto' ? '0' : null,
                leftItem: String(size.size) === String(newSize.size) ? (0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {}) : null,
                subMenu: null,
                quickSwitcherLabel: null,
            };
        });
    }, [setSize, size]);
    if (!zoomable) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: style, "aria-label": accessibilityLabel, children: (0, jsx_runtime_1.jsx)(ComboBox_1.Combobox, { title: accessibilityLabel, style: comboStyle, selectedId: String(size.size), values: items }) }));
};
exports.SizeSelector = SizeSelector;
