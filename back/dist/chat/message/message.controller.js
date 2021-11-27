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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const public_decorator_1 = require("../../auth/utils/public.decorator");
const message_service_1 = require("./message.service");
const channel_service_1 = require("../channel/channel.service");
const create_message_dto_1 = require("./dto/create-message.dto");
let MessageController = class MessageController {
    constructor(messageService, channelService) {
        this.messageService = messageService;
        this.channelService = channelService;
    }
    async postMessageOnChannel(channelName, res, createMessageDto) {
        const msg = await this.messageService.create(createMessageDto, channelName);
        console.log("msg = ", msg);
        if (msg == null)
            return res.status(common_2.HttpStatus.NOT_FOUND).json({
                message: "Couldn't find channel with given name"
            });
        await this.messageService.addMessageToHistories(msg);
        return res.status(common_2.HttpStatus.CREATED).json({
            message: "Message has been created successfully",
            msg
        });
    }
    async findAll() {
        return await this.messageService.findAll();
    }
    async findAllInChannel(channelName) {
        return await this.messageService.findAllInChannel(channelName);
    }
    async findOne(id) {
        return await this.messageService.findOne(id);
    }
    async findAllByUserId(ownerId) {
        return await this.messageService.findAllByUser(ownerId);
    }
    async remove(id) {
        return await this.messageService.remove(id);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(':channelName'),
    __param(0, (0, common_1.Param)('channelName')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "postMessageOnChannel", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':channelName/msg'),
    __param(0, (0, common_1.Param)('channelName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAllInChannel", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':owner/'),
    __param(0, (0, common_1.Param)('owner')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "remove", null);
MessageController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        channel_service_1.ChannelService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map