export declare class User {
    id: number;
    userName: string;
    isActive: boolean;
    avatar: string;
    ladderLevel: number;
    achievements: number[];
    friends: number[];
    blockedUsers: number[];
    twoFAuthSecret?: string;
    isTwoFAuthEnabled: boolean;
}
