import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { UsersService } from 'src/users/users.service';
export declare class MatchService {
    private readonly matchRepository;
    private readonly usersService;
    constructor(matchRepository: Repository<Match>, usersService: UsersService);
    create(userOneId: number, userTwoId: number): Promise<Match>;
    findAll(): Promise<Match[]>;
    countVictoriesLosses(userId: number, matches: Match[]): Promise<{
        victories: number;
        losses: number;
    }>;
    findAllWithUser(userId: number): Promise<any>;
    findOne(matchId: string): Promise<Match>;
    simulateMatch(matchId: string, playerOneScore: number, playerTwoScore: number): Promise<void>;
    updateUsersAfterGame(matchId: string): Promise<void>;
}
