"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Button_1 = require("../../components/Button");
const CodeFrame_1 = require("./CodeFrame");
const carets_1 = require("./carets");
const format_location_1 = require("./format-location");
const location = {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'monospace',
    fontSize: 14,
};
const header = {
    paddingLeft: 14,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid rgb(66, 144, 245)',
    backgroundColor: 'black',
};
const left = {
    paddingRight: 14,
    flex: 1,
};
const fnName = {
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 3,
};
const StackElement = ({ s, lineNumberWidth, isFirst, defaultFunctionName }) => {
    var _a;
    const [showCodeFrame, setShowCodeFrame] = (0, react_1.useState)(() => {
        var _a, _b;
        return (!((_a = s.originalFileName) === null || _a === void 0 ? void 0 : _a.includes('node_modules')) &&
            !((_b = s.originalFileName) === null || _b === void 0 ? void 0 : _b.startsWith('webpack/'))) ||
            isFirst;
    });
    const toggleCodeFrame = (0, react_1.useCallback)(() => {
        setShowCodeFrame((f) => !f);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "css-reset", children: [(0, jsx_runtime_1.jsxs)("div", { style: header, children: [(0, jsx_runtime_1.jsxs)("div", { style: left, children: [(0, jsx_runtime_1.jsx)("div", { style: fnName, children: (_a = s.originalFunctionName) !== null && _a !== void 0 ? _a : defaultFunctionName }), s.originalFileName ? ((0, jsx_runtime_1.jsxs)("div", { style: location, children: [(0, format_location_1.formatLocation)(s.originalFileName), ":", s.originalLineNumber] })) : null] }), s.originalScriptCode && s.originalScriptCode.length > 0 ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { onClick: toggleCodeFrame, children: showCodeFrame ? (0, jsx_runtime_1.jsx)(carets_1.CaretDown, { invert: false }) : (0, jsx_runtime_1.jsx)(carets_1.CaretRight, {}) })) : null] }), (0, jsx_runtime_1.jsx)("div", { children: s.originalScriptCode &&
                    s.originalScriptCode.length > 0 &&
                    showCodeFrame ? ((0, jsx_runtime_1.jsx)(CodeFrame_1.CodeFrame, { lineNumberWidth: lineNumberWidth, source: s.originalScriptCode })) : null })] }));
};
exports.StackElement = StackElement;
