"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const fs = require("fs");
const achievements_1 = require("../achievements/achievements");
const achievements_2 = require("../achievements/achievements");
const match_service_1 = require("../match/match.service");
const match_entity_1 = require("../match/match.entity");
let UsersService = class UsersService {
    constructor(usersRepository, matchService) {
        this.usersRepository = usersRepository;
        this.matchService = matchService;
    }
    async create(createUserDto) {
        const user = new user_entity_1.User();
        user.userName = createUserDto.userName;
        user.id = createUserDto.id;
        user.ladderLevel = 10;
        user.achievements = [];
        user.friends = [];
        user.blockedUsers = [];
        return await this.usersRepository.save(user);
    }
    async setAchievementAsync(userId, achiev) {
        const user = await this.usersRepository.findOne(userId);
        if (user.achievements.indexOf(achiev) === -1) {
            user.achievements.push(achiev);
            await this.usersRepository.save(user);
        }
        return user;
    }
    setAchievement(user, achiev) {
        if (user.achievements.indexOf(achiev) === -1) {
            user.achievements.push(achiev);
        }
    }
    async getUsersInTab(usersIds) {
        const users = await this.usersRepository.find({
            id: (0, typeorm_2.In)(usersIds),
        });
        return users;
    }
    async findOrCreate(id, userName) {
        let user = await this.findOne(id);
        if (!user || user == undefined) {
            user = await this.create({ "userName": userName, "id": id });
            return {
                user: user,
                isCreated: true,
            };
        }
        return {
            user: user,
            isCreated: false,
        };
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne(id);
        return user;
    }
    async remove(id) {
        await this.DeleteOldAvatarFile(id);
        await this.usersRepository.delete(id);
    }
    async userExists(id) {
        const user = await this.usersRepository.findOne(id);
        if (user)
            return true;
        return false;
    }
    async userNameAlreadyExists(name) {
        const user = await this.usersRepository.findOne({ userName: name });
        if (user)
            return true;
        return false;
    }
    async setAvatar(id, avatarUrl) {
        this.DeleteOldAvatarFile(id);
        const tmp = await this.usersRepository.update(id, { avatar: avatarUrl });
        return this.setAchievementAsync(id, achievements_1.enumAchievements.UPLOAD_AVATAR);
    }
    async getAvatar(id) {
        return await this.usersRepository.findOne(id).then((user) => { return user.avatar; });
    }
    async DeleteOldAvatarFile(id) {
        const myAvatar = await this.usersRepository.findOne(id).then((user) => { return user.avatar; });
        if (myAvatar) {
            fs.unlink("avatars/" + myAvatar, (err) => {
                if (err)
                    console.log(err);
            });
        }
    }
    async removeAvatar(id) {
        await this.DeleteOldAvatarFile(id);
        await this.usersRepository.update(id, { avatar: null });
    }
    async updateUserName(id, updateUserNameDto) {
        await this.usersRepository.update(id, { userName: updateUserNameDto.newUserName });
        return this.setAchievementAsync(id, achievements_1.enumAchievements.CHANGE_NAME);
    }
    async updateLogState(id, isLog) {
        await this.usersRepository.update(id, { isActive: isLog });
        return await this.usersRepository.findOne(id);
    }
    async getAchievements(id) {
        const user = await this.usersRepository.findOne(id);
        let achievements = [];
        user.achievements.forEach(achiev_id => {
            achievements.push(achievements_1.allAchievement[achievements_1.allAchievement.map(x => x.id).indexOf(achiev_id)]);
        });
        achievements.reverse();
        return achievements;
    }
    async findAllPlayersMatchHistory(userId, matches) {
        const users = [];
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].playerOne != userId)
                users.push(await this.findOne(matches[i].playerOne));
            else if (matches[i].playerTwo != userId)
                users.push(await this.findOne(matches[i].playerTwo));
        }
        return users;
    }
    async updateLadderLevel(winnerId, loserId) {
        const winner = await this.usersRepository.findOne(winnerId);
        const loser = await this.usersRepository.findOne(loserId);
        if (winner.ladderLevel < loser.ladderLevel) {
            await this.usersRepository.update(winnerId, { ladderLevel: loser.ladderLevel });
            await this.usersRepository.update(loserId, { ladderLevel: winner.ladderLevel });
        }
    }
    async getFriends(id) {
        const user = await this.usersRepository.findOne(id);
        return this.getUsersInTab(user.friends);
    }
    async getBlocked(id) {
        const user = await this.usersRepository.findOne(id);
        return this.getUsersInTab(user.blockedUsers);
    }
    async getUsersexceptBlocked(id) {
        const user = await this.usersRepository.findOne(id);
        if (!user)
            return [];
        const users = await this.usersRepository.find({
            where: {
                id: (0, typeorm_2.Not)((0, typeorm_2.In)(user.blockedUsers))
            }
        });
        return users;
    }
    async addAsFriend(userId, id) {
        const user = await this.usersRepository.findOne(userId);
        if (user.blockedUsers.indexOf(id) !== -1)
            return "You can't add a blocked user as friend";
        if (user.friends.indexOf(id) === -1) {
            user.friends.push(id);
            if (user.friends.length > 0)
                this.setAchievement(user, achievements_1.enumAchievements.ADD_ONE_FRIEND);
            if (user.friends.length >= 3)
                this.setAchievement(user, achievements_1.enumAchievements.ADD_3_FRIEND);
            if (user.friends.length >= 5)
                this.setAchievement(user, achievements_1.enumAchievements.ADD_5_FRIEND);
            if (user.friends.length >= 10)
                this.setAchievement(user, achievements_1.enumAchievements.ADD_10_FRIEND);
            if (user.friends.length >= 50)
                this.setAchievement(user, achievements_1.enumAchievements.ADD_50_FRIEND);
            if (user.friends.length >= 100)
                this.setAchievement(user, achievements_1.enumAchievements.ADD_100_FRIEND);
            await this.usersRepository.save(user);
            return "Successfully added to your friends";
        }
        else
            return "Is already your friend";
    }
    async removeFromFriends(userId, id) {
        const user = await this.usersRepository.findOne(userId);
        if (user.friends.indexOf(id) === -1)
            return "This user is not in your friends list";
        else {
            user.friends.splice(user.friends.indexOf(id), 1);
            await this.usersRepository.save(user);
            return "Successfully removed from your friends list";
        }
    }
    async addAsBlocked(userId, blockedId) {
        const user = await this.usersRepository.findOne(userId);
        await this.removeFromFriends(userId, blockedId);
        if (user.blockedUsers.indexOf(blockedId) === -1) {
            if (user.friends.indexOf(blockedId) !== -1)
                user.friends.splice(user.friends.indexOf(blockedId), 1);
            user.blockedUsers.push(blockedId);
            if (user.blockedUsers.length > 0)
                this.setAchievement(user, achievements_1.enumAchievements.BLOCK_ONE_USER);
            if (user.blockedUsers.length >= 3)
                this.setAchievement(user, achievements_1.enumAchievements.BLOCK_3_USER);
            if (user.blockedUsers.length >= 5)
                this.setAchievement(user, achievements_1.enumAchievements.BLOCK_5_USER);
            if (user.blockedUsers.length >= 10)
                this.setAchievement(user, achievements_1.enumAchievements.BLOCK_10_USER);
            if (user.blockedUsers.length >= 50)
                this.setAchievement(user, achievements_1.enumAchievements.BLOCK_50_USER);
            if (user.blockedUsers.length >= 100)
                this.setAchievement(user, achievements_1.enumAchievements.BLOCK_100_USER);
            await this.usersRepository.save(user);
            return "Successfully Blocked";
        }
        else
            return "Is already Blocked";
    }
    async removeFromBlocked(userId, blockedId) {
        const user = await this.usersRepository.findOne(userId);
        if (user.blockedUsers.indexOf(blockedId) === -1)
            return "This user is not Blocked";
        else {
            user.blockedUsers.splice(user.blockedUsers.indexOf(blockedId), 1);
            this.setAchievement(user, achievements_1.enumAchievements.UNBLOCK_AN_USER);
            await this.usersRepository.save(user);
            return "Successfully Unblocked";
        }
    }
    async settwoFAuthSecret(secret, id) {
        return await this.usersRepository.update(id, {
            twoFAuthSecret: secret
        });
    }
    async turnOnTwoFAuth(id) {
        const user = await this.setAchievementAsync(id, achievements_1.enumAchievements.ACTIVATE_2FA);
        return this.usersRepository.update(id, {
            isTwoFAuthEnabled: true
        });
    }
    async turnOffTwoFAuth(id) {
        return await this.usersRepository.update(id, {
            isTwoFAuthEnabled: false
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => match_service_1.MatchService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        match_service_1.MatchService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map