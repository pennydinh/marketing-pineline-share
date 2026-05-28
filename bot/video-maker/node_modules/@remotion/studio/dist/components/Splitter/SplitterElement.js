"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitterElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const SplitterContext_1 = require("./SplitterContext");
const SplitterElement = ({ children, type, sticky }) => {
    const context = (0, react_1.useContext)(SplitterContext_1.SplitterContext);
    const style = (0, react_1.useMemo)(() => {
        return {
            flex: 
            // Multiply by 1000 because if flex values don't add up to at least 1, they will not fill up the screen
            (type === 'flexer' ? context.flexValue : 1 - context.flexValue) * 1000,
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            flexDirection: 'column',
        };
    }, [context.flexValue, type]);
    const stickStyle = (0, react_1.useMemo)(() => {
        return {
            position: 'absolute',
            left: (type === 'flexer' ? 0 : context.flexValue) * 100 + '%',
            width: (type === 'flexer' ? context.flexValue : 1 - context.flexValue) * 100 +
                '%',
            backgroundColor: (0, remotion_1.interpolateColors)((0, remotion_1.random)(context.flexValue), [0, 1], ['red', 'blue']),
        };
    }, [context.flexValue, type]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: style, children: children }), (0, jsx_runtime_1.jsx)("div", { style: stickStyle, children: sticky !== null && sticky !== void 0 ? sticky : null })] }));
};
exports.SplitterElement = SplitterElement;
