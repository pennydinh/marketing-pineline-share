"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountRemotionOverlay = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = __importDefault(require("react-dom/client"));
const Overlay_1 = require("./Overlay");
const mountRemotionOverlay = () => {
    if (client_1.default.createRoot) {
        client_1.default.createRoot(document.getElementById('remotion-error-overlay')).render((0, jsx_runtime_1.jsx)(Overlay_1.Overlay, {}));
    }
    else {
        client_1.default.render((0, jsx_runtime_1.jsx)(Overlay_1.Overlay, {}), document.getElementById('remotion-error-overlay'));
    }
};
exports.mountRemotionOverlay = mountRemotionOverlay;
