export declare class Channel {
    channelName: string;
    password: string;
    isPublic: boolean;
    isProtected: boolean;
    owner: number;
    messagesHistory: number[];
    admins: number[];
    users: number[];
    banList: number[];
    muteList: number[];
    kickList: number[];
}
