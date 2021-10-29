import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity'
import { User } from '../users/user.entity'
import { UsersService } from 'src/users/users.service';


@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService
    ) {}

    create(userOne: User, userTwo: User) : Promise<Match> {
        const match = new Match();
        match.players[0] = userOne;
        match.players[1] = userTwo;
        match.scores[0] = 0;
        match.scores[1] = 0;
        return this.matchRepository.save(match);
    }

    // fonction pas encore testée
    async updateUsersAfterGame(matchId: number): Promise<void> {
        const match = await this.matchRepository.findOne(matchId);
        let winner = match.players[0];
        let loser = match.players[1];
        if (match.scores[0] < match.scores[1])
        {
            const tmp = loser;
            loser = winner;
            winner = tmp;
        }
        await this.usersService.addVictory(winner);
        await this.usersService.addDefeat(loser);
    }
}