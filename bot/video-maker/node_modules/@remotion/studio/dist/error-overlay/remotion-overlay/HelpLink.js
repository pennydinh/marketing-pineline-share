"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Button_1 = require("../../components/Button");
const colors_1 = require("../../helpers/colors");
const use_keybinding_1 = require("../../helpers/use-keybinding");
const ShortcutHint_1 = require("./ShortcutHint");
const buttonStyle = {
    backgroundColor: colors_1.BLUE,
    color: 'white',
};
const HelpLink = ({ canHaveKeyboardShortcuts, link }) => {
    const openLink = (0, react_1.useCallback)(() => {
        window.open(link.url, '_blank');
    }, [link]);
    const { registerKeybinding } = (0, use_keybinding_1.useKeybinding)();
    (0, react_1.useEffect)(() => {
        if (!canHaveKeyboardShortcuts) {
            return;
        }
        const onEditor = () => {
            openLink();
        };
        const { unregister } = registerKeybinding({
            event: 'keydown',
            key: 'h',
            callback: onEditor,
            commandCtrlKey: true,
            preventDefault: true,
            triggerIfInputFieldFocused: false,
            keepRegisteredWhenNotHighestContext: false,
        });
        return () => unregister();
    }, [canHaveKeyboardShortcuts, openLink, registerKeybinding]);
    return ((0, jsx_runtime_1.jsxs)(Button_1.Button, { style: buttonStyle, onClick: openLink, children: ["Help: ", '"', link.title, '"', canHaveKeyboardShortcuts ? ((0, jsx_runtime_1.jsx)(ShortcutHint_1.ShortcutHint, { keyToPress: "h", cmdOrCtrl: true })) : null] }));
};
exports.HelpLink = HelpLink;
