"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("../../components/Button");
const RetryButton = ({ onClick }) => {
    return (0, jsx_runtime_1.jsx)(Button_1.Button, { onClick: onClick, children: "Retry calculateMetadata()" });
};
exports.RetryButton = RetryButton;
