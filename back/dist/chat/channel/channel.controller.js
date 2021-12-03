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
const update_channel_users_dto_1 = require("./dto/update-channel-users.dto");
const channel_password_dto_1 = require("./dto/channel-password.dto");
const user_entity_1 = require("../../users/user.entity");
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
        const channel = await this.channelService.create(createChannelDto);
        return res.status(common_2.HttpStatus.CREATED).json({
            message: "Channel has been created successfully",
            channel
        });
    }
    async addChannelUser(res, channelName, UpdateChannelUserDto) {
        if (await this.channelService.findUserInChannel(channelName, UpdateChannelUserDto.newUser)) {
            return res.status(common_2.HttpStatus.OK).json({
                message: "User already in channel"
            });
        }
        else {
            this.channelService.addUserAsUser(channelName, UpdateChannelUserDto.newUser);
            console.log("newUser: " + UpdateChannelUserDto.newUser);
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
    async canJoinChannel(res, channelName, channelPasswordDto) {
        if (!await this.channelService.findOne(channelName)) {
            return res.status(common_2.HttpStatus.NOT_FOUND).json({
                message: "Channel doesn't exist",
                value: false,
            });
        }
        if (await this.channelService.hasPassword(channelName) == false
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
    async deleteChannel(channelName) {
        await this.channelService.deleteOne(channelName);
        return ("successfully deleted");
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('createChannel'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_channel_dto_1.CreateChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "createChannel", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(':channelName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_channel_users_dto_1.UpdateChannelUserDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "addChannelUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAllChannels", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('public'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAllPublicChannels", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAllUserChannels", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/infos/:channelName'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelInfos", null);
__decorate([
    (0, common_1.Get)(':channelName/users'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getUsersinChannel", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':channelName/messagesHistory'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelHistory", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':channelName/channel-exist'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "channelExist", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(':channelName/join-channel'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('channelName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, channel_password_dto_1.ChannelPasswordDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "canJoinChannel", null);
__decorate([
    (0, public_decorator_1.Public)(),
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