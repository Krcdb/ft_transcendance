import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { UsersService } from 'src/users/users.service';
export declare class MatchService {
    private readonly matchRepository;
    private readonly usersService;
    constructor(matchRepository: Repository<Match>, usersService: UsersService);
    create(userOneId: number, userTwoId: number): Promise<Match>;
    findAll(): Promise<Match[]>;
    findAllWithUser(userId: number): Promise<Match[]>;
    findOne(matchId: string): Promise<Match>;
    simulateMatch(matchId: string, playerOneScore: number, playerTwoScore: number): Promise<void>;
    updateUsersAfterGame(matchId: string): Promise<void>;
}
