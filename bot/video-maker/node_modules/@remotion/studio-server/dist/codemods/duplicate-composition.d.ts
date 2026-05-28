import type { RecastCodemod } from '@remotion/studio-shared';
import type { Change } from './recast-mods';
export declare const formatOutput: (tsContent: string) => Promise<string>;
export declare const parseAndApplyCodemod: ({ input, codeMod, }: {
    input: string;
    codeMod: RecastCodemod;
}) => {
    newContents: string;
    changesMade: Change[];
};
