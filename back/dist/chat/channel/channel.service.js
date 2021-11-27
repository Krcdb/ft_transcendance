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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
const users_service_1 = require("../../users/users.service");
const websocket_service_1 = require("../../websocket/websocket.service");
let ChannelService = class ChannelService {
    constructor(channelRepository, usersService, socketService) {
        this.channelRepository = channelRepository;
        this.usersService = usersService;
        this.socketService = socketService;
    }
    async create(createChannelDto) {
        const channel = new channel_entity_1.Channel();
        channel.channelName = createChannelDto.channelName;
        channel.password = createChannelDto.password;
        channel.isPublic = createChannelDto.isPublic;
        channel.owner = createChannelDto.owner;
        channel.messagesHistory = [];
        channel.admins = [];
        channel.users = [];
        channel.banList = [];
        channel.muteList = [];
        channel.users.push(createChannelDto.owner);
        await this.usersService.addToChannelOwner(createChannelDto.owner, createChannelDto.channelName);
        await this.usersService.addToChannelUsers(createChannelDto.owner, createChannelDto.channelName);
        return (await this.channelRepository.save(channel));
    }
    async findOne(channelName) {
        return (await this.channelRepository.findOne(channelName));
    }
    async findAll() {
        return (await this.channelRepository.find());
    }
    async findAllPublicChannels() {
        return (await this.channelRepository.find({ isPublic: true }));
    }
    async findAllPublicChannelsOwners() {
        const channels = await this.findAllPublicChannels();
        let usersIds = [];
        channels.forEach((channel) => usersIds.push(channel.owner));
        return await this.usersService.getUsersInTab(usersIds);
    }
    async findAllPrivateChannels() {
        return (await this.channelRepository.find({ isPublic: false }));
    }
    async channelAlreadyExists(channelName) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel)
            return (true);
        return (false);
    }
    async findUserInChannel(channelName, userID) {
        const channel = await this.findOne(channelName);
        if (channel.users.indexOf(userID) !== -1)
            return (true);
        return (false);
    }
    async getUsersinChannel(channelName) {
        const channel = await this.channelRepository.findOne(channelName);
        return this.usersService.getUsersInTab(channel.users);
    }
    async addUserAsUser(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.users.push(userId);
        console.log("user added to ", channelName);
        await this.channelRepository.save(channel);
    }
    async addUserAsAdmin(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.admins.push(userId);
        await this.channelRepository.save(channel);
    }
    async addUserAsBanned(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.banList.push(userId);
        await this.channelRepository.save(channel);
    }
    async addUserAsMuted(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.muteList.push(userId);
        await this.channelRepository.save(channel);
    }
    async removeUserAsUser(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.users.splice(channel.users.indexOf(userId));
        await this.channelRepository.save(channel);
    }
    async removeUserAsAdmin(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.admins.splice(channel.admins.indexOf(userId));
        await this.channelRepository.save(channel);
    }
    async removeUserAsBanned(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.banList.splice(channel.banList.indexOf(userId));
        await this.channelRepository.save(channel);
    }
    async removeUserAsMuted(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.muteList.splice(channel.muteList.indexOf(userId));
        await this.channelRepository.save(channel);
    }
    async changeOwner(channelName, newOwnerId) {
        const channel = await this.channelRepository.findOne(channelName);
        await this.usersService.removeFromChannelOwner(channel.owner, channelName);
        await this.usersService.addToChannelOwner(newOwnerId, channelName);
        await this.channelRepository.update(channelName, { owner: newOwnerId });
    }
    async addMessageToHistory(channelName, messageId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.messagesHistory.push(messageId);
        await this.channelRepository.save(channel);
    }
    async getMessageHistory(channelName) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel != undefined)
            return (channel.messagesHistory);
    }
    async deleteOne(channelName) {
        const channel = await this.channelRepository.findOne(channelName);
        this.channelRepository.delete(channel);
        if (!channel)
            return (true);
        return (false);
    }
    async passwordMatch(channelName, password) {
        const channel = await this.channelRepository.findOne(channelName);
        if (!channel)
            return (false);
        else if (!channel.password)
            return (true);
        else if (channel.password === password)
            return (true);
        return (false);
    }
    async addSocketUser(socket, channelName) {
    }
    async refreshChannelMessages(server, socket, channelName) {
        const allUsers = (await this.findOne(channelName)).users;
        server.to(channelName).emit('refreshChannelMessages');
        for (let index = 0; index < allUsers.length; index++) {
            const element = allUsers[index];
            console.log("User: " + element);
            const currentSocket = await this.socketService.getSocketFromUserId(element, 'channel');
            if (currentSocket) {
                console.log("Socket send to user: " + element);
                currentSocket.emit('refreshChannelMessages');
            }
            else {
                console.log("socket: for ID : " + element + " is null");
            }
        }
        return (true);
    }
};
ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channel_entity_1.Channel)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => websocket_service_1.WebsocketService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        websocket_service_1.WebsocketService])
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map