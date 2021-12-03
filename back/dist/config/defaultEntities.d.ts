declare const _default: {
    User: {
        id: number;
        userName: string;
        matchHistory: string[];
        nbVictories: number;
        nbLosses: number;
        ladderLevel: number;
        achievements: number[];
        friends: number[];
        blockedUsers: number[];
        channelsUserIsOwner: string[];
        channelsUserIsAdmin: string[];
        channelsUserIsIn: string[];
        channelsUserIsBanned: string[];
        channelsUserIsMuted: any[];
    }[];
    Channel: ({
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
    } | {
        channelName: string;
        owner: number;
        password: string;
        isProtected: boolean;
        isPublic: boolean;
        admins: any[];
        users: number[];
        banList: any[];
        muteList: any[];
        kickList: any[];
        messagesHistory: number[];
    })[];
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
