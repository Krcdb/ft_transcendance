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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../auth/utils/public.decorator");
const match_service_1 = require("./match.service");
const post_match_dto_1 = require("./dto/post-match.dto");
const create_match_dto_1 = require("./dto/create-match.dto");
let MatchController = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    async createMatch(createMatchDto) {
        const match = await this.matchService.create(createMatchDto.playerOne, createMatchDto.playerTwo);
        return match;
    }
    async endMatch(matchId, postMatchDto) {
        console.log("endMatch");
        const match = await this.matchService.findOne(matchId);
        await this.matchService.simulateMatch(matchId, postMatchDto.scorePlayerOne, postMatchDto.scorePlayerTwo);
        await this.matchService.updateUsersAfterGame(matchId);
    }
    async findAllMatches() {
        return await this.matchService.findAll();
    }
    async findOne(matchId) {
        return await this.matchService.findOne(matchId);
    }
    async findAllWithUser(userId) {
        return await this.matchService.findAllWithUser(userId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_match_dto_1.CreateMatchDto]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "createMatch", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, post_match_dto_1.PostMatchDto]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "endMatch", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findAllMatches", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findAllWithUser", null);
MatchController = __decorate([
    (0, common_1.Controller)('game'),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
exports.MatchController = MatchController;
//# sourceMappingURL=match.controller.js.map