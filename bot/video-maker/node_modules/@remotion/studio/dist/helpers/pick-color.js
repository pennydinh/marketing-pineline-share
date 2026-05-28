"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickColor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const layout_1 = require("../components/layout");
const ColorDot_1 = require("../components/Notifications/ColorDot");
const NotificationCenter_1 = require("../components/Notifications/NotificationCenter");
const copy_text_1 = require("./copy-text");
const pickColor = () => {
    // @ts-expect-error
    const open = new EyeDropper().open();
    open
        .then((color) => {
        (0, copy_text_1.copyText)(color.sRGBHex)
            .then(() => {
            (0, NotificationCenter_1.showNotification)((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ColorDot_1.ColorDot, { color: color.sRGBHex }), " ", (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 }), " Copied", ' ', color.sRGBHex] }), 2000);
        })
            .catch((err) => {
            (0, NotificationCenter_1.showNotification)(`Could not copy: ${err.message}`, 2000);
        });
    })
        .catch((err) => {
        if (err.message.includes('canceled')) {
            return;
        }
        (0, NotificationCenter_1.showNotification)(`Could not pick color.`, 2000);
    });
};
exports.pickColor = pickColor;
