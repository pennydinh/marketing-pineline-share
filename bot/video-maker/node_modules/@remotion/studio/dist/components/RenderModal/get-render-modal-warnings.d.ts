import type { PropsEditType } from './DataEditor';
export type TypeCanSaveState = {
    canUpdate: true;
} | {
    canUpdate: false;
    reason: string;
    determined: boolean;
};
export declare const defaultTypeCanSaveState: TypeCanSaveState;
export declare const getRenderModalWarnings: ({ cliProps, canSaveDefaultProps, isCustomDateUsed, customFileUsed, jsMapUsed, jsSetUsed, inJSONEditor, propsEditType, }: {
    cliProps: unknown;
    canSaveDefaultProps: TypeCanSaveState;
    isCustomDateUsed: boolean;
    customFileUsed: boolean;
    jsMapUsed: boolean;
    jsSetUsed: boolean;
    inJSONEditor: boolean;
    propsEditType: PropsEditType;
}) => string[];
