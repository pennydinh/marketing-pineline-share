import type { KeyEventType } from '../state/keybindings';
export declare const areKeyboardShortcutsDisabled: () => boolean;
export declare const useKeybinding: () => {
    registerKeybinding: (options: {
        event: KeyEventType;
        key: string;
        commandCtrlKey: boolean;
        callback: (e: KeyboardEvent) => void;
        preventDefault: boolean;
        triggerIfInputFieldFocused: boolean;
        keepRegisteredWhenNotHighestContext: boolean;
    }) => {
        unregister: () => void;
    };
    isHighestContext: boolean;
};
