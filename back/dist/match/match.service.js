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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("./match.entity");
const users_service_1 = require("../users/users.service");
let MatchService = class MatchService {
    constructor(matchRepository, usersService) {
        this.matchRepository = matchRepository;
        this.usersService = usersService;
    }
    async create(userOneId, userTwoId) {
        const match = new match_entity_1.Match();
        match.playerOne = userOneId;
        match.playerTwo = userTwoId;
        match.scorePlayerOne = 0;
        match.scorePlayerTwo = 0;
        return await this.matchRepository.save(match);
    }
    async findAll() {
        return await this.matchRepository.find();
    }
    async findAllWithUser(userId) {
        return await this.matchRepository.find({
            where: [
                { playerOne: userId },
                { playerTwo: userId },
            ]
        });
    }
    async findOne(matchId) {
        return await this.matchRepository.findOne(matchId);
    }
    async simulateMatch(matchId, playerOneScore, playerTwoScore) {
        const match = await this.matchRepository.findOne(matchId);
        match.scorePlayerOne = playerOneScore;
        match.scorePlayerTwo = playerTwoScore;
        await this.matchRepository.save(match);
    }
    async updateUsersAfterGame(matchId) {
        const match = await this.matchRepository.findOne(matchId);
        let winnerId = match.playerOne;
        let loserId = match.playerTwo;
        if (match.scorePlayerOne < match.scorePlayerTwo) {
            const tmp = loserId;
            loserId = winnerId;
            winnerId = tmp;
        }
        await this.usersService.addMatchToHistory(winnerId, matchId);
        await this.usersService.addMatchToHistory(loserId, matchId);
        await this.usersService.addVictory(winnerId);
        await this.usersService.addDefeat(loserId);
        await this.usersService.updateLadderLevel(winnerId, loserId);
    }
};
MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], MatchService);
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map