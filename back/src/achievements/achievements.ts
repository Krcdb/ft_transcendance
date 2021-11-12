export enum enumAchievements {
    // USER
    UPLOAD_AVATAR = 1,
    CHANGE_NAME,
    ACTIVATE_2FA,
    ONE_WINNING_OVER, // not activated yet
    ONE_LOSING_OVER, // not activated yet
    // USER RELATION 
    BLOCK_ONE_USER,
    BLOCK_3_USER,
    BLOCK_5_USER,
    BLOCK_10_USER,
    BLOCK_50_USER,
    BLOCK_100_USER,
    UNBLOCK_AN_USER,
    BLOCK_ALL_USERS, // not activated yet
    ADD_ONE_FRIEND,
    ADD_3_FRIEND,
    ADD_5_FRIEND,
    ADD_10_FRIEND,
    ADD_50_FRIEND,
    ADD_100_FRIEND,
    ADD_ALL_TO_FRIENDS, // not activated yet
    // CHAT
    PRIVATE_RANDOM_CHAT, // not activated yet
    START_FRIEND_CHAT, // not activated yet
    CREATE_PUBLIC_CHANNEL, // not activated yet
    CREATE_PRIVATE_CHANNEL, // not activated yet
    CREATE_ONLY_FRIENDS_CHANNEL, // not activated yet
    CREATE_ONLY_RANDOMS_CHANNEL, // not activated yet
    // GAME
    WATCH_GAME, // not activated yet
    START_GAME_FRIEND, // not activated yet
    START_GAME_RANDOM, // not activated yet
    START_GAME_FRIEND_INVITE, // not activated yet
    START_GAME_RANDOM_INVITE, // not activated yet
    WIN_ONE_GAME, // not activated yet
    WIN_3_IN_A_ROW, // not activated yet
    LOSE_ONE_GAME, // not activated yet
    LOSE_3_IN_A_ROW, // not activated yet
}

export interface AchievementsInterface {
    id: number;
    class: string;
    name: string;
    description: string;
}

// export 

