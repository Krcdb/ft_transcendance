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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./message.entity");
const channel_service_1 = require("../channel/channel.service");
let MessageService = class MessageService {
    constructor(messageRepository, channelService) {
        this.messageRepository = messageRepository;
        this.channelService = channelService;
    }
    async create(createMessageDto, channelName) {
        if (await this.channelService.channelAlreadyExists(channelName) == false)
            return null;
        const message = new message_entity_1.Message();
        message.channelName = channelName;
        message.owner = createMessageDto.owner;
        message.message = createMessageDto.message;
        message.dateStr = Date.now().toString();
        return await this.messageRepository.save(message);
    }
    async addMessageToHistories(message) {
        await this.channelService.addMessageToHistory(message.channelName, message.id);
    }
    async remove(msgId) {
        await this.messageRepository.delete(msgId);
    }
    async findOne(msgId) {
        return await this.messageRepository.findOne(msgId);
    }
    async findAll() {
        return await this.messageRepository.find();
    }
    async findAllByUser(ownerId) {
        return await this.messageRepository.find({ owner: ownerId });
    }
    async findAllInChannel(channelName) {
        return await this.messageRepository.find({ channelName: channelName });
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => channel_service_1.ChannelService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        channel_service_1.ChannelService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map