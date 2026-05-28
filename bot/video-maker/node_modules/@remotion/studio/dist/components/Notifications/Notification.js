"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const notification = {
    backgroundColor: '#111111',
    color: 'white',
    fontFamily: 'Arial, Helvetica, sans-serif',
    display: 'inline-flex',
    padding: '8px 14px',
    borderRadius: 4,
    fontSize: 15,
    border: '0.25px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 1)',
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
};
const Notification = ({ children, id, duration, created, onRemove }) => {
    (0, react_1.useEffect)(() => {
        if (duration === null) {
            return;
        }
        const timeout = setTimeout(() => {
            onRemove(id);
        }, duration - (Date.now() - created));
        return () => {
            clearTimeout(timeout);
        };
    }, [created, duration, id, onRemove]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "css-reset", style: notification, children: children }));
};
exports.Notification = Notification;
