"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSaveButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../../helpers/colors");
const InlineAction_1 = require("../../InlineAction");
const icon = {
    height: 14,
    color: 'currentColor',
};
const SchemaSaveButton = ({ onClick, disabled }) => {
    const renderAction = (0, react_1.useCallback)((color) => {
        return ((0, jsx_runtime_1.jsx)("svg", { style: icon, viewBox: "0 0 448 512", children: (0, jsx_runtime_1.jsx)("path", { fill: disabled ? colors_1.LIGHT_TEXT : color, d: "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" }) }));
    }, [disabled]);
    return ((0, jsx_runtime_1.jsx)(InlineAction_1.InlineAction, { renderAction: renderAction, onClick: onClick, disabled: disabled }));
};
exports.SchemaSaveButton = SchemaSaveButton;
