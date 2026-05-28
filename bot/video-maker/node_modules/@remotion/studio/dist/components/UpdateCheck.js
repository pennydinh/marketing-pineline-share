"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCheck = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const colors_1 = require("../helpers/colors");
const modals_1 = require("../state/modals");
const z_index_1 = require("../state/z-index");
const actions_1 = require("./RenderQueue/actions");
const buttonStyle = {
    appearance: 'none',
    color: colors_1.BLUE,
    border: 'none',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: 14,
    display: 'inline-flex',
    justifyContent: 'center',
};
const UpdateCheck = () => {
    const [info, setInfo] = (0, react_1.useState)(null);
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const [knownBugs, setKnownBugs] = (0, react_1.useState)(null);
    const hasKnownBugs = (0, react_1.useMemo)(() => {
        return knownBugs && knownBugs.length > 0;
    }, [knownBugs]);
    const checkForUpdates = (0, react_1.useCallback)(() => {
        const controller = new AbortController();
        (0, actions_1.updateAvailable)(controller.signal)
            .then((d) => {
            setInfo(d);
        })
            .catch((err) => {
            if (err.message.includes('aborted')) {
                return;
            }
            // eslint-disable-next-line no-console
            console.log('Could not check for updates', err);
        });
        return controller;
    }, []);
    const checkForBugs = (0, react_1.useCallback)(() => {
        const controller = new AbortController();
        fetch(`https://bugs.remotion.dev/api/${remotion_1.VERSION}`, {
            signal: controller.signal,
        })
            .then(async (res) => {
            const body = await res.json();
            setKnownBugs(body.bugs);
        })
            .catch((err) => {
            if (err.message.includes('aborted')) {
                return;
            }
            // eslint-disable-next-line no-console
            console.log('Could not check for bugs in this version', err);
        });
        return controller;
    }, []);
    (0, react_1.useEffect)(() => {
        const abortUpdate = checkForUpdates();
        const abortBugs = checkForBugs();
        return () => {
            abortUpdate.abort();
            abortBugs.abort();
        };
    }, [checkForBugs, checkForUpdates]);
    const openModal = (0, react_1.useCallback)(() => {
        setSelectedModal({
            type: 'update',
            info: info,
            knownBugs: knownBugs,
        });
    }, [info, knownBugs, setSelectedModal]);
    const dynButtonStyle = (0, react_1.useMemo)(() => {
        return {
            ...buttonStyle,
            color: hasKnownBugs ? colors_1.WARNING_COLOR : colors_1.LIGHT_TEXT,
        };
    }, [hasKnownBugs]);
    if (!info) {
        return null;
    }
    if (!info.updateAvailable) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("button", { tabIndex: tabIndex, style: dynButtonStyle, onClick: openModal, type: "button", title: hasKnownBugs ? 'Bugfixes available' : 'Update available', children: hasKnownBugs ? ('Bugfixes available') : ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", style: {
                height: 16,
                width: 16,
            }, viewBox: "0 0 512 512", children: (0, jsx_runtime_1.jsx)("path", { fill: "currentcolor", d: "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z" }) })) }));
};
exports.UpdateCheck = UpdateCheck;
