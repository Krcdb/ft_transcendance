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
    ADD_ONE_FRIEND,
    ADD_3_FRIEND,
    ADD_5_FRIEND,
    ADD_10_FRIEND,
    ADD_50_FRIEND,
    ADD_100_FRIEND,
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
        description: "Turn-on the 2-factor authentication",
    },
    {
        id: enumAchievements.ONE_WINNING_OVER,
        class: "user",
        name: "I'm a winner",
        description: "Win 1 more games than you lost",
    },
    {
        id: enumAchievements.ONE_LOSING_OVER,
        class: "user",
        name: "I'm a loser",
        description: "Lose 1 more games than you won",
    },
    //USER RELATION 
    {
        id: enumAchievements.BLOCK_ONE_USER,
        class: "relation",
        name: "I don't like you",
        description: "Block one user",
    },
    {
        id: enumAchievements.BLOCK_3_USER,
        class: "relation",
        name: "I don't like you 2",
        description: "Have three blocked users",
    },
    {
        id: enumAchievements.BLOCK_5_USER,
        class: "relation",
        name: "I don't like you 3",
        description: "Have five blocked users",
    },
    {
        id: enumAchievements.BLOCK_10_USER,
        class: "relation",
        name: "I don't like you 4",
        description: "Have ten blocked users",
    },
    {
        id: enumAchievements.BLOCK_50_USER,
        class: "relation",
        name: "I don't like you 5",
        description: "Have fifty blocked users",
    },
    {
        id: enumAchievements.BLOCK_100_USER,
        class: "relation",
        name: "I don't like you 6",
        description: "Have one hundred blocked users",
    },
    {
        id: enumAchievements.UNBLOCK_AN_USER,
        class: "relation",
        name: "Maybe i do like you",
        description: "Unblock an user",
    },
    {
        id: enumAchievements.ADD_ONE_FRIEND,
        class: "relation",
        name: "The more the merrier",
        description: "Add another user as friend",
    },
    {
        id: enumAchievements.ADD_3_FRIEND,
        class: "relation",
        name: "The more the merrier 2",
        description: "Have three friends",
    },
    {
        id: enumAchievements.ADD_5_FRIEND,
        class: "relation",
        name: "The more the merrier 3",
        description: "Have five friends",
    },
    {
        id: enumAchievements.ADD_10_FRIEND,
        class: "relation",
        name: "The more the merrier 4",
        description: "Have ten friends",
    },
    {
        id: enumAchievements.ADD_50_FRIEND,
        class: "relation",
        name: "The more the merrier 5",
        description: "Have fifty friends",
    },
    {
        id: enumAchievements.ADD_100_FRIEND,
        class: "relation",
        name: "The more the merrier 6",
        description: "Have one hundred friends",
    },
    // CHAT
    {
        id: enumAchievements.PRIVATE_RANDOM_CHAT,
        class: "chat",
        name: "Can i talk to you ?",
        description: "Start a private chat with a random player",
    },
    {
        id: enumAchievements.START_FRIEND_CHAT,
        class: "chat",
        name: "Hi, my friend !",
        description: "Start a chat with a friend",
    },
    {
        id: enumAchievements.CREATE_PUBLIC_CHANNEL,
        class: "chat",
        name: "Hey peoples",
        description: "Create a public channel",
    },
    {
        id: enumAchievements.CREATE_PRIVATE_CHANNEL,
        class: "chat",
        name: "C.I.A",
        description: "Create a private channel",
    },
    {
        id: enumAchievements.CREATE_ONLY_FRIENDS_CHANNEL,
        class: "chat",
        name: "Don't talk to strangers",
        description: "Create a channel with only friends",
    },
    {
        id: enumAchievements.CREATE_ONLY_RANDOMS_CHANNEL,
        class: "chat",
        name: "I don't know anyone",
        description: "Create a channel with only random user",
    },
    // GAME        
    {
        id: enumAchievements.WATCH_GAME,
        class: "game",
        name: "Stalker",
        description: "Watch a game",
    },
    {
        id: enumAchievements.START_GAME_FRIEND,
        class: "game",
        name: "Play with me, my friend",
        description: "Start a game with a friend",
    },
    {
        id: enumAchievements.START_GAME_RANDOM,
        class: "game",
        name: "Hey, let's play",
        description: "Start a game with a random user",
    },
    {
        id: enumAchievements.START_GAME_FRIEND_INVITE,
        class: "game",
        name: "I'll play with you, my friend",
        description: "Accept a game invitation from a friend",
    },
    {
        id: enumAchievements.START_GAME_RANDOM_INVITE,
        class: "game",
        name: "Who are you ?",
        description: "Accept a game invitation from a random user",
    },
    {
        id: enumAchievements.WIN_ONE_GAME,
        class: "game",
        name: "I love winning",
        description: "Win one games",
    },
    {
        id: enumAchievements.WIN_3_IN_A_ROW,
        class: "game",
        name: "Serial winner",
        description: "Win 3 games in a row ",
    },
    {
        id: enumAchievements.LOSE_ONE_GAME,
        class: "game",
        name: "I'm not good at this game",
        description: "Lose one game",
    },
    {
        id: enumAchievements.LOSE_3_IN_A_ROW,
        class: "game",
        name: "Serial loser",
        description: "Lose 3 game in a row",
    },
];

