declare const _default: {
    User: {
        id: number;
        userName: string;
        ladderLevel: number;
        achievements: number[];
        friends: number[];
        blockedUsers: number[];
        isWebsiteOwner: boolean;
        isWebsiteAdmin: boolean;
    }[];
    Channel: {
        channelName: string;
        owner: number;
        password: any;
        isProtected: boolean;
        isPublic: boolean;
        admins: number[];
        users: number[];
        banList: number[];
        muteList: any[];
        kickList: any[];
        messagesHistory: number[];
    }[];
    Message: {
        id: number;
        channelName: string;
        owner: number;
        message: string;
        dateStr: string;
    }[];
    Match: {
        playerOne: number;
        playerTwo: number;
        scorePlayerOne: number;
        scorePlayerTwo: number;
    }[];
};
export default _default;
