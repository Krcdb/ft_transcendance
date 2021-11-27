import { MatchService } from "./match.service";
import { PostMatchDto } from './dto/post-match.dto';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from "./match.entity";
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    createMatch(createMatchDto: CreateMatchDto): Promise<Match>;
    endMatch(matchId: string, postMatchDto: PostMatchDto): Promise<void>;
    findAllMatches(): Promise<Match[]>;
    findOne(matchId: string): Promise<Match>;
    findAllWithUser(userId: number): Promise<Match[]>;
}
