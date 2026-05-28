import React from 'react';
import type { SubMenu } from '../NewComposition/ComboBox';
import type { SubMenuActivated } from './MenuSubItem';
export declare const SubMenuComponent: React.FC<{
    portalStyle: React.CSSProperties;
    subMenu: SubMenu;
    onQuitFullMenu: () => void;
    onQuitSubMenu: () => void;
    subMenuActivated: SubMenuActivated;
}>;
