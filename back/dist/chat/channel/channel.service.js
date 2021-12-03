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
        if (channel.password)
            channel.isProtected = true;
        channel.owner = createChannelDto.owner;
        channel.messagesHistory = [];
        channel.admins = [createChannelDto.owner];
        channel.users = [createChannelDto.owner];
        channel.banList = [];
        channel.muteList = [];
        channel.kickList = [];
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
        const channels = await this.channelRepository.find({ isPublic: true });
        let usersIds = [];
        channels.forEach((channel) => usersIds.push(channel.owner));
        const owners = await this.usersService.getUsersInTab(usersIds);
        return {
            channels: channels,
            owners: owners,
        };
    }
    async findAllUserChannels(userId) {
        const channels = await this.channelRepository.find();
        let mychannels = [];
        let usersIds = [];
        channels.forEach((chan) => {
            for (let i = 0; i < chan.users.length; i++) {
                if (chan.users[i] == userId) {
                    mychannels.push(chan);
                    break;
                }
            }
        });
        mychannels.forEach((channel) => usersIds.push(channel.owner));
        const owners = await this.usersService.getUsersInTab(usersIds);
        return {
            channels: mychannels,
            owners: owners,
        };
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
        if (channel.users.indexOf(userID) !== -1) {
            let index = channel.users.indexOf(userID);
            if (index !== -1) {
                channel.kickList.splice(index, 1);
            }
            return (true);
        }
        return (false);
    }
    async userIsAuthorized(channelName, userId) {
        const channel = await this.findOne(channelName);
        if (channel.users.indexOf(userId) == -1)
            return (false);
        if (channel.muteList.indexOf(userId) != -1)
            return (false);
        return (true);
    }
    async userIsBan(channelName, userId) {
        const channel = await this.findOne(channelName);
        if (channel.banList.indexOf(userId) != -1)
            return (true);
        return (false);
    }
    async getUsersinChannel(channelName) {
        const channel = await this.channelRepository.findOne(channelName);
        const users = await this.usersService.getUsersInTab(channel.users);
        return await users.filter((user) => channel.banList.indexOf(user.id) == -1 && channel.kickList.indexOf(user.id) == -1);
    }
    async getBanListChannel(channelName) {
        const channel = await this.channelRepository.findOne(channelName);
        return this.usersService.getUsersInTab(channel.banList);
    }
    async addUserAsUser(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.users.push(userId);
        console.log("user added to ", channelName);
        await this.channelRepository.save(channel);
    }
    async userLeftChannel(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        let index = channel.users.indexOf(userId);
        if (index != -1) {
            channel.users.splice(index, 1);
            console.log("user", userId, " removed from users in ", channelName);
            index = channel.kickList.indexOf(userId);
            if (index != -1) {
                channel.kickList.splice(index, 1);
                console.log("user", userId, " removed from kick in ", channelName);
            }
            index = channel.admins.indexOf(userId);
            if (index != -1) {
                channel.admins.splice(index, 1);
                console.log("user", userId, " removed from admin in ", channelName);
            }
            if (channel.owner == userId) {
                channel.owner = null;
                console.log("owner left...");
            }
            await this.channelRepository.save(channel);
        }
    }
    async addUserAsAdmin(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel.admins.indexOf(userId) == -1) {
            console.log(userId, "added to admin");
            channel.admins.push(userId);
            console.log("return add admin");
            return await this.channelRepository.save(channel);
        }
        return;
    }
    async addUserAsMuted(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel.muteList.indexOf(userId) == -1 && channel.owner != userId) {
            channel.muteList.push(userId);
            console.log(userId, "has been muted in", channelName);
            return await this.channelRepository.save(channel);
        }
    }
    async addUserAsBanned(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel.banList.indexOf(userId) == -1 && channel.owner != userId) {
            channel.banList.push(userId);
            console.log(userId, "has been banned from", channelName);
            return await this.channelRepository.save(channel);
        }
    }
    async addUserAsKicked(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel.kickList.indexOf(userId) == -1 && channel.owner != userId) {
            channel.kickList.push(userId);
            console.log(userId, "has been kicked from", channelName);
            return await this.channelRepository.save(channel);
        }
    }
    async removeUserAsUser(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        channel.users.splice(channel.users.indexOf(userId));
        return await this.channelRepository.save(channel);
    }
    async removeUserAsAdmin(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel.admins.indexOf(userId) != -1) {
            console.log("removed from admins");
            channel.admins.splice(channel.admins.indexOf(userId), 1);
            return await this.channelRepository.save(channel);
        }
    }
    async removeUserAsMuted(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel.muteList.indexOf(userId) != -1) {
            channel.muteList.splice(channel.muteList.indexOf(userId), 1);
            console.log(userId, "has been unmute in", channelName);
            return await this.channelRepository.save(channel);
        }
    }
    async removeUserAsBanned(channelName, userId) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel.banList.indexOf(userId) != -1) {
            channel.banList.splice(channel.banList.indexOf(userId), 1);
            console.log(userId, "has been unbanned from", channelName);
            return await this.channelRepository.save(channel);
        }
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
        console.log(password + " === " + channel.password);
        if (!channel)
            return (false);
        else if (!channel.password)
            return (true);
        else if (channel.password === password)
            return (true);
        return (false);
    }
    async hasPassword(channelName) {
        const channel = await this.channelRepository.findOne(channelName);
        if (channel)
            return (channel.isProtected);
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
    async refreshChannelInfos(server, socket, channelName) {
        const allUsers = (await this.findOne(channelName)).users;
        server.to(channelName).emit('refreshChannelInfo');
        for (let index = 0; index < allUsers.length; index++) {
            const element = allUsers[index];
            console.log("User: " + element);
            const currentSocket = await this.socketService.getSocketFromUserId(element, 'channel');
            if (currentSocket) {
                console.log("Socket send to user: " + element);
                currentSocket.emit('refreshChannelInfo');
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