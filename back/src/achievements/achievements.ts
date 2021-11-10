export enum enumAchievements {
    // USER
    UPLOAD_AVATAR = 1,
    CHANGE_NAME,
    ACTIVATE_2FA,
    ONE_WINNING_OVER, // not activated yet
    ONE_LOSING_OVER, // not activated yet
    // USER RELATION 
    BLOCK_ONE_USER,
    UNBLOCK_AN_USER,
    BLOCK_ALL_USERS, // not activated yet
    ADD_ONE_FRIEND,
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
    name: string;
    description: string;
}

// export 

export const allAchievement: AchievementsInterface[] = [
    // USER
    {
        id: enumAchievements.UPLOAD_AVATAR,
        name: "I look like that",
        description: "Upload an Avatar",
    },
    {
        id: enumAchievements.CHANGE_NAME,
        name: "My name is...",
        description: "Change your user name",
    },
    {
        id: enumAchievements.ACTIVATE_2FA,
        name: "Please don't hack me !",
        description: "activate the 2-factor authentication",
    },
    {
        id: enumAchievements.ONE_WINNING_OVER,
        name: "I'm a winner",
        description: "win 1 more games than you lost",
    },
    {
        id: enumAchievements.ONE_LOSING_OVER,
        name: "I'm a loser",
        description: "lose 1 more games than you won",
    },
    //USER RELATION 
    {
        id: enumAchievements.BLOCK_ONE_USER,
        name: "i don't like you",
        description: "block one user",
    },
    {
        id: enumAchievements.UNBLOCK_AN_USER,
        name: "maybe i do like you",
        description: "unblock an user",
    },
    {
        id: enumAchievements.BLOCK_ALL_USERS,
        name: "Talk to my hand",
        description: "block all users",
    },
    {
        id: enumAchievements.ADD_ONE_FRIEND,
        name: "the more the merrier",
        description: "add another user as friend",
    },
    {
        id: enumAchievements.ADD_ALL_TO_FRIENDS,
        name: "i love everyone",
        description: "add all users as friends ",
    },
    // CHAT
    {
        id: enumAchievements.PRIVATE_RANDOM_CHAT,
        name: "Can i talk to you ?",
        description: "start a private chat with a random player",
    },
    {
        id: enumAchievements.START_FRIEND_CHAT,
        name: "Hi, my friend !",
        description: "start a chat with a friend",
    },
    {
        id: enumAchievements.CREATE_PUBLIC_CHANNEL,
        name: "Hey peoples",
        description: "create a public channel",
    },
    {
        id: enumAchievements.CREATE_PRIVATE_CHANNEL,
        name: "C.I.A",
        description: "create a private channel",
    },
    {
        id: enumAchievements.CREATE_ONLY_FRIENDS_CHANNEL,
        name: "Don't talk to strangers",
        description: "create a channel with only friends",
    },
    {
        id: enumAchievements.CREATE_ONLY_RANDOMS_CHANNEL,
        name: "I don't know anyone",
        description: "create a channel with only random user",
    },
        // GAME        
        {
            id: enumAchievements.WATCH_GAME,
            name: "stalker",
            description: "watch a game",
        },
        {
            id: enumAchievements.START_GAME_FRIEND,
            name: "Play with me, my friend",
            description: "start a game with a friend",
        },
        {
            id: enumAchievements.START_GAME_RANDOM,
            name: "hey, let's play",
            description: "start a game with a random user",
        },
        {
            id: enumAchievements.START_GAME_FRIEND_INVITE,
            name: "I'll play with you, my friend",
            description: "accept a game invitation from a friend",
        },

        {
            id: enumAchievements.START_GAME_RANDOM_INVITE,
            name: "who are you ?",
            description: "accept a game invitation from a random user",
        },
        {
            id: enumAchievements.WIN_ONE_GAME,
            name: "i love winning",
            description: "win one games",
        },
        {
            id: enumAchievements.WIN_3_IN_A_ROW,
            name: "serial winner",
            description: "win 3 games in a row ",
        },
        {
            id: enumAchievements.LOSE_ONE_GAME,
            name: "I'm not good at this game",
            description: "lose one game",
        },
        {
            id: enumAchievements.LOSE_3_IN_A_ROW,
            name: "serial loser",
            description: "lose 3 game in a row",
        },
];

