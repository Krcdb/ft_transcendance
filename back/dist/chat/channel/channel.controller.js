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
exports.ChannelController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const public_decorator_1 = require("../../auth/utils/public.decorator");
const channel_service_1 = require("./channel.service");
const create_channel_dto_1 = require("./dto/create-channel.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const channel_password_dto_1 = require("./dto/channel-password.dto");
const user_entity_1 = require("../../users/user.entity");
const id_dto_1 = require("../../users/dto/id.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
let ChannelController = class ChannelController {
    constructor(channelService) {
        this.channelService = channelService;
    }
    async createChannel(res, createChannelDto) {
        if (await this.channelService.channelAlreadyExists(createChannelDto.channelName)) {
            return res.status(common_2.HttpStatus.CONFLICT).json({
                message: "Channel already exists"
            });
        }
        console.log("after check");
        const channel = await this.channelService.create(createChannelDto);
        return res.status(common_2.HttpStatus.CREATED).json({
            message: "Channel has been created successfully",
            channel
        });
    }
    async canJoinChannel(res, channelName, channelPasswordDto) {
        if (!await this.channelService.findOne(channelName)) {
            return res.status(common_2.HttpStatus.NOT_FOUND).json({
                message: "Channel doesn't exist",
                value: false,
            });
        }
        else if (await this.channelService.hasPassword(channelName) == false
            || await this.channelService.passwordMatch(channelName, channelPasswordDto.password) == true) {
            return res.status(common_2.HttpStatus.OK).json({
                message: "Can join channel",
                value: true,
            });
        }
        else {
            return res.status(common_2.HttpStatus.CONFLICT).json({
                message: "Password does not match",
                value: false,
            });
        }
    }
    async updateChannelAdmin(res, channelName, updateUserDto) {
        if (updateUserDto.toAdd) {
            await this.channelService.addUserAsAdmin(channelName, updateUserDto.user);
            return res.status(common_2.HttpStatus.OK).json({
                message: "User added to admins"
            });
        }
        else {
            await this.channelService.removeUserAsAdmin(channelName, updateUserDto.user);
            return res.status(common_2.HttpStatus.OK).json({
                message: "User removed from admins"
            });
        }
    }
    async updateChannelMuteList(res, channelName, updateUserDto) {
        if (updateUserDto.toAdd) {
            await this.channelService.addUserAsMuted(channelName, updateUserDto.user);
            return res.status(common_2.HttpStatus.OK).json({
                message: "User added to muted"
            });
        }
        else {
            await this.channelService.removeUserAsMuted(channelName, updateUserDto.user);
            return res.status(common_2.HttpStatus.OK).json({
                message: "User removed from muted"
            });
        }
    }
    async updateChannelBanList(res, channelName, updateUserDto) {
        if (updateUserDto.toAdd) {
            await this.channelService.addUserAsBanned(channelName, updateUserDto.user);
            return res.status(common_2.HttpStatus.OK).json({
                message: "User added to banned"
            });
        }
        else {
            await this.channelService.removeUserAsBanned(channelName, updateUserDto.user);
            return res.status(common_2.HttpStatus.OK).json({
                message: "User removed from banned"
            });
        }
    }
    async addUserAsKicked(res, channelName, idDto) {
        await this.channelService.addUserAsKicked(channelName, idDto.id);
        return res.status(common_2.HttpStatus.OK).json({
            message: "User has been kikcked"
        });
    }
    async updateChannelPassword(res, channelName, updatePasswordDto) {
        console.log("dto = ", updatePasswordDto);
        if (updatePasswordDto.toAdd) {
            try {
                const channel = await this.channelService.updatePassword(channelName, updatePasswordDto.currentPassword, updatePasswordDto.newPassword);
                return res.status(common_2.HttpStatus.OK).json({
                    message: "Password updated",
                    channel: channel,
                });
            }
            catch (error) {
                console.log("--------");
                console.log(error.response.statusCode);
                console.log(error.response.message);
                console.log(error.response.error);
                console.log("--------");
                return res.status(error.response.statusCode).json({
                    message: error.response.message,
                });
            }
        }
        else {
            const channel = await this.channelService.removePassword(channelName, updatePasswordDto.currentPassword);
            return res.status(common_2.HttpStatus.OK).json({
                message: "Password removed from Channel",
                channel: channel,
            });
        }
    }
    async addChannelUser(res, channelName, updateUserDto) {
        if (await this.channelService.findUserInChannel(channelName, updateUserDto.user)) {
            if (!updateUserDto.toAdd) {
                await this.channelService.userLeftChannel(channelName, updateUserDto.user);
                return res.status(common_2.HttpStatus.OK).json({
                    message: "User removed from channel"
                });
            }
            return res.status(common_2.HttpStatus.OK).json({
                message: "User already in channel"
            });
        }
        else if (updateUserDto.toAdd) {
            this.channelService.addUserAsUser(channelName, updateUserDto.user);
            console.log("newUser: " + updateUserDto.user);
            return (res.status(common_2.HttpStatus.CREATED).json({
                message: `"User successfully added to channel !" + "channelName"`
            }));
        }
    }
    async findAllChannels() {
        return (await this.channelService.findAll());
    }
    async findAllPublicChannels() {
        return (await this.channelService.findAllPublicChannels());
    }
    async findAllUserChannels(userId) {
        return (await this.channelService.findAllUserChannels(userId));
    }
    async getChannelInfos(channelName) {
        return (await this.channelService.findOne(channelName));
    }
    async getUsersinChannel(channelName) {
        return (await this.channelService.getUsersinChannel(channelName));
    }
    getChannelHistory(channelName) {
        return (this.channelService.getMessageHistory(channelName));
    }
    async channelExist(channelName) {
        console.log("checking channel: " + channelName);
        if (await this.channelService.findOne(channelName))
            return (true);
        return (false);
    }
    async getBanList(channelName) {
        return (this.channelService.getBanListChannel(channelName));
    }
    async deleteChannel(channelName) {
        await this.channelService.deleteOne(channelName);
        return ("successfully deleted");
    }
};
__decorate([
    (0, common_1.Post)('createChannel'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_channel_dto_1.CreateChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "createChannel", null);
__decorate([
    (0, common_1.Post)('join-channel/:channelName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, channel_password_dto_1.ChannelPasswordDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "canJoinChannel", null);
__decorate([
    (0, common_1.Post)('/admin/:channelName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateChannelAdmin", null);
__decorate([
    (0, common_1.Post)('/mute/:channelName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateChannelMuteList", null);
__decorate([
    (0, common_1.Post)('/ban/:channelName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateChannelBanList", null);
__decorate([
    (0, common_1.Post)('/kick/:channelName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, id_dto_1.IdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "addUserAsKicked", null);
__decorate([
    (0, common_1.Post)('/password/:channelName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateChannelPassword", null);
__decorate([
    (0, common_1.Post)('/update-user/:channelName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "addChannelUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAllChannels", null);
__decorate([
    (0, common_1.Get)('public'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAllPublicChannels", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAllUserChannels", null);
__decorate([
    (0, common_1.Get)('infos/:channelName'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelInfos", null);
__decorate([
    (0, common_1.Get)('users/:channelName'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getUsersinChannel", null);
__decorate([
    (0, common_1.Get)('messagesHistory/:channelName'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelHistory", null);
__decorate([
    (0, common_1.Get)('channel-exist/:channelName'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "channelExist", null);
__decorate([
    (0, common_1.Get)('banlist/:channelName'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getBanList", null);
__decorate([
    (0, common_1.Delete)(':channelName'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "deleteChannel", null);
ChannelController = __decorate([
    (0, common_1.Controller)('channel'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
exports.ChannelController = ChannelController;
//# sourceMappingURL=channel.controller.js.map