"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startErrorOverlay = void 0;
const url_state_1 = require("../helpers/url-state");
const react_overlay_1 = require("./react-overlay");
const remotion_overlay_1 = require("./remotion-overlay");
const Overlay_1 = require("./remotion-overlay/Overlay");
const startErrorOverlay = () => {
    (0, react_overlay_1.startReportingRuntimeErrors)(() => {
        if (__webpack_module__.hot) {
            __webpack_module__.hot.addStatusHandler((status) => {
                var _a;
                if (status === 'apply') {
                    if ((0, react_overlay_1.didUnmountReactApp)()) {
                        return (0, url_state_1.reloadUrl)();
                    }
                    (_a = Overlay_1.setErrorsRef.current) === null || _a === void 0 ? void 0 : _a.setErrors({
                        type: 'clear',
                    });
                }
            });
        }
    });
    (0, remotion_overlay_1.mountRemotionOverlay)();
};
exports.startErrorOverlay = startErrorOverlay;
