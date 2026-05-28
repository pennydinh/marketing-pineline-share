"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeybindingContextProvider = exports.KeybindingContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.KeybindingContext = (0, react_1.createContext)({
    registerKeybinding: () => {
        throw new Error('Has no keybinding context');
    },
    unregisterKeybinding: () => undefined,
    unregisterPane: () => undefined,
});
const KeybindingContextProvider = ({ children }) => {
    const registered = (0, react_1.useRef)([]);
    const registerKeybinding = (0, react_1.useCallback)((binding) => {
        registered.current = [...registered.current, binding];
        window.addEventListener(binding.event, binding.callback);
    }, []);
    const unregisterKeybinding = (0, react_1.useCallback)((binding) => {
        registered.current = registered.current.filter((r) => {
            if (r.id === binding.id) {
                window.removeEventListener(binding.event, binding.callback);
                return false;
            }
            return true;
        });
    }, []);
    const unregisterPane = (0, react_1.useCallback)((paneId) => {
        const matchedKeybindings = registered.current.filter((r) => r.registeredFromPane === paneId);
        for (const matched of matchedKeybindings) {
            unregisterKeybinding(matched);
        }
    }, [unregisterKeybinding]);
    const value = (0, react_1.useMemo)(() => {
        return {
            registerKeybinding,
            unregisterKeybinding,
            unregisterPane,
        };
    }, [registerKeybinding, unregisterKeybinding, unregisterPane]);
    return ((0, jsx_runtime_1.jsx)(exports.KeybindingContext.Provider, { value: value, children: children }));
};
exports.KeybindingContextProvider = KeybindingContextProvider;
