type FileChangeType = 'created' | 'deleted' | 'changed';
export declare const installFileWatcher: ({ file, onChange, }: {
    file: string;
    onChange: (type: FileChangeType) => void;
}) => {
    exists: boolean;
    unwatch: () => void;
};
export {};
