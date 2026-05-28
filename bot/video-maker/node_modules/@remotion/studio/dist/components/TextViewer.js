"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextViewer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const textStyle = {
    margin: 14,
    fontFamily: 'monospace',
    flex: 1,
    color: 'white',
    whiteSpace: 'pre-wrap',
};
const TextViewer = ({ src }) => {
    const [txt, setTxt] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        fetch(src).then(async (res) => {
            if (!res.ok || !res.body) {
                return;
            }
            const text = await res.text();
            setTxt(text);
        });
    }, [src]);
    return (0, jsx_runtime_1.jsxs)("div", { style: textStyle, children: [txt, " "] });
};
exports.TextViewer = TextViewer;
