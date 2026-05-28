import type { ApiRoutes } from '@remotion/studio-shared';
import type { ApiHandler } from './api-types';
export declare const allApiRoutes: {
    [key in keyof ApiRoutes]: ApiHandler<ApiRoutes[key]['Request'], ApiRoutes[key]['Response']>;
};
