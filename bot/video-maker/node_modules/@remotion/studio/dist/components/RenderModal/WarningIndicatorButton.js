"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningIndicatorButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const caret_1 = require("../../icons/caret");
const layout_1 = require("../layout");
const style = {
    fontSize: 12,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: colors_1.LIGHT_TEXT,
    borderStyle: 'solid',
    borderWidth: 1,
    cursor: 'pointer',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
};
const triangleStyle = {
    width: 12,
    height: 12,
    flexShrink: 0,
    fill: colors_1.WARNING_COLOR,
};
const WarningTriangle = (props) => {
    return ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 576 512", ...props, children: (0, jsx_runtime_1.jsx)("path", { d: "M248.747 204.705l6.588 112c.373 6.343 5.626 11.295 11.979 11.295h41.37a12 12 0 0 0 11.979-11.295l6.588-112c.405-6.893-5.075-12.705-11.979-12.705h-54.547c-6.903 0-12.383 5.812-11.978 12.705zM330 384c0 23.196-18.804 42-42 42s-42-18.804-42-42 18.804-42 42-42 42 18.804 42 42zm-.423-360.015c-18.433-31.951-64.687-32.009-83.154 0L6.477 440.013C-11.945 471.946 11.118 512 48.054 512H527.94c36.865 0 60.035-39.993 41.577-71.987L329.577 23.985zM53.191 455.002L282.803 57.008c2.309-4.002 8.085-4.002 10.394 0l229.612 397.993c2.308 4-.579 8.998-5.197 8.998H58.388c-4.617.001-7.504-4.997-5.197-8.997z" }) }));
};
const WarningIndicatorButton = ({ setShowWarning, showWarning, warningCount }) => {
    const onClick = (0, react_1.useCallback)(() => {
        setShowWarning((s) => !s);
    }, [setShowWarning]);
    const buttonStyle = (0, react_1.useMemo)(() => {
        return {
            ...style,
            backgroundColor: showWarning ? colors_1.INPUT_BACKGROUND : 'transparent',
            borderColor: showWarning
                ? colors_1.INPUT_BORDER_COLOR_HOVERED
                : colors_1.INPUT_BORDER_COLOR_UNHOVERED,
            color: showWarning ? 'white' : colors_1.LIGHT_TEXT,
        };
    }, [showWarning]);
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", style: buttonStyle, onClick: onClick, children: [(0, jsx_runtime_1.jsx)(WarningTriangle, { style: triangleStyle }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), warningCount, (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 }), (0, jsx_runtime_1.jsx)(caret_1.AngleDown, { down: showWarning })] }));
};
exports.WarningIndicatorButton = WarningIndicatorButton;
