"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoRegisterRoot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const label = {
    fontSize: 13,
    color: 'white',
    fontFamily: 'Arial, Helvetica, sans-serif',
};
const container = {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    lineHeight: 1.5,
};
const link = {
    color: 'white',
    textDecoration: 'none',
    borderBottom: '1px solid',
};
const NoRegisterRoot = () => {
    const [show, setShow] = (0, react_1.useState)(() => false);
    (0, react_1.useEffect)(() => {
        // Only show after 2 seconds so there is no flicker when the load is really fast
        const timeout = setTimeout(() => {
            setShow(true);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    if (!show) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: container, children: [(0, jsx_runtime_1.jsx)("div", { style: label, children: "Waiting for registerRoot() to get called." }), (0, jsx_runtime_1.jsxs)("div", { style: label, children: ["Learn more:", ' ', (0, jsx_runtime_1.jsx)("a", { target: '_blank', style: link, href: "https://www.remotion.dev/docs/register-root", children: "remotion.dev/docs/register-root" })] })] }));
};
exports.NoRegisterRoot = NoRegisterRoot;
