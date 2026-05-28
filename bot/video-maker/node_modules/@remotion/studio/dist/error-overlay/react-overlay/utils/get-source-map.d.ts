import { SourceMapConsumer } from 'source-map';
export type OriginalPosition = {
    line: number | null;
    column: number | null;
    source: string | null;
};
export declare const getOriginalPosition: (source_map: SourceMapConsumer, line: number, column: number) => OriginalPosition;
export declare function getSourceMap(fileUri: string, fileContents: string): Promise<SourceMapConsumer | null>;
