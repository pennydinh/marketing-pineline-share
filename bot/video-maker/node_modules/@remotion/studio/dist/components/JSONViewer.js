"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONViewer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const RemTextarea_1 = require("./NewComposition/RemTextarea");
const jsonStyle = {
    marginTop: 14,
    marginBottom: 14,
    fontFamily: 'monospace',
    flex: 1,
};
const JSONViewer = ({ src }) => {
    const [json, setJson] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        fetch(src)
            .then((res) => res.json())
            .then((jsonRes) => {
            setJson(JSON.stringify(jsonRes, null, 2));
        });
    }, [src]);
    return ((0, jsx_runtime_1.jsx)(RemTextarea_1.RemTextarea, { value: json !== null && json !== void 0 ? json : undefined, status: "ok", onChange: () => {
            return null;
        }, style: jsonStyle }));
};
exports.JSONViewer = JSONViewer;
