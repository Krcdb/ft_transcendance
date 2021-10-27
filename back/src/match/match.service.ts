import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity'
import { User } from '../users/user.entity'


@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>
    ) {}

    create(userOne: User, userTwo: User) : Promise<Match> {
        const match = new Match();
        match.players[0] = userOne;
        match.players[1] = userTwo;
        match.scores[0] = 0;
        match.scores[1] = 0;
        return this.matchRepository.save(match);
    }
}