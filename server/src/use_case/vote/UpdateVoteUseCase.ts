import { UnauthorizedError } from "@/domain/entities/CustomError";
import IUserRepository from "@/domain/repositories/IUserRepository";
import IVoteRepository from "@/domain/repositories/IVoteRepository";

interface UpdateVoteQuery {
    voteId: string;
    voteType: string;
    userId: string;
    ideaId: string;
}

export default class UpdateVoteUseCase {
    constructor(
        private readonly voteRepository: IVoteRepository,
        private readonly userRepository: IUserRepository
    ) { }

    async exec(query: UpdateVoteQuery): Promise<void> {
        const { voteId, voteType, userId, ideaId } = query;
        const existingVote = await this.voteRepository.findById(voteId);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }
        if (existingVote) {
            if (existingVote.userId !== user._id) {
                throw new UnauthorizedError("User not authorized to update this vote");
            }
            existingVote.type = voteType as "up" | "down";
            await this.voteRepository.update(existingVote._id!, existingVote);
        } else {
            await this.voteRepository.create({
                userId,
                ideaId,
                type: voteType as "up" | "down"
            });
        }
    }

}