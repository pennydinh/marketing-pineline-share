"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderQueueOpenInFinderItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const folder_1 = require("../../icons/folder");
const InlineAction_1 = require("../InlineAction");
const NotificationCenter_1 = require("../Notifications/NotificationCenter");
const actions_1 = require("./actions");
const RenderQueueOpenInFinderItem = ({ job }) => {
    const onClick = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        (0, actions_1.openInFileExplorer)({ directory: job.outName }).catch((err) => {
            (0, NotificationCenter_1.showNotification)(`Could not open file: ${err.message}`, 2000);
        });
    }, [job.outName]);
    const icon = (0, react_1.useMemo)(() => {
        return {
            height: 12,
            color: 'currentColor',
        };
    }, []);
    const renderAction = (0, react_1.useCallback)((color) => {
        return (0, jsx_runtime_1.jsx)(folder_1.ExpandedFolderIconSolid, { style: icon, color: color });
    }, [icon]);
    return (0, jsx_runtime_1.jsx)(InlineAction_1.InlineAction, { renderAction: renderAction, onClick: onClick });
};
exports.RenderQueueOpenInFinderItem = RenderQueueOpenInFinderItem;
