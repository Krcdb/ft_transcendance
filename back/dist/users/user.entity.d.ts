export declare class User {
    id: number;
    userName: string;
    isActive: boolean;
    avatar: string;
    ladderLevel: number;
    achievements: number[];
    friends: number[];
    blockedUsers: number[];
    isWebsiteOwner: boolean;
    isWebsiteAdmin: boolean;
    twoFAuthSecret?: string;
    isTwoFAuthEnabled: boolean;
}
