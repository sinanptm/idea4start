import { CustomRequest, StatusCode } from "@/types";
import UpdateVoteUseCase from "@/use_case/vote/UpdateVoteUseCase";
import { NextFunction, Response } from "express";

export default class VoteController {
    constructor(
        private readonly updateVoteUseCase: UpdateVoteUseCase
    ) { }

    async createVote(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { ideaId } = req.params;
            const { voteType } = req.body;
            const userId = req.user?.id!;
            await this.updateVoteUseCase.exec({ ideaId, voteType, userId });
            res.status(StatusCode.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }
}       