import { Controller } from "@nestjs/common";
import { MatchService } from "./match.service";

@Controller()
export class MatchController {
    constructor(private readonly matchService: MatchService) {}
}