import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity'
import { UsersService } from 'src/users/users.service';


@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService
    ) {}

    async create(userOneId: number, userTwoId: number) : Promise<Match> {
        const match = new Match();
        match.playerOne = userOneId;
        match.playerTwo = userTwoId;
        match.scorePlayerOne = 0;
        match.scorePlayerTwo = 0;
        return await this.matchRepository.save(match);
    }

    async findAll() : Promise<Match[]> {
        return await this.matchRepository.find();
    }
    async findAllWithUser(userId: number) : Promise<Match[]> {
        return await this.matchRepository.find({ playerOne: userId, playerTwo: userId});
    }
    async findOne(matchId: number): Promise<Match> {
        return await this.matchRepository.findOne(matchId);
    }

    // fonction temporaire pour faire des tests
    async simulateMatch(matchId: number, playerOneScore: number, playerTwoScore: number) : Promise<void> {
        const match = await this.matchRepository.findOne(matchId);
        match.scorePlayerOne = playerOneScore;
        match.scorePlayerTwo = playerTwoScore;
        await this.matchRepository.save(match);
    }

    // testée et approuvée !!
    async updateUsersAfterGame(matchId: number): Promise<void> {
        const match = await this.matchRepository.findOne(matchId);
        let winnerId = match.playerOne;
        let loserId = match.playerTwo;
        if (match.scorePlayerOne < match.scorePlayerTwo)
        {
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
}