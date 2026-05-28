export declare const subscribeToFileExistenceWatchers: ({ file: relativeFile, remotionRoot, clientId, }: {
    file: string;
    remotionRoot: string;
    clientId: string;
}) => {
    exists: boolean;
};
export declare const unsubscribeFromFileExistenceWatchers: ({ file, remotionRoot, clientId, }: {
    file: string;
    remotionRoot: string;
    clientId: string;
}) => void;
export declare const unsubscribeClientFileExistenceWatchers: (clientId: string) => void;
