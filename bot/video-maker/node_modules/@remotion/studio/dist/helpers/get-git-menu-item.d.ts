import type { GitSource } from '@remotion/studio-shared';
import type { ComboboxValue } from '../components/NewComposition/ComboBox';
import type { OriginalPosition } from '../error-overlay/react-overlay/utils/get-source-map';
export declare const getGitSourceName: (gitSource: GitSource) => string;
export declare const getGitSourceBranchUrl: (gitSource: GitSource) => string;
export declare const getGitRefUrl: (gitSource: GitSource, originalLocation: OriginalPosition) => string;
export declare const getGitMenuItem: () => ComboboxValue | null;
