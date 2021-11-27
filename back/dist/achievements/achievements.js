"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allAchievement = exports.enumAchievements = void 0;
var enumAchievements;
(function (enumAchievements) {
    enumAchievements[enumAchievements["UPLOAD_AVATAR"] = 1] = "UPLOAD_AVATAR";
    enumAchievements[enumAchievements["CHANGE_NAME"] = 2] = "CHANGE_NAME";
    enumAchievements[enumAchievements["ACTIVATE_2FA"] = 3] = "ACTIVATE_2FA";
    enumAchievements[enumAchievements["ONE_WINNING_OVER"] = 4] = "ONE_WINNING_OVER";
    enumAchievements[enumAchievements["ONE_LOSING_OVER"] = 5] = "ONE_LOSING_OVER";
    enumAchievements[enumAchievements["BLOCK_ONE_USER"] = 6] = "BLOCK_ONE_USER";
    enumAchievements[enumAchievements["BLOCK_3_USER"] = 7] = "BLOCK_3_USER";
    enumAchievements[enumAchievements["BLOCK_5_USER"] = 8] = "BLOCK_5_USER";
    enumAchievements[enumAchievements["BLOCK_10_USER"] = 9] = "BLOCK_10_USER";
    enumAchievements[enumAchievements["BLOCK_50_USER"] = 10] = "BLOCK_50_USER";
    enumAchievements[enumAchievements["BLOCK_100_USER"] = 11] = "BLOCK_100_USER";
    enumAchievements[enumAchievements["UNBLOCK_AN_USER"] = 12] = "UNBLOCK_AN_USER";
    enumAchievements[enumAchievements["ADD_ONE_FRIEND"] = 13] = "ADD_ONE_FRIEND";
    enumAchievements[enumAchievements["ADD_3_FRIEND"] = 14] = "ADD_3_FRIEND";
    enumAchievements[enumAchievements["ADD_5_FRIEND"] = 15] = "ADD_5_FRIEND";
    enumAchievements[enumAchievements["ADD_10_FRIEND"] = 16] = "ADD_10_FRIEND";
    enumAchievements[enumAchievements["ADD_50_FRIEND"] = 17] = "ADD_50_FRIEND";
    enumAchievements[enumAchievements["ADD_100_FRIEND"] = 18] = "ADD_100_FRIEND";
    enumAchievements[enumAchievements["PRIVATE_RANDOM_CHAT"] = 19] = "PRIVATE_RANDOM_CHAT";
    enumAchievements[enumAchievements["START_FRIEND_CHAT"] = 20] = "START_FRIEND_CHAT";
    enumAchievements[enumAchievements["CREATE_PUBLIC_CHANNEL"] = 21] = "CREATE_PUBLIC_CHANNEL";
    enumAchievements[enumAchievements["CREATE_PRIVATE_CHANNEL"] = 22] = "CREATE_PRIVATE_CHANNEL";
    enumAchievements[enumAchievements["CREATE_ONLY_FRIENDS_CHANNEL"] = 23] = "CREATE_ONLY_FRIENDS_CHANNEL";
    enumAchievements[enumAchievements["CREATE_ONLY_RANDOMS_CHANNEL"] = 24] = "CREATE_ONLY_RANDOMS_CHANNEL";
    enumAchievements[enumAchievements["WATCH_GAME"] = 25] = "WATCH_GAME";
    enumAchievements[enumAchievements["START_GAME_FRIEND"] = 26] = "START_GAME_FRIEND";
    enumAchievements[enumAchievements["START_GAME_RANDOM"] = 27] = "START_GAME_RANDOM";
    enumAchievements[enumAchievements["START_GAME_FRIEND_INVITE"] = 28] = "START_GAME_FRIEND_INVITE";
    enumAchievements[enumAchievements["START_GAME_RANDOM_INVITE"] = 29] = "START_GAME_RANDOM_INVITE";
    enumAchievements[enumAchievements["WIN_ONE_GAME"] = 30] = "WIN_ONE_GAME";
    enumAchievements[enumAchievements["WIN_3_IN_A_ROW"] = 31] = "WIN_3_IN_A_ROW";
    enumAchievements[enumAchievements["LOSE_ONE_GAME"] = 32] = "LOSE_ONE_GAME";
    enumAchievements[enumAchievements["LOSE_3_IN_A_ROW"] = 33] = "LOSE_3_IN_A_ROW";
})(enumAchievements = exports.enumAchievements || (exports.enumAchievements = {}));
exports.allAchievement = [
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
//# sourceMappingURL=achievements.js.map