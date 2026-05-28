type PortStatus = 'available' | 'unavailable';
export declare const testPortAvailableOnMultipleHosts: ({ hosts, port, }: {
    port: number;
    hosts: string[];
}) => Promise<PortStatus>;
export declare const getDesiredPort: ({ desiredPort, from, hostsToTry, to, }: {
    desiredPort: number | undefined;
    from: number;
    to: number;
    hostsToTry: string[];
}) => Promise<{
    port: number;
    unlockPort: () => void;
}>;
export {};
