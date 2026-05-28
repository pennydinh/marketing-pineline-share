import type React from 'react';
export type InOutValue = {
    inFrame: number | null;
    outFrame: number | null;
};
export type TimelineInOutContextValue = Record<string, InOutValue>;
export type SetTimelineInOutContextValue = {
    setInAndOutFrames: (u: React.SetStateAction<TimelineInOutContextValue>) => void;
};
export declare const TimelineInOutContext: React.Context<TimelineInOutContextValue>;
export declare const SetTimelineInOutContext: React.Context<SetTimelineInOutContextValue>;
export declare const useTimelineInOutFramePosition: () => InOutValue;
export declare const useTimelineSetInOutFramePosition: () => SetTimelineInOutContextValue;
