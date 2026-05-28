"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeFrame = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const is_menu_item_1 = require("../../components/Menu/is-menu-item");
const colors_1 = require("../../helpers/colors");
const container = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
};
const frame = {
    backgroundColor: '#070707',
    marginBottom: 20,
    overflowY: 'auto',
};
const lineNumber = {
    whiteSpace: 'pre',
    paddingRight: 12,
    color: 'inherit',
    fontSize: 14,
    lineHeight: 1.7,
    width: 60,
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontFamily: 'monospace',
};
const CodeFrame = ({ source, lineNumberWidth }) => {
    return ((0, jsx_runtime_1.jsx)("div", { style: frame, className: is_menu_item_1.HORIZONTAL_SCROLLBAR_CLASSNAME, children: source.map((s, j) => {
            return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            ...lineNumber,
                            backgroundColor: s.highlight ? 'white' : '#121212',
                            color: s.highlight ? 'black' : 'rgba(255, 255, 255, 0.6)',
                        }, children: String(s.lineNumber).padStart(lineNumberWidth, ' ') }), (0, jsx_runtime_1.jsx)("div", { style: {
                            fontFamily: 'monospace',
                            whiteSpace: 'pre',
                            tabSize: 2,
                            color: s.highlight ? 'white' : 'rgba(255, 255, 255, 0.6)',
                            backgroundColor: s.highlight ? colors_1.BLUE : 'transparent',
                            lineHeight: 1.7,
                            paddingRight: 12,
                            paddingLeft: 12,
                        }, children: s.content })] }, j));
        }) }));
};
exports.CodeFrame = CodeFrame;
