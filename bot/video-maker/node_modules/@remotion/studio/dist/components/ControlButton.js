"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlButton = exports.CONTROL_BUTTON_PADDING = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const z_index_1 = require("../state/z-index");
exports.CONTROL_BUTTON_PADDING = 6;
const ControlButton = (props) => {
    const style = (0, react_1.useMemo)(() => {
        return {
            opacity: props.disabled ? 0.5 : 1,
            display: 'inline-flex',
            background: 'none',
            border: 'none',
            padding: exports.CONTROL_BUTTON_PADDING,
        };
    }, [props.disabled]);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    return ((0, jsx_runtime_1.jsx)("button", { type: 'button', tabIndex: tabIndex, ...props, style: style }));
};
exports.ControlButton = ControlButton;
