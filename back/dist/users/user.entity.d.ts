export declare class User {
    id: number;
    userName: string;
    isActive: boolean;
    avatar: string;
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
    channelsUserIsMuted: string[];
    twoFAuthSecret?: string;
    isTwoFAuthEnabled: boolean;
}