export const allAchievement: AchievementsInterface[] = [
    // USER
    {
        id: enumAchievements.UPLOAD_AVATAR,
        class: "user",
        name: "I look like that",
        description: "Upload an Avatar",
    },
    {
        id: enumAchievements.CHANGE_NAME,
        class: "user",
        name: "My name is...",
        description: "Change your user name",
    },
    {
        id: enumAchievements.ACTIVATE_2FA,
        class: "user",
        name: "Please don't hack me !",
        description: "activate the 2-factor authentication",
    },
    {
        id: enumAchievements.ONE_WINNING_OVER,
        class: "user",
        name: "I'm a winner",
        description: "win 1 more games than you lost",
    },
    {
        id: enumAchievements.ONE_LOSING_OVER,
        class: "user",
        name: "I'm a loser",
        description: "lose 1 more games than you won",
    },
    //USER RELATION 
    {
        id: enumAchievements.BLOCK_ONE_USER,
        class: "relation",
        name: "i don't like you",
        description: "block one user",
    },
    {
        id: enumAchievements.BLOCK_3_USER,
        class: "relation",
        name: "i don't like you 2",
        description: "have three blocked users",
    },
    {
        id: enumAchievements.BLOCK_5_USER,
        class: "relation",
        name: "i don't like you 3",
        description: "have five blocked users",
    },
    {
        id: enumAchievements.BLOCK_10_USER,
        class: "relation",
        name: "i don't like you 4",
        description: "have ten blocked users",
    },
    {
        id: enumAchievements.BLOCK_50_USER,
        class: "relation",
        name: "i don't like you 5",
        description: "have fifty blocked users",
    },
    {
        id: enumAchievements.BLOCK_100_USER,
        class: "relation",
        name: "i don't like you 6",
        description: "have one hundred blocked users",
    },
    {
        id: enumAchievements.UNBLOCK_AN_USER,
        class: "relation",
        name: "maybe i do like you",
        description: "unblock an user",
    },
    {
        id: enumAchievements.BLOCK_ALL_USERS,
        class: "relation",
        name: "Talk to my hand",
        description: "block all users",
    },
    {
        id: enumAchievements.ADD_ONE_FRIEND,
        class: "relation",
        name: "the more the merrier",
        description: "add another user as friend",
    },
    {
        id: enumAchievements.ADD_3_FRIEND,
        class: "relation",
        name: "the more the merrier 2",
        description: "have three friends",
    },
    {
        id: enumAchievements.ADD_5_FRIEND,
        class: "relation",
        name: "the more the merrier 3",
        description: "have five friends",
    },
    {
        id: enumAchievements.ADD_10_FRIEND,
        class: "relation",
        name: "the more the merrier 4",
        description: "have ten friends",
    },
    {
        id: enumAchievements.ADD_50_FRIEND,
        class: "relation",
        name: "the more the merrier 5",
        description: "have fifty friends",
    },
    {
        id: enumAchievements.ADD_100_FRIEND,
        class: "relation",
        name: "the more the merrier 6",
        description: "have one hundred friends",
    },
    {
        id: enumAchievements.ADD_ALL_TO_FRIENDS,
        class: "relation",
        name: "i love everyone",
        description: "add all users as friends ",
    },
    // CHAT
    {
        id: enumAchievements.PRIVATE_RANDOM_CHAT,
        class: "chat",
        name: "Can i talk to you ?",
        description: "start a private chat with a random player",
    },
    {
        id: enumAchievements.START_FRIEND_CHAT,
        class: "chat",
        name: "Hi, my friend !",
        description: "start a chat with a friend",
    },
    {
        id: enumAchievements.CREATE_PUBLIC_CHANNEL,
        class: "chat",
        name: "Hey peoples",
        description: "create a public channel",
    },
    {
        id: enumAchievements.CREATE_PRIVATE_CHANNEL,
        class: "chat",
        name: "C.I.A",
        description: "create a private channel",
    },
    {
        id: enumAchievements.CREATE_ONLY_FRIENDS_CHANNEL,
        class: "chat",
        name: "Don't talk to strangers",
        description: "create a channel with only friends",
    },
    {
        id: enumAchievements.CREATE_ONLY_RANDOMS_CHANNEL,
        class: "chat",
        name: "I don't know anyone",
        description: "create a channel with only random user",
    },
    // GAME        
    {
        id: enumAchievements.WATCH_GAME,
        class: "game",
        name: "stalker",
        description: "watch a game",
    },
    {
        id: enumAchievements.START_GAME_FRIEND,
        class: "game",
        name: "Play with me, my friend",
        description: "start a game with a friend",
    },
    {
        id: enumAchievements.START_GAME_RANDOM,
        class: "game",
        name: "hey, let's play",
        description: "start a game with a random user",
    },
    {
        id: enumAchievements.START_GAME_FRIEND_INVITE,
        class: "game",
        name: "I'll play with you, my friend",
        description: "accept a game invitation from a friend",
    },
    {
        id: enumAchievements.START_GAME_RANDOM_INVITE,
        class: "game",
        name: "who are you ?",
        description: "accept a game invitation from a random user",
    },
    {
        id: enumAchievements.WIN_ONE_GAME,
        class: "game",
        name: "i love winning",
        description: "win one games",
    },
    {
        id: enumAchievements.WIN_3_IN_A_ROW,
        class: "game",
        name: "serial winner",
        description: "win 3 games in a row ",
    },
    {
        id: enumAchievements.LOSE_ONE_GAME,
        class: "game",
        name: "I'm not good at this game",
        description: "lose one game",
    },
    {
        id: enumAchievements.LOSE_3_IN_A_ROW,
        class: "game",
        name: "serial loser",
        description: "lose 3 game in a row",
    },
];

