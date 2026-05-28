import React from 'react';
import type { AssetStructure } from '../helpers/create-folder-tree';
export declare const AssetFolderTree: React.FC<{
    readonly item: AssetStructure;
    readonly name: string | null;
    readonly parentFolder: string | null;
    readonly level: number;
    readonly tabIndex: number;
    readonly toggleFolder: (folderName: string, parentName: string | null) => void;
    readonly dropLocation: string | null;
    readonly setDropLocation: React.Dispatch<React.SetStateAction<string | null>>;
}>;
