export declare enum enumAchievements {
    UPLOAD_AVATAR = 1,
    CHANGE_NAME = 2,
    ACTIVATE_2FA = 3,
    BLOCK_ONE_USER = 4,
    BLOCK_3_USER = 5,
    BLOCK_5_USER = 6,
    BLOCK_10_USER = 7,
    BLOCK_50_USER = 8,
    BLOCK_100_USER = 9,
    UNBLOCK_AN_USER = 10,
    ADD_ONE_FRIEND = 11,
    ADD_3_FRIEND = 12,
    ADD_5_FRIEND = 13,
    ADD_10_FRIEND = 14,
    ADD_50_FRIEND = 15,
    ADD_100_FRIEND = 16,
    CREATE_PUBLIC_CHANNEL = 17,
    CREATE_PRIVATE_CHANNEL = 18,
    WIN_ONE_GAME = 19,
    LOSE_ONE_GAME = 20
}
export interface AchievementsInterface {
    id: number;
    class: string;
    name: string;
    description: string;
}
export declare const allAchievement: AchievementsInterface[];
