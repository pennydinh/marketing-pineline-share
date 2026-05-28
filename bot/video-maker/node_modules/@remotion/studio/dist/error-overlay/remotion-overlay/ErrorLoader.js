"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLoader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const listen_to_runtime_errors_1 = require("../react-overlay/listen-to-runtime-errors");
const ErrorDisplay_1 = require("./ErrorDisplay");
const ErrorTitle_1 = require("./ErrorTitle");
const container = {
    width: '100%',
    maxWidth: 1000,
    paddingLeft: 14,
    paddingRight: 14,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'SF Pro Text, sans-serif',
    paddingTop: '5vh',
};
const errorWhileErrorStyle = {
    color: 'white',
    lineHeight: 1.5,
    whiteSpace: 'pre',
};
const ErrorLoader = ({ error, keyboardShortcuts, onRetry, canHaveDismissButton, calculateMetadata, }) => {
    const [state, setState] = (0, react_1.useState)({
        type: 'loading',
    });
    (0, react_1.useEffect)(() => {
        (0, listen_to_runtime_errors_1.getErrorRecord)(error)
            .then((record) => {
            if (record) {
                setState({
                    type: 'symbolicated',
                    record,
                });
            }
            else {
                setState({
                    type: 'no-record',
                });
            }
        })
            .catch((err) => {
            setState({
                err,
                type: 'error',
            });
        });
    }, [error]);
    if (state.type === 'loading') {
        return ((0, jsx_runtime_1.jsx)("div", { style: container, children: (0, jsx_runtime_1.jsx)(ErrorTitle_1.ErrorTitle, { symbolicating: true, name: error.name, message: error.message, canHaveDismissButton: canHaveDismissButton }) }));
    }
    if (state.type === 'error') {
        return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)(ErrorTitle_1.ErrorTitle, { symbolicating: false, name: error.name, message: error.message, canHaveDismissButton: canHaveDismissButton }), (0, jsx_runtime_1.jsx)("div", { style: errorWhileErrorStyle, children: "Error while getting stack trace:" }), (0, jsx_runtime_1.jsx)("div", { style: errorWhileErrorStyle, children: state.err.stack }), (0, jsx_runtime_1.jsx)("div", { style: errorWhileErrorStyle, children: "Report this in the Remotion repo." })] }));
    }
    if (state.type === 'no-record') {
        return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)(ErrorTitle_1.ErrorTitle, { symbolicating: false, name: error.name, message: error.message, canHaveDismissButton: canHaveDismissButton }), (0, jsx_runtime_1.jsx)("div", { style: errorWhileErrorStyle, children: "Check the Terminal and browser console for error messages." })] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: container, children: (0, jsx_runtime_1.jsx)(ErrorDisplay_1.ErrorDisplay, { keyboardShortcuts: keyboardShortcuts, display: state.record, onRetry: onRetry, canHaveDismissButton: canHaveDismissButton, calculateMetadata: calculateMetadata }) }));
};
exports.ErrorLoader = ErrorLoader;
