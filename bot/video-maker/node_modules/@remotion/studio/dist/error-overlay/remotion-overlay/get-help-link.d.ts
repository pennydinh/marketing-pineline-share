export type THelpLink = {
    url: string;
    title: string;
};
export declare const getHelpLink: (message: string) => THelpLink | null;
