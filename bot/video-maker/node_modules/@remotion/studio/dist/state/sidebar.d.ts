import React from 'react';
export type SidebarCollapsedState = 'collapsed' | 'expanded' | 'responsive';
type RightSidebarCollapsedState = Exclude<SidebarCollapsedState, 'responsive'>;
type Context = {
    sidebarCollapsedStateLeft: SidebarCollapsedState;
    setSidebarCollapsedState: (options: {
        left: null | React.SetStateAction<SidebarCollapsedState>;
        right: null | React.SetStateAction<RightSidebarCollapsedState>;
    }) => void;
    sidebarCollapsedStateRight: RightSidebarCollapsedState;
};
export declare const SidebarContext: React.Context<Context>;
export declare const SidebarContextProvider: React.FC<{
    readonly children: React.ReactNode;
}>;
export {};
