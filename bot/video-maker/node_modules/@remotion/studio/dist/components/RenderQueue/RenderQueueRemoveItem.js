"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderQueueRemoveItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InlineAction_1 = require("../InlineAction");
const NotificationCenter_1 = require("../Notifications/NotificationCenter");
const actions_1 = require("./actions");
const RenderQueueRemoveItem = ({ job }) => {
    const onClick = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        (0, actions_1.removeRenderJob)(job)
            .then(() => {
            (0, NotificationCenter_1.showNotification)('Removed job', 2000);
        })
            .catch((err) => {
            (0, NotificationCenter_1.showNotification)(`Could not remove item: ${err.message}`, 2000);
        });
    }, [job]);
    const icon = (0, react_1.useMemo)(() => {
        return {
            height: 16,
            color: 'currentColor',
        };
    }, []);
    const renderAction = (0, react_1.useCallback)((color) => {
        return ((0, jsx_runtime_1.jsx)("svg", { style: icon, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", children: (0, jsx_runtime_1.jsx)("path", { fill: color, d: "M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" }) }));
    }, [icon]);
    return (0, jsx_runtime_1.jsx)(InlineAction_1.InlineAction, { renderAction: renderAction, onClick: onClick });
};
exports.RenderQueueRemoveItem = RenderQueueRemoveItem;
