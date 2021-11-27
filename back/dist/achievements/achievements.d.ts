export declare enum enumAchievements {
    UPLOAD_AVATAR = 1,
    CHANGE_NAME = 2,
    ACTIVATE_2FA = 3,
    ONE_WINNING_OVER = 4,
    ONE_LOSING_OVER = 5,
    BLOCK_ONE_USER = 6,
    BLOCK_3_USER = 7,
    BLOCK_5_USER = 8,
    BLOCK_10_USER = 9,
    BLOCK_50_USER = 10,
    BLOCK_100_USER = 11,
    UNBLOCK_AN_USER = 12,
    ADD_ONE_FRIEND = 13,
    ADD_3_FRIEND = 14,
    ADD_5_FRIEND = 15,
    ADD_10_FRIEND = 16,
    ADD_50_FRIEND = 17,
    ADD_100_FRIEND = 18,
    PRIVATE_RANDOM_CHAT = 19,
    START_FRIEND_CHAT = 20,
    CREATE_PUBLIC_CHANNEL = 21,
    CREATE_PRIVATE_CHANNEL = 22,
    CREATE_ONLY_FRIENDS_CHANNEL = 23,
    CREATE_ONLY_RANDOMS_CHANNEL = 24,
    WATCH_GAME = 25,
    START_GAME_FRIEND = 26,
    START_GAME_RANDOM = 27,
    START_GAME_FRIEND_INVITE = 28,
    START_GAME_RANDOM_INVITE = 29,
    WIN_ONE_GAME = 30,
    WIN_3_IN_A_ROW = 31,
    LOSE_ONE_GAME = 32,
    LOSE_3_IN_A_ROW = 33
}
export interface AchievementsInterface {
    id: number;
    class: string;
    name: string;
    description: string;
}
export declare const allAchievement: AchievementsInterface[];
