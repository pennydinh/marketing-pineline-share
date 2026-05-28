import type { Menu } from '../components/Menu/MenuItem';
import type { TQuickSwitcherResult } from '../components/QuickSwitcher/QuickSwitcherResult';
import type { ModalState } from '../state/modals';
type Structure = Menu[];
export declare const useMenuStructure: (closeMenu: () => void, readOnlyStudio: boolean) => Structure;
export declare const makeSearchResults: (actions: Structure, setSelectedModal: (value: React.SetStateAction<ModalState | null>) => void) => TQuickSwitcherResult[];
export {};
