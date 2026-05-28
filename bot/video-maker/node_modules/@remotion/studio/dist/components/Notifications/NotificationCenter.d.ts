import React from 'react';
type CreatedNotification = {
    replaceContent: (newContent: React.ReactNode, durationInMs: number | null) => void;
};
export declare const showNotification: (content: React.ReactNode, durationInMs: number | null) => CreatedNotification;
export declare const NotificationCenter: React.FC;
export {};
