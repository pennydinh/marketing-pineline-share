import React from 'react';
import type { SplitterOrientation } from './SplitterContext';
export declare const containerColumn: React.CSSProperties;
export declare const SplitterContainer: React.FC<{
    readonly orientation: SplitterOrientation;
    readonly maxFlex: number;
    readonly minFlex: number;
    readonly id: string;
    readonly defaultFlex: number;
    readonly children: React.ReactNode;
}>;
