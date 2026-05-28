"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorMessages = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../../helpers/colors");
const ValidationMessage_1 = require("../../NewComposition/ValidationMessage");
const layout_1 = require("../../layout");
const schemaLabel = {
    fontSize: 14,
    color: colors_1.LIGHT_TEXT,
};
const jsonLabel = {
    color: 'white',
    fontSize: 13,
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
};
const triangleStyle = {
    width: 12,
    height: 12,
    flexShrink: 0,
    fill: colors_1.FAIL_COLOR,
};
const ZodErrorMessages = ({ zodValidationResult, viewTab }) => {
    if (zodValidationResult.success) {
        throw new Error('Expected error');
    }
    const style = (0, react_1.useMemo)(() => {
        return viewTab === 'json' ? jsonLabel : schemaLabel;
    }, [viewTab]);
    const code = (0, react_1.useMemo)(() => {
        return {
            ...schemaLabel,
            fontFamily: 'monospace',
        };
    }, []);
    if (viewTab === 'json') {
        return ((0, jsx_runtime_1.jsx)("div", { children: zodValidationResult.error.errors.map((error) => {
                return ((0, jsx_runtime_1.jsxs)("div", { style: style, children: [(0, jsx_runtime_1.jsx)(ValidationMessage_1.WarningTriangle, { style: triangleStyle }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 }), error.path.length === 0 ? 'Root' : error.path.join('.'), ":", ' ', error.message] }, error.path.join('.')));
            }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: zodValidationResult.error.errors.map((error) => {
            return ((0, jsx_runtime_1.jsxs)("div", { style: style, children: ["-", ' ', (0, jsx_runtime_1.jsx)("code", { style: code, children: error.path.length === 0 ? 'Root' : error.path.join('.') }), ": ", error.message] }, error.path.join('.')));
        }) }));
};
exports.ZodErrorMessages = ZodErrorMessages;
