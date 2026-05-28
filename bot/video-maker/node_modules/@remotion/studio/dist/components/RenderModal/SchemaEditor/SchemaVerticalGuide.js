"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaVerticalGuide = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SchemaSeparationLine_1 = require("./SchemaSeparationLine");
const flex = {
    flex: 1,
};
const SchemaVerticalGuide = ({ isRoot, children }) => {
    const outer = (0, react_1.useMemo)(() => {
        return {
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            marginLeft: isRoot ? 0 : 4,
        };
    }, [isRoot]);
    const inner = (0, react_1.useMemo)(() => {
        return isRoot
            ? {}
            : {
                height: `calc(100% - ${SchemaSeparationLine_1.VERTICAL_GUIDE_HEIGHT / 2}px)`,
                width: 1,
                background: '#363A3E',
                position: 'absolute',
            };
    }, [isRoot]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: outer, children: [(0, jsx_runtime_1.jsx)("div", { style: inner }), (0, jsx_runtime_1.jsx)("div", { style: flex, children: children })] }));
};
exports.SchemaVerticalGuide = SchemaVerticalGuide;
