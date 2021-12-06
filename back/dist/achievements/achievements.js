"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allAchievement = exports.enumAchievements = void 0;
var enumAchievements;
(function (enumAchievements) {
    enumAchievements[enumAchievements["UPLOAD_AVATAR"] = 1] = "UPLOAD_AVATAR";
    enumAchievements[enumAchievements["CHANGE_NAME"] = 2] = "CHANGE_NAME";
    enumAchievements[enumAchievements["ACTIVATE_2FA"] = 3] = "ACTIVATE_2FA";
    enumAchievements[enumAchievements["BLOCK_ONE_USER"] = 4] = "BLOCK_ONE_USER";
    enumAchievements[enumAchievements["BLOCK_3_USER"] = 5] = "BLOCK_3_USER";
    enumAchievements[enumAchievements["BLOCK_5_USER"] = 6] = "BLOCK_5_USER";
    enumAchievements[enumAchievements["BLOCK_10_USER"] = 7] = "BLOCK_10_USER";
    enumAchievements[enumAchievements["BLOCK_50_USER"] = 8] = "BLOCK_50_USER";
    enumAchievements[enumAchievements["BLOCK_100_USER"] = 9] = "BLOCK_100_USER";
    enumAchievements[enumAchievements["UNBLOCK_AN_USER"] = 10] = "UNBLOCK_AN_USER";
    enumAchievements[enumAchievements["ADD_ONE_FRIEND"] = 11] = "ADD_ONE_FRIEND";
    enumAchievements[enumAchievements["ADD_3_FRIEND"] = 12] = "ADD_3_FRIEND";
    enumAchievements[enumAchievements["ADD_5_FRIEND"] = 13] = "ADD_5_FRIEND";
    enumAchievements[enumAchievements["ADD_10_FRIEND"] = 14] = "ADD_10_FRIEND";
    enumAchievements[enumAchievements["ADD_50_FRIEND"] = 15] = "ADD_50_FRIEND";
    enumAchievements[enumAchievements["ADD_100_FRIEND"] = 16] = "ADD_100_FRIEND";
    enumAchievements[enumAchievements["CREATE_PUBLIC_CHANNEL"] = 17] = "CREATE_PUBLIC_CHANNEL";
    enumAchievements[enumAchievements["CREATE_PRIVATE_CHANNEL"] = 18] = "CREATE_PRIVATE_CHANNEL";
    enumAchievements[enumAchievements["WIN_ONE_GAME"] = 19] = "WIN_ONE_GAME";
    enumAchievements[enumAchievements["LOSE_ONE_GAME"] = 20] = "LOSE_ONE_GAME";
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
        id: enumAchievements.WIN_ONE_GAME,
        class: "game",
        name: "I love winning",
        description: "Win one games",
    },
    {
        id: enumAchievements.LOSE_ONE_GAME,
        class: "game",
        name: "I'm not good at this game",
        description: "Lose one game",
    },
];
//# sourceMappingURL=achievements.js.map